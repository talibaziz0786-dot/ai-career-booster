import { describe, expect, it } from "vitest";

import { estimateCost } from "../../../../src/services/ai/utils/cost-estimator.js";

describe("estimateCost", () => {
  it("prices gemini-2.5-pro at the premium rate", () => {
    expect(estimateCost("gemini-2.5-pro", 1000)).toBeCloseTo(0.02, 10);
  });

  it("prices gemini-2.5-flash below gemini-2.5-pro", () => {
    expect(estimateCost("gemini-2.5-flash", 1000)).toBeCloseTo(0.005, 10);
    expect(estimateCost("gemini-2.5-flash", 1000)).toBeLessThan(
      estimateCost("gemini-2.5-pro", 1000)
    );
  });

  it("prices deepseek at its own rate", () => {
    expect(estimateCost("deepseek", 1000)).toBeCloseTo(0.003, 10);
  });

  it("returns 0 for unknown providers", () => {
    expect(estimateCost("qwen", 1000)).toBe(0);
    expect(estimateCost("local", 1000)).toBe(0);
  });

  it("returns 0 when no tokens were used", () => {
    expect(estimateCost("gemini-2.5-pro", 0)).toBe(0);
  });
});
