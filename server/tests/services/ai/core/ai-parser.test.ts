import { describe, expect, it } from "vitest";

import { parseAIJson } from "../../../../src/services/ai/core/ai-parser.js";

describe("parseAIJson", () => {
  it("parses a fenced JSON payload", () => {
    const parsed = parseAIJson<{ score: number }>('```json\n{"score":88}\n```');

    expect(parsed).toEqual({ score: 88 });
  });

  it("throws when the extracted text is not valid JSON", () => {
    expect(() => parseAIJson('{"score": }')).toThrow("Invalid AI JSON");
  });

  it("propagates the extraction error when no object is present", () => {
    expect(() => parseAIJson("sorry, I cannot help")).toThrow(
      "AI did not return valid JSON."
    );
  });
});
