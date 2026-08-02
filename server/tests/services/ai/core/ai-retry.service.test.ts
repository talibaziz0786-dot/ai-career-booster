import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { retryAI } from "../../../../src/services/ai/core/ai-retry.service.js";

describe("retryAI", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("returns the first successful result", async () => {
    const callback = vi.fn().mockResolvedValue("ok");

    await expect(retryAI(callback)).resolves.toBe("ok");
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("retries a failing callback and warns on each failure", async () => {
    const callback = vi
      .fn()
      .mockRejectedValueOnce(new Error("boom"))
      .mockResolvedValue("ok");

    const promise = retryAI(callback, { retries: 3, delay: 10 });
    await vi.advanceTimersByTimeAsync(10);

    await expect(promise).resolves.toBe("ok");
    expect(callback).toHaveBeenCalledTimes(2);
    expect(console.warn).toHaveBeenCalledWith(
      "[AI Retry] Attempt 1/3 failed:",
      "boom"
    );
  });

  it("attempts exactly `retries` times before rejecting", async () => {
    const lastError = new Error("last");
    const callback = vi
      .fn()
      .mockRejectedValueOnce(new Error("first"))
      .mockRejectedValueOnce(lastError);

    const promise = retryAI(callback, { retries: 2, delay: 10 });
    const assertion = expect(promise).rejects.toMatchObject({
      message: "AI call failed after 2 attempts.",
      cause: lastError,
    });

    await vi.advanceTimersByTimeAsync(10);
    await assertion;

    expect(callback).toHaveBeenCalledTimes(2);
  });

  it("defaults to 3 attempts with a 1s delay", async () => {
    const callback = vi.fn().mockRejectedValue(new Error("boom"));

    const promise = retryAI(callback);
    const assertion = expect(promise).rejects.toThrow(
      "AI call failed after 3 attempts."
    );

    await vi.advanceTimersByTimeAsync(2_000);
    await assertion;

    expect(callback).toHaveBeenCalledTimes(3);
  });
});
