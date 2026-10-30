import { askAI } from "../../lib/ai/ai-orchestrator.js";
import { parseAIJson } from "../../utils/json-parser.js";

export interface ResumeAnalysisResult {
overallScore: number;
atsScore: number;
summary: string;
strengths: string[];
weaknesses: string[];
missingSkills: string[];
recommendedSkills: string[];
experienceLevel: string;
careerSuggestions: string[];
keywordSuggestions: string[];
improvementPlan: string[];
}

function validateResumeAnalysis(
value: unknown
): ResumeAnalysisResult {
if (
!value ||
typeof value !== "object"
) {
throw new Error(
"AI returned an invalid resume analysis."
);
}

const data =
value as Record<string, unknown>;

if (
typeof data.overallScore !==
"number" ||
typeof data.atsScore !==
"number" ||
typeof data.summary !==
"string" ||
!Array.isArray(data.strengths) ||
!Array.isArray(data.weaknesses) ||
!Array.isArray(data.missingSkills) ||
!Array.isArray(data.recommendedSkills) ||
typeof data.experienceLevel !==
"string" ||
!Array.isArray(data.careerSuggestions) ||
!Array.isArray(data.keywordSuggestions) ||
!Array.isArray(data.improvementPlan)
) {
throw new Error(
"AI resume analysis structure is invalid."
);
}

return {
overallScore:
data.overallScore,
atsScore:
  data.atsScore,

summary:
  data.summary,

strengths:
  data.strengths.filter(
    (item): item is string =>
      typeof item === "string"
  ),

weaknesses:
  data.weaknesses.filter(
    (item): item is string =>
      typeof item === "string"
  ),

missingSkills:
  data.missingSkills.filter(
    (item): item is string =>
      typeof item === "string"
  ),

recommendedSkills:
  data.recommendedSkills.filter(
    (item): item is string =>
      typeof item === "string"
  ),

experienceLevel:
  data.experienceLevel,

careerSuggestions:
  data.careerSuggestions.filter(
    (item): item is string =>
      typeof item === "string"
  ),

keywordSuggestions:
  data.keywordSuggestions.filter(
    (item): item is string =>
      typeof item === "string"
  ),

improvementPlan:
  data.improvementPlan.filter(
    (item): item is string =>
      typeof item === "string"
  ),
  };
}

export async function analyzeResumeAI(userId: string, resumeText: string, language = "english")
: Promise<ResumeAnalysisResult> {
const cleanResume =
resumeText.trim();

if (!cleanResume) {
throw new Error(
"Resume text is required."
);
}

if (cleanResume.length > 50000) {
throw new Error(
"Resume text is too large for analysis."
);
}

const prompt = `
You are an expert AI Career Coach, Senior Technical Recruiter, ATS Specialist, Hiring Manager, and Resume Strategist.

Analyze the candidate resume professionally.

Your analysis must be objective, practical, recruiter-oriented, and based ONLY on the supplied resume.

Do not invent experience, education, certifications, projects, or skills.

Return ONLY valid JSON.

Do not use Markdown.

Required JSON structure:

{
"overallScore": 0,
"atsScore": 0,
"summary": "",
"strengths": [],
"weaknesses": [],
"missingSkills": [],
"recommendedSkills": [],
"experienceLevel": "",
"careerSuggestions": [],
"keywordSuggestions": [],
"improvementPlan": []
}

Rules:

overallScore must be between 0 and 100.
atsScore must be between 0 and 100.
strengths must contain concrete resume strengths.
weaknesses must contain actionable weaknesses.
missingSkills should contain skills that would improve employability based on the candidate profile.
recommendedSkills should contain practical skills to learn.
experienceLevel should describe the candidate's apparent professional level.
careerSuggestions should contain realistic career directions.
keywordSuggestions should contain relevant ATS keywords.
improvementPlan should contain specific improvement actions.
Never fabricate information.
Never return Markdown.
Never return text outside JSON.

Language:
${language}

Candidate Resume:

${cleanResume}
`;

const aiResponse =
await askAI({ userId, prompt });

const parsed =
parseAIJson(
aiResponse.content ?? ""
);

return validateResumeAnalysis(
parsed
);
}
