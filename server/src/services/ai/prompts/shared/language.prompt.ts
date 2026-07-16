export function languagePrompt(
  language: string
) {
  return `
Generate every string in:

${language}

Rules:

english -> English

hindi -> Hindi

hinglish -> Hindi in English letters

urdu -> Urdu Script

Never mix languages.

Use only requested language.
`;
}