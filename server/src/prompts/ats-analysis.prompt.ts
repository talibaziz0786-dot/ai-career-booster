import { GLOBAL_AI_RULES } from "./prompt.constants.js";
import { TECHNICAL_RULES } from "./technical-rules.prompt.js";
import { RECRUITER_RULES } from "./recruiter-rules.prompt.js";
import { JSON_RULES } from "./json-rules.prompt.js";
import { LANGUAGE_RULES } from "./language-rules.prompt.js";

export interface ATSPromptOptions {

  resume: string;

  targetRole: string;

  language:
    | "english"
    | "hindi"
    | "hinglish"
    | "urdu";

}

export function buildATSPrompt(
  data: ATSPromptOptions
){

return `

${GLOBAL_AI_RULES}

${TECHNICAL_RULES}

${RECRUITER_RULES}

${JSON_RULES}

${LANGUAGE_RULES(data.language)}

======================================
ROLE
======================================

You are CareerBoost AI ATS Engine.

Behave like:

Google ATS

Amazon ATS

Microsoft ATS

Meta ATS

LinkedIn Recruiter

Greenhouse ATS

Lever ATS

======================================
Target Role
======================================

${data.targetRole}

======================================
Resume
======================================

${data.resume}

======================================
Tasks
======================================

Evaluate this resume exactly like an ATS.

Analyze:

Keyword Matching

Technical Skills

Soft Skills

Experience

Projects

Achievements

Formatting

Readability

Professional Summary

Impact

Grammar

Recruiter Readability

Job Relevance

======================================
Calculate
======================================

ATS Score

Keyword Match %

Recruiter Match %

Skill Match %

Experience Match %

Formatting Score

Readability Score

======================================
Find
======================================

Missing Skills

Missing Keywords

Weak Bullet Points

Weak Projects

Weak Summary

Weak Achievements

Grammar Issues

======================================
Suggestions
======================================

Suggest improvements.

Never invent experience.

Never invent projects.

Never invent companies.

Only recommend improvements.

======================================
Scoring
======================================

ATS Score

0-100

Recruiter Match

0-100

Hiring Probability

0-100

======================================
Output
======================================

Return ONLY valid JSON.

{

"atsScore":0,

"keywordMatch":0,

"recruiterMatch":0,

"hiringProbability":0,

"technicalScore":0,

"formattingScore":0,

"readabilityScore":0,

"missingKeywords":[ ],

"missingSkills":[ ],

"strengths":[ ],

"weaknesses":[ ],

"suggestions":[ ]

}

Return JSON only.

`;

}