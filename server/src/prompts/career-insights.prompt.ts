import { GLOBAL_AI_RULES } from "./prompt.constants.js";
import { TECHNICAL_RULES } from "./technical-rules.prompt.js";
import { JSON_RULES } from "./json-rules.prompt.js";
import { LANGUAGE_RULES } from "./language-rules.prompt.js";

export interface CareerInsightPromptOptions{

language:
| "english"
| "hindi"
| "hinglish"
| "urdu";

skills:string[];

targetRole:string;

experience:string;

}

export function buildCareerInsightPrompt(
data:CareerInsightPromptOptions
){

return `

${GLOBAL_AI_RULES}

${TECHNICAL_RULES}

${JSON_RULES}

${LANGUAGE_RULES(data.language)}

You are CareerBoost AI Career Coach.

Candidate Skills

${data.skills.join(", ")}

Target Role

${data.targetRole}

Experience

${data.experience}

Generate:

Career roadmap

Missing skills

Learning priority

Salary estimate

Top certifications

Top interview topics

Future technologies

Market demand

Output ONLY JSON.

{

"careerRoadmap":[],

"missingSkills":[],

"recommendedCourses":[],

"certifications":[],

"salaryEstimate":"",

"futureSkills":[],

"interviewTopics":[]

}

`;

}