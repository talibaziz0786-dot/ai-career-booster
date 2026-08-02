import crypto from "node:crypto";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import {
  getPaidPlan,
  planExpiryDate,
  verifyRazorpaySignature,
} from "../../src/services/payment-verification.service.js";

const SECRET = "test-razorpay-secret";

function sign(
  orderId: string,
  paymentId: string,
  secret = SECRET
) {
  return crypto
    .createHmac("sha256", secret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");
}

describe("getPaidPlan", () => {
  it("resolves the paid plans with server-side pricing", () => {
    expect(getPaidPlan("pro-monthly")).toEqual({
      id: "pro-monthly",
      name: "Pro Monthly",
      price: 299,
      durationDays: 30,
    });

    expect(getPaidPlan("pro-yearly")?.price).toBe(1999);
  });

  it.each(["free", "trial", "enterprise", "", null, undefined, 1, {}])(
    "rejects %s as a paid plan",
    (plan) => {
      expect(getPaidPlan(plan)).toBeNull();
    }
  );

  it("does not resolve inherited object properties", () => {
    expect(getPaidPlan("toString")).toBeNull();
    expect(getPaidPlan("constructor")).toBeNull();
  });
});

describe("verifyRazorpaySignature", () => {
  const previousSecret = process.env.RAZORPAY_KEY_SECRET;

  beforeEach(() => {
    process.env.RAZORPAY_KEY_SECRET = SECRET;
  });

  afterEach(() => {
    process.env.RAZORPAY_KEY_SECRET = previousSecret;
  });

  it("accepts a signature produced with the configured secret", () => {
    expect(
      verifyRazorpaySignature(
        "order_1",
        "pay_1",
        sign("order_1", "pay_1")
      )
    ).toBe(true);
  });

  it("rejects a signature made with a different secret", () => {
    expect(
      verifyRazorpaySignature(
        "order_1",
        "pay_1",
        sign("order_1", "pay_1", "attacker-secret")
      )
    ).toBe(false);
  });

  it("rejects a signature bound to a different order or payment", () => {
    expect(
      verifyRazorpaySignature(
        "order_2",
        "pay_1",
        sign("order_1", "pay_1")
      )
    ).toBe(false);

    expect(
      verifyRazorpaySignature(
        "order_1",
        "pay_2",
        sign("order_1", "pay_1")
      )
    ).toBe(false);
  });

  it.each([
    ["", "pay_1", "sig"],
    ["order_1", "", "sig"],
    ["order_1", "pay_1", ""],
  ])("rejects missing fields (%s, %s, %s)", (order, payment, signature) => {
    expect(
      verifyRazorpaySignature(order, payment, signature)
    ).toBe(false);
  });

  it("rejects a signature of the wrong length without throwing", () => {
    expect(
      verifyRazorpaySignature("order_1", "pay_1", "abc")
    ).toBe(false);
  });

  it("throws when the secret is not configured", () => {
    delete process.env.RAZORPAY_KEY_SECRET;

    expect(() =>
      verifyRazorpaySignature("order_1", "pay_1", "sig")
    ).toThrow("RAZORPAY_KEY_SECRET is missing.");
  });

  it("accepts an explicitly passed secret", () => {
    delete process.env.RAZORPAY_KEY_SECRET;

    expect(
      verifyRazorpaySignature(
        "order_1",
        "pay_1",
        sign("order_1", "pay_1", "other"),
        "other"
      )
    ).toBe(true);
  });
});

describe("planExpiryDate", () => {
  it("adds the plan duration to the payment date", () => {
    const from = new Date("2026-01-01T00:00:00.000Z");

    expect(
      planExpiryDate(getPaidPlan("pro-monthly")!, from).toISOString()
    ).toBe("2026-01-31T00:00:00.000Z");

    expect(
      planExpiryDate(getPaidPlan("pro-yearly")!, from).toISOString()
    ).toBe("2027-01-01T00:00:00.000Z");
  });
});
