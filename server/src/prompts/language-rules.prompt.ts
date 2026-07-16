export function LANGUAGE_RULES(
language:
| "english"
| "hindi"
| "hinglish"
| "urdu"
){

switch(language){

case "english":

return `
Return everything in professional English.
Use concise recruiter-friendly language.
`;

case "hindi":

return `
Return everything in professional Hindi.
Do not mix English unless absolutely necessary.
`;

case "hinglish":

return `
Return Hindi using ONLY English alphabet.

Example:

Aapka answer achha tha.

Never use Hindi script.
`;

case "urdu":

return `
Return everything in proper Urdu script.

Never mix English.

Professional tone only.
`;

default:

return `
Return English.
`;

}

}