import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  clearCache,
  getCache,
  setCache,
} from "../../../../src/services/ai/core/ai-cache.service.js";

describe("ai cache", () => {
  beforeEach(() => {
    clearCache();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    clearCache();
  });

  it("returns null for an unknown key", () => {
    expect(getCache("missing")).toBeNull();
  });

  it("stores and returns a value", () => {
    setCache("resume", { score: 90 });

    expect(getCache<{ score: number }>("resume")).toEqual({ score: 90 });
  });

  it("keeps the value until the ttl elapses", () => {
    setCache("resume", "cached", 1);

    vi.advanceTimersByTime(59_000);
    expect(getCache("resume")).toBe("cached");

    vi.advanceTimersByTime(2_000);
    expect(getCache("resume")).toBeNull();
  });

  it("evicts an expired entry so later reads stay null", () => {
    setCache("resume", "cached", 1);

    vi.advanceTimersByTime(61_000);

    expect(getCache("resume")).toBeNull();
    expect(getCache("resume")).toBeNull();
  });

  it("defaults to a 30 minute ttl", () => {
    setCache("resume", "cached");

    vi.advanceTimersByTime(29 * 60 * 1000);
    expect(getCache("resume")).toBe("cached");

    vi.advanceTimersByTime(2 * 60 * 1000);
    expect(getCache("resume")).toBeNull();
  });

  it("overwrites an existing key", () => {
    setCache("resume", "first");
    setCache("resume", "second");

    expect(getCache("resume")).toBe("second");
  });

  it("clearCache drops every entry", () => {
    setCache("a", 1);
    setCache("b", 2);

    clearCache();

    expect(getCache("a")).toBeNull();
    expect(getCache("b")).toBeNull();
  });
});
