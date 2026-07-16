import { extractJson } from "./ai-json-cleaner.js";

export function parseAIJson<T>(
  aiResponse: string
): T {

  const json = extractJson(aiResponse);

  try {
    return JSON.parse(json) as T;
  } catch {
    throw new Error("Invalid AI JSON");
  }

}