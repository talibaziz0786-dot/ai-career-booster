export function parseAIJson<T = unknown>(
  content: string
): T {
  if (
    typeof content !== "string" ||
    !content.trim()
  ) {
    throw new Error(
      "AI response is empty."
    );
  }

  const cleaned =
    content
      .trim()
      .replace(
        /^```(?:json)?\s*/i,
        ""
      )
      .replace(
        /\s*```$/i,
        ""
      )
      .trim();

  try {
    return JSON.parse(cleaned) as T;
  } catch {
    const objectMatch =
      cleaned.match(
        /\{[\s\S]*\}/
      );

    const arrayMatch =
      cleaned.match(
        /\[[\s\S]*\]/
      );

    const candidate =
      objectMatch?.[0] ??
      arrayMatch?.[0];

    if (!candidate) {
      throw new Error(
        "AI did not return valid JSON."
      );
    }

    try {
      return JSON.parse(candidate) as T;
    } catch {
      throw new Error(
        "Unable to parse AI JSON response."
      );
    }
  }
}