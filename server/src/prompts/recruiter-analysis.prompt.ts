import { GLOBAL_AI_RULES } from "./prompt.constants.js";
import { RECRUITER_RULES } from "./recruiter-rules.prompt.js";
import { JSON_RULES } from "./json-rules.prompt.js";

export interface RecruiterAnalysisOptions{

resume:string;

jobDescription:string;

}

export function buildRecruiterAnalysisPrompt(
data:RecruiterAnalysisOptions
){

return `

${GLOBAL_AI_RULES}

${RECRUITER_RULES}

${JSON_RULES}

Resume

${data.resume}

Job Description

${data.jobDescription}

Behave exactly like a recruiter.

Analyze

Resume Match

Hiring Probability

Missing Skills

Missing Keywords

Strengths

Weaknesses

Red Flags

Output ONLY JSON.

{

"resumeMatch":0,

"hiringProbability":0,

"strengths":[],

"weaknesses":[],

"missingSkills":[],

"missingKeywords":[],

"redFlags":[],

"recommendations":[]

}

`;

}