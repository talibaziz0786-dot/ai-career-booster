export function parseAIJson(
  content?: string | null
) {
  if (!content) {
    throw new Error(
      "AI returned empty response."
    );
  }

  const cleaned = content
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const match =
    cleaned.match(/\{[\s\S]*\}/);

  if (!match) {
    throw new Error(
      "No JSON found."
    );
  }

  return JSON.parse(match[0]);
}