import { parseAIJson as parseJson } from "../services/ai/core/ai-parser.js";

export function parseAIJson<T = any>(
  content?: string | null
): T {
  if (!content) {
    throw new Error(
      "AI returned empty response."
    );
  }

  return parseJson<T>(content);
}
