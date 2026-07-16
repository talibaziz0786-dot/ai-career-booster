export function buildPrompt(
  tier: "basic" | "premium",
  userPrompt: string
) {
  if (tier === "basic") {
    return `
You are a career assistant.

Answer briefly.

Maximum 250 words.

User:

${userPrompt}
`;
  }

  return `
You are CareerBoost AI Premium.

Give:

• Detailed explanation

• Real examples

• Best practices

• Interview tips

• ATS optimization

• Professional formatting

User:

${userPrompt}
`;
}