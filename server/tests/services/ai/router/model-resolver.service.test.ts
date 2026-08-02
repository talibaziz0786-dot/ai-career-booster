import { beforeEach, describe, expect, it, vi } from "vitest";

const findOne = vi.fn();

vi.mock("../../../../src/models/subscription.model.js", () => ({
  default: { findOne },
}));

const { getAIModel } = await import(
  "../../../../src/services/ai/router/model-resolver.service.js"
);

const FREE_CONFIG = {
  tier: "free",
  primary: "gemini-2.5-flash",
  fallback: "gemini-2.5-flash",
};

const PREMIUM_CONFIG = {
  tier: "premium",
  primary: "gemini-2.5-pro",
  fallback: "gemini-2.5-flash",
};

describe("getAIModel", () => {
  beforeEach(() => {
    findOne.mockReset();
  });

  it("looks the subscription up by user id", async () => {
    findOne.mockResolvedValue(null);

    await getAIModel("user-1");

    expect(findOne).toHaveBeenCalledWith({ user: "user-1" });
  });

  it.each([undefined, ""])(
    "returns the free tier without a lookup when the user id is %p",
    async (userId) => {
      await expect(getAIModel(userId)).resolves.toEqual(FREE_CONFIG);

      expect(findOne).not.toHaveBeenCalled();
    }
  );

  it("falls back to the free tier when the user has no subscription", async () => {
    findOne.mockResolvedValue(null);

    await expect(getAIModel("user-1")).resolves.toEqual(FREE_CONFIG);
  });

  it.each(["trial", "pro-monthly", "pro-yearly"])(
    "resolves the premium models for the %s plan",
    async (plan) => {
      findOne.mockResolvedValue({ plan });

      await expect(getAIModel("user-1")).resolves.toEqual(PREMIUM_CONFIG);
    }
  );

  it("resolves the free models for the free plan", async () => {
    findOne.mockResolvedValue({ plan: "free" });

    await expect(getAIModel("user-1")).resolves.toEqual(FREE_CONFIG);
  });

  it("resolves the free models for an unknown plan", async () => {
    findOne.mockResolvedValue({ plan: "enterprise" });

    await expect(getAIModel("user-1")).resolves.toEqual(FREE_CONFIG);
  });
});
