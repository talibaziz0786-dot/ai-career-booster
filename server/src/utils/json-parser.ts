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
      `No JSON found in AI response: ${cleaned.slice(0, 500)}`
    );
  }

  try {
    return JSON.parse(match[0]);
  } catch (error) {
    throw new Error(
      `Invalid AI JSON: ${match[0].slice(0, 500)}`,
      { cause: error }
    );
  }
}
