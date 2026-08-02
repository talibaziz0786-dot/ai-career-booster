import crypto from "node:crypto";
import type { Request, Response } from "express";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

vi.mock("../../src/models/subscription.model.js", () => ({
  default: {
    findOne: vi.fn(),
    create: vi.fn(),
  },
}));

const { upgradePlan } = await import(
  "../../src/controllers/subscription.controller.js"
);

const Subscription = (
  await import("../../src/models/subscription.model.js")
).default as unknown as {
  findOne: ReturnType<typeof vi.fn>;
};

const SECRET = "test-razorpay-secret";
const ORDER_ID = "order_ABC";
const PAYMENT_ID = "pay_ABC";

const validSignature = crypto
  .createHmac("sha256", SECRET)
  .update(`${ORDER_ID}|${PAYMENT_ID}`)
  .digest("hex");

function makeRes() {
  const res = {
    status: vi.fn(() => res),
    json: vi.fn(() => res),
  };

  return res as unknown as Response & typeof res;
}

function makeReq(body: Record<string, unknown>) {
  return {
    body,
    user: { id: "user-1" },
  } as unknown as Request;
}

function makeSubscription() {
  return {
    plan: "free",
    status: "expired",
    expiresAt: undefined as Date | undefined,
    amountPaid: 0,
    currency: undefined as string | undefined,
    paymentDate: undefined as Date | undefined,
    razorpayOrderId: undefined as string | undefined,
    razorpayPaymentId: undefined as string | undefined,
    razorpaySignature: undefined as string | undefined,
    paymentMethod: undefined as string | undefined,
    save: vi.fn().mockResolvedValue(undefined),
  };
}

describe("upgradePlan", () => {
  const previousSecret = process.env.RAZORPAY_KEY_SECRET;

  beforeEach(() => {
    process.env.RAZORPAY_KEY_SECRET = SECRET;
    Subscription.findOne.mockReset();
  });

  afterEach(() => {
    process.env.RAZORPAY_KEY_SECRET = previousSecret;
  });

  it("activates the plan when the Razorpay signature is valid", async () => {
    const subscription = makeSubscription();
    Subscription.findOne
      .mockResolvedValueOnce(null)
      .mockResolvedValue(subscription);

    const res = makeRes();

    await upgradePlan(
      makeReq({
        plan: "pro-monthly",
        razorpayOrderId: ORDER_ID,
        razorpayPaymentId: PAYMENT_ID,
        razorpaySignature: validSignature,
        paymentMethod: "card",
      }),
      res
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(subscription.save).toHaveBeenCalledOnce();
    expect(subscription.plan).toBe("pro-monthly");
    expect(subscription.status).toBe("active");
    expect(subscription.currency).toBe("INR");
  });

  it("ignores client-supplied price and expiry, using server-side plan values", async () => {
    const subscription = makeSubscription();
    Subscription.findOne
      .mockResolvedValueOnce(null)
      .mockResolvedValue(subscription);

    await upgradePlan(
      makeReq({
        plan: "pro-yearly",
        amountPaid: 1,
        currency: "USD",
        expiresAt: "2099-01-01T00:00:00.000Z",
        razorpayOrderId: ORDER_ID,
        razorpayPaymentId: PAYMENT_ID,
        razorpaySignature: validSignature,
      }),
      makeRes()
    );

    expect(subscription.amountPaid).toBe(1999);
    expect(subscription.currency).toBe("INR");

    const expiresAt = subscription.expiresAt!.getTime();
    const expected =
      subscription.paymentDate!.getTime() +
      365 * 24 * 60 * 60 * 1000;

    expect(expiresAt).toBe(expected);
  });

  it("rejects a forged signature without touching the subscription", async () => {
    const subscription = makeSubscription();
    Subscription.findOne.mockResolvedValue(subscription);

    const res = makeRes();

    await upgradePlan(
      makeReq({
        plan: "pro-yearly",
        razorpayOrderId: ORDER_ID,
        razorpayPaymentId: PAYMENT_ID,
        razorpaySignature: "forged",
      }),
      res
    );

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Payment verification failed",
    });
    expect(subscription.save).not.toHaveBeenCalled();
    expect(subscription.plan).toBe("free");
  });

  it("rejects an upgrade with no payment fields at all", async () => {
    const subscription = makeSubscription();
    Subscription.findOne.mockResolvedValue(subscription);

    const res = makeRes();

    await upgradePlan(makeReq({ plan: "pro-yearly" }), res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(subscription.save).not.toHaveBeenCalled();
  });

  it.each(["free", "trial", "unknown-plan", undefined])(
    "rejects %s as an upgrade target",
    async (plan) => {
      const res = makeRes();

      await upgradePlan(
        makeReq({
          plan,
          razorpayOrderId: ORDER_ID,
          razorpayPaymentId: PAYMENT_ID,
          razorpaySignature: validSignature,
        }),
        res
      );

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Invalid plan",
      });
      expect(Subscription.findOne).not.toHaveBeenCalled();
    }
  );

  it("rejects a payment id that was already used", async () => {
    const subscription = makeSubscription();

    Subscription.findOne.mockResolvedValue({
      razorpayPaymentId: PAYMENT_ID,
    });

    const res = makeRes();

    await upgradePlan(
      makeReq({
        plan: "pro-monthly",
        razorpayOrderId: ORDER_ID,
        razorpayPaymentId: PAYMENT_ID,
        razorpaySignature: validSignature,
      }),
      res
    );

    expect(res.status).toHaveBeenCalledWith(409);
    expect(subscription.save).not.toHaveBeenCalled();
  });

  it("returns 404 when the user has no subscription document", async () => {
    Subscription.findOne.mockResolvedValue(null);

    const res = makeRes();

    await upgradePlan(
      makeReq({
        plan: "pro-monthly",
        razorpayOrderId: ORDER_ID,
        razorpayPaymentId: PAYMENT_ID,
        razorpaySignature: validSignature,
      }),
      res
    );

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it("returns 500 when the Razorpay secret is not configured", async () => {
    delete process.env.RAZORPAY_KEY_SECRET;

    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const res = makeRes();

    await upgradePlan(
      makeReq({
        plan: "pro-monthly",
        razorpayOrderId: ORDER_ID,
        razorpayPaymentId: PAYMENT_ID,
        razorpaySignature: validSignature,
      }),
      res
    );

    expect(res.status).toHaveBeenCalledWith(500);

    consoleError.mockRestore();
  });
});
