import { describe, expect, it } from "vitest";

import { estimateTokens } from "../../../../src/services/ai/utils/token-counter.js";

describe("estimateTokens", () => {
  it("returns 0 for an empty string", () => {
    expect(estimateTokens("")).toBe(0);
  });

  it("rounds up to a whole token", () => {
    expect(estimateTokens("a")).toBe(1);
    expect(estimateTokens("abcd")).toBe(1);
    expect(estimateTokens("abcde")).toBe(2);
  });

  it("scales with text length", () => {
    expect(estimateTokens("x".repeat(400))).toBe(100);
  });
});
