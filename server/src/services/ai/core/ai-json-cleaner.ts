export function extractJson(
  aiResponse: string
): string {

  const cleaned =
    aiResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

  const jsonMatch =
    cleaned.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {

    throw new Error(
      "AI did not return valid JSON."
    );

  }

  return jsonMatch[0];

}