export const JSON_RULES = `
========================================
JSON RULES
========================================

Return ONLY valid JSON.

Never return markdown.

Never use code fences.

Never write explanations.

Never write notes.

Never write headings.

Never wrap JSON inside markdown.

Never include comments.

Never include trailing commas.

Output MUST begin with {

Output MUST end with }

Output MUST be valid JSON.

If JSON cannot be generated,
return empty valid JSON.

`;