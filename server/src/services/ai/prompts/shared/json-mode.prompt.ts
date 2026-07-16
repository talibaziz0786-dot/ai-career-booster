export const JSON_MODE_PROMPT = `
STRICT JSON MODE

Rules:

Return ONLY JSON.

Never return markdown.

Never return explanation.

Never return code blocks.

Never write:

"Sure"

"Certainly"

"Here is"

"Below"

Output MUST start with {

Output MUST end with }

JSON must be valid.

No trailing commas.

No comments.

No markdown.
`;