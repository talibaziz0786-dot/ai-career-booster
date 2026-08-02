import { describe, expect, it } from "vitest";

import { extractJson } from "../../../../src/services/ai/core/ai-json-cleaner.js";

describe("extractJson", () => {
  it("returns a plain JSON object untouched", () => {
    expect(extractJson('{"score":90}')).toBe('{"score":90}');
  });

  it("strips markdown json fences", () => {
    const response = '```json\n{"score":90}\n```';

    expect(extractJson(response)).toBe('{"score":90}');
  });

  it("strips surrounding prose", () => {
    const response = 'Here is your result:\n{"score":90}\nHope it helps!';

    expect(extractJson(response)).toBe('{"score":90}');
  });

  it("keeps nested objects intact", () => {
    const response = '```json\n{"a":{"b":[1,2]}}\n```';

    expect(extractJson(response)).toBe('{"a":{"b":[1,2]}}');
  });

  it("throws when the response contains no object", () => {
    expect(() => extractJson("no json here")).toThrow(
      "AI did not return valid JSON."
    );
  });
});
