import { describe, expect, it } from "vitest";

import { parseAIJson } from "../../src/utils/json-parser.js";

describe("parseAIJson", () => {
  it("parses a fenced JSON payload", () => {
    expect(parseAIJson('```json\n{"score":75}\n```')).toEqual({ score: 75 });
  });

  it("parses JSON surrounded by prose", () => {
    expect(parseAIJson('Result:\n{"score":75}\nThanks!')).toEqual({
      score: 75,
    });
  });

  it.each([undefined, null, ""])("throws on an empty response (%s)", (input) => {
    expect(() => parseAIJson(input)).toThrow("AI returned empty response.");
  });

  it("throws when no JSON object is present", () => {
    expect(() => parseAIJson("plain text")).toThrow(
      "No JSON found in AI response: plain text"
    );
  });

  it("wraps a JSON syntax error, keeping the original as cause", () => {
    expect(() => parseAIJson('{"score":}')).toThrow(
      'Invalid AI JSON: {"score":}'
    );

    try {
      parseAIJson('{"score":}');
    } catch (error) {
      expect((error as Error).cause).toBeInstanceOf(SyntaxError);
    }
  });
});
