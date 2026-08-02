import type { NextFunction, Request, Response } from "express";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const findOne = vi.fn();

vi.mock("../../src/models/subscription.model.js", () => ({
  default: { findOne },
}));

const { checkAIUsage } = await import(
  "../../src/middleware/ai-usage.middleware.js"
);

function mockResponse() {
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
  };

  return res as unknown as Response & typeof res;
}

function mockRequest() {
  return { user: { id: "user-1" } } as unknown as Request;
}

function subscription(
  plan: string,
  usage: Partial<{
    resumeToday: number;
    atsToday: number;
    interviewToday: number;
    coverLetterToday: number;
    lastReset: Date;
  }> = {}
) {
  return {
    plan,
    usage: {
      resumeToday: 0,
      atsToday: 0,
      interviewToday: 0,
      coverLetterToday: 0,
      lastReset: new Date(),
      ...usage,
    },
    save: vi.fn().mockResolvedValue(undefined),
  };
}

describe("checkAIUsage", () => {
  let next: NextFunction;

  beforeEach(() => {
    findOne.mockReset();
    next = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns 404 when the user has no subscription", async () => {
    findOne.mockResolvedValue(null);
    const res = mockResponse();

    await checkAIUsage("resume")(mockRequest(), res, next);

    expect(findOne).toHaveBeenCalledWith({ user: "user-1" });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Subscription not found",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it.each(["trial", "pro-monthly", "pro-yearly"])(
    "lets %s plans through without counting usage",
    async (plan) => {
      const sub = subscription(plan, { resumeToday: 99 });
      findOne.mockResolvedValue(sub);

      await checkAIUsage("resume")(mockRequest(), mockResponse(), next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(sub.usage.resumeToday).toBe(99);
    }
  );

  it.each([
    ["resume", "resumeToday"],
    ["ats", "atsToday"],
    ["interview", "interviewToday"],
    ["coverLetter", "coverLetterToday"],
  ] as const)(
    "increments %s usage and persists it for free plans",
    async (feature, counter) => {
      const sub = subscription("free");
      findOne.mockResolvedValue(sub);

      await checkAIUsage(feature)(mockRequest(), mockResponse(), next);

      expect(sub.usage[counter]).toBe(1);
      expect(sub.save).toHaveBeenCalled();
      expect(next).toHaveBeenCalledTimes(1);
    }
  );

  it.each([
    ["resume", { resumeToday: 2 }],
    ["ats", { atsToday: 2 }],
    ["interview", { interviewToday: 15 }],
    ["coverLetter", { coverLetterToday: 1 }],
  ] as const)(
    "blocks %s once the free daily limit is reached",
    async (feature, usage) => {
      findOne.mockResolvedValue(subscription("free", usage));
      const res = mockResponse();

      await checkAIUsage(feature)(mockRequest(), res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        upgradeRequired: true,
        feature,
        message: "Daily AI limit reached. Upgrade to Pro.",
      });
      expect(next).not.toHaveBeenCalled();
    }
  );

  it("resets the daily counters when the last reset was on a previous day", async () => {
    const sub = subscription("free", {
      resumeToday: 2,
      atsToday: 2,
      interviewToday: 15,
      coverLetterToday: 1,
      lastReset: new Date("2020-01-01T00:00:00.000Z"),
    });
    findOne.mockResolvedValue(sub);

    await checkAIUsage("resume")(mockRequest(), mockResponse(), next);

    expect(sub.usage.atsToday).toBe(0);
    expect(sub.usage.interviewToday).toBe(0);
    expect(sub.usage.coverLetterToday).toBe(0);
    expect(sub.usage.resumeToday).toBe(1);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("keeps the counters when the last reset was earlier the same day", async () => {
    const sub = subscription("free", {
      resumeToday: 1,
      lastReset: new Date(),
    });
    findOne.mockResolvedValue(sub);

    await checkAIUsage("resume")(mockRequest(), mockResponse(), next);

    expect(sub.usage.resumeToday).toBe(2);
  });

  it("returns 500 when the subscription lookup throws", async () => {
    findOne.mockRejectedValue(new Error("db down"));
    vi.spyOn(console, "error").mockImplementation(() => {});
    const res = mockResponse();

    await checkAIUsage("resume")(mockRequest(), res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "AI Usage Middleware Error",
    });
    expect(next).not.toHaveBeenCalled();
  });
});
