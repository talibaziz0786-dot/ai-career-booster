import { askAI } from "./ai/ai-manager.service.js";
import { parseAIJson } from "../utils/json-parser.js";

export async function analyzeResumeAI(
  resumeText: string
) {

  const prompt = `
You are the world's most advanced AI Career Coach,
Senior Global Recruiter,
Hiring Director,
ATS Expert,
Career Strategist,
HR Leader,
Industry Mentor,
Executive Coach.

Analyze the resume deeply.

Resume

${resumeText}

Return ONLY VALID JSON.

Do NOT use markdown.

Do NOT explain.

Never write anything outside JSON.

JSON must start with {

JSON must end with }

`;

  const ai =
    await askAI(prompt);

  return parseAIJson(
    ai.content
  );
}