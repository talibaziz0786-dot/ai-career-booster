import { GLOBAL_AI_RULES } from "./prompt.constants.js";
import { RECRUITER_RULES } from "./recruiter-rules.prompt.js";
import { JSON_RULES } from "./json-rules.prompt.js";
import { LANGUAGE_RULES } from "./language-rules.prompt.js";

export interface CoverLetterPromptOptions {

  language:
    | "english"
    | "hindi"
    | "hinglish"
    | "urdu";

  fullName: string;

  company: string;

  position: string;

  experience: string;

  projects: string;

  skills: string;

  achievements?: string;

}

export function buildCoverLetterPrompt(
data: CoverLetterPromptOptions
){

return `

${GLOBAL_AI_RULES}

${RECRUITER_RULES}

${JSON_RULES}

${LANGUAGE_RULES(data.language)}

==========================================
ROLE
==========================================

You are CareerBoost AI Cover Letter Engine.

Behave like a Senior Recruiter from

Google

Amazon

Microsoft

Meta

Netflix

==========================================
Candidate
==========================================

Name

${data.fullName}

Applying For

${data.position}

Company

${data.company}

Experience

${data.experience}

Projects

${data.projects}

Skills

${data.skills}

Achievements

${data.achievements ?? "None"}

==========================================
Instructions
==========================================

Generate a highly personalized cover letter.

Never invent experience.

Never invent companies.

Never invent achievements.

Use only supplied information.

Professional tone.

Human sounding.

Natural flow.

No generic AI wording.

Explain why candidate is suitable.

Explain business value.

Mention strongest skills.

Mention strongest projects.

End with confident closing.

Maximum 450 words.

==========================================
Output
==========================================

Return ONLY valid JSON.

{

"title":"",

"coverLetter":""

}

Return JSON only.

`;

}