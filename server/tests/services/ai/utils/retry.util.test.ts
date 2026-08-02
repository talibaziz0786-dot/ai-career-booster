import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { retry } from "../../../../src/services/ai/utils/retry.util.js";

describe("retry", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("resolves without retrying when the callback succeeds", async () => {
    const fn = vi.fn().mockResolvedValue("ok");

    await expect(retry(fn)).resolves.toBe("ok");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("retries until the callback succeeds", async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new Error("boom"))
      .mockResolvedValue("ok");

    const promise = retry(fn, 2, 100);
    await vi.advanceTimersByTimeAsync(100);

    await expect(promise).resolves.toBe("ok");
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("makes retries + 1 attempts before rejecting with the last error", async () => {
    const lastError = new Error("last");
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new Error("first"))
      .mockRejectedValueOnce(lastError);

    const promise = retry(fn, 1, 100);
    const assertion = expect(promise).rejects.toBe(lastError);

    await vi.advanceTimersByTimeAsync(100);
    await assertion;

    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("defaults to 2 retries with a 500ms delay", async () => {
    const fn = vi.fn().mockRejectedValue(new Error("boom"));

    const promise = retry(fn);
    const assertion = expect(promise).rejects.toThrow("boom");

    await vi.advanceTimersByTimeAsync(499);
    expect(fn).toHaveBeenCalledTimes(1);

    await vi.advanceTimersByTimeAsync(1);
    expect(fn).toHaveBeenCalledTimes(2);

    await vi.advanceTimersByTimeAsync(500);
    await assertion;

    expect(fn).toHaveBeenCalledTimes(3);
  });

  it("does not wait when retries are disabled", async () => {
    const fn = vi.fn().mockRejectedValue(new Error("boom"));

    await expect(retry(fn, 0)).rejects.toThrow("boom");
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
