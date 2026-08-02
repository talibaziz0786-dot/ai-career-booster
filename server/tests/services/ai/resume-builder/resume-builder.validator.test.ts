import { describe, expect, it } from "vitest";

import type { ResumeBuilderResult } from "../../../../src/services/ai/resume-builder/parser/resume-builder.parser.js";
import { validateResumeBuilder } from "../../../../src/services/ai/resume-builder/validators/resume-builder.validator.js";

function validResult(): ResumeBuilderResult {
  return {
    professionalSummary: "Backend engineer",
    atsOptimizedSkills: ["node"],
    experienceBulletPoints: ["Built APIs"],
    projectDescriptions: ["CareerBoost"],
    achievementSuggestions: "Quantify impact",
    resumeKeywords: ["typescript"],
    recruiterImpression: "Strong",
  };
}

describe("validateResumeBuilder", () => {
  it("accepts a fully populated result", () => {
    expect(validateResumeBuilder(validResult())).toBe(true);
  });

  it("accepts achievementSuggestions as an array", () => {
    expect(
      validateResumeBuilder({
        ...validResult(),
        achievementSuggestions: ["Quantify impact"],
      })
    ).toBe(true);
  });

  it.each([
    "professionalSummary",
    "atsOptimizedSkills",
    "experienceBulletPoints",
    "projectDescriptions",
    "achievementSuggestions",
    "resumeKeywords",
    "recruiterImpression",
  ] as const)("rejects a result missing %s", (field) => {
    const result = validResult();
    delete (result as Partial<ResumeBuilderResult>)[field];

    expect(validateResumeBuilder(result)).toBe(false);
  });

  it("rejects a result with a wrongly typed field", () => {
    expect(
      validateResumeBuilder({
        ...validResult(),
        atsOptimizedSkills: "node" as unknown as string[],
      })
    ).toBe(false);
  });

  it("rejects achievementSuggestions of an unsupported type", () => {
    expect(
      validateResumeBuilder({
        ...validResult(),
        achievementSuggestions: 42 as unknown as string,
      })
    ).toBe(false);
  });
});
