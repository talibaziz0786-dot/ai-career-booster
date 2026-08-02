import { describe, expect, it } from "vitest";

import {
  validateAIResponse,
  type ValidationRule,
} from "../../../../src/services/ai/core/ai-validator.js";

describe("validateAIResponse", () => {
  it("accepts a payload matching every rule", () => {
    const rules: ValidationRule[] = [
      { field: "summary", type: "string", required: true },
      { field: "score", type: "number" },
      { field: "passed", type: "boolean" },
      { field: "skills", type: "array" },
      { field: "meta", type: "object" },
    ];

    const result = validateAIResponse(
      {
        summary: "ok",
        score: 90,
        passed: true,
        skills: ["node"],
        meta: { source: "gemini" },
      },
      rules
    );

    expect(result).toBe(true);
  });

  it("throws when a required field is missing", () => {
    expect(() =>
      validateAIResponse({}, [
        { field: "summary", type: "string", required: true },
      ])
    ).toThrow("Missing required field: summary");
  });

  it("skips optional fields that are absent", () => {
    expect(
      validateAIResponse({}, [{ field: "score", type: "number" }])
    ).toBe(true);
  });

  it.each([
    ["string", { summary: 1 }, "summary", "summary must be string"],
    ["number", { score: "90" }, "score", "score must be number"],
    ["boolean", { passed: "yes" }, "passed", "passed must be boolean"],
    ["array", { skills: "node" }, "skills", "skills must be array"],
    ["object", { meta: [] }, "meta", "meta must be object"],
  ] as const)("rejects a %s field of the wrong type", (type, data, field, message) => {
    expect(() =>
      validateAIResponse(data, [{ field, type }])
    ).toThrow(message);
  });

  it("rejects null for an object field", () => {
    expect(() =>
      validateAIResponse({ meta: null }, [{ field: "meta", type: "object" }])
    ).toThrow("meta must be object");
  });
});
