import { describe, expect, it } from "vitest";

import { parseResumeBuilder } from "../../../../src/services/ai/resume-builder/parser/resume-builder.parser.js";

const payload = {
  professionalSummary: "Backend engineer",
  atsOptimizedSkills: ["node"],
  experienceBulletPoints: ["Built APIs"],
  projectDescriptions: ["CareerBoost"],
  achievementSuggestions: "Quantify impact",
  resumeKeywords: ["typescript"],
  recruiterImpression: "Strong",
};

describe("parseResumeBuilder", () => {
  it("parses a fenced AI response", () => {
    const response = "```json\n" + JSON.stringify(payload) + "\n```";

    expect(parseResumeBuilder(response)).toEqual(payload);
  });

  it("parses a response wrapped in prose", () => {
    const response = `Sure!\n${JSON.stringify(payload)}\nLet me know.`;

    expect(parseResumeBuilder(response)).toEqual(payload);
  });

  it("throws on malformed JSON", () => {
    expect(() => parseResumeBuilder('{"professionalSummary":}')).toThrow(
      "Invalid AI JSON"
    );
  });
});
