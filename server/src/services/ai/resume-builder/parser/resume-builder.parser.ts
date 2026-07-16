import { parseAIJson } from "../../core/ai-parser.js";

export interface ResumeBuilderResult {
  professionalSummary: string;

  atsOptimizedSkills: string[];

  experienceBulletPoints: string[];

  projectDescriptions: string[];

  achievementSuggestions: string | string[];

  resumeKeywords: string[];

  recruiterImpression: string;
}

export function parseResumeBuilder(
  aiResponse: string
): ResumeBuilderResult {
  return parseAIJson<ResumeBuilderResult>(aiResponse);
}