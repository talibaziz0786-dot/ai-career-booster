import {
  ResumeBuilderResult,
} from "../parser/resume-builder.parser.js";

export function validateResumeBuilder(
  data: any
): ResumeBuilderResult {
  if (!data || typeof data !== "object") {
    throw new Error("Invalid Resume Builder response object.");
  }

  return {
    professionalSummary:
      typeof data.professionalSummary === "string"
        ? data.professionalSummary
        : typeof data.summary === "string"
        ? data.summary
        : "",

    atsOptimizedSkills: Array.isArray(data.atsOptimizedSkills)
      ? data.atsOptimizedSkills
      : Array.isArray(data.skills)
      ? data.skills
      : [],

    experienceBulletPoints: Array.isArray(data.experienceBulletPoints)
      ? data.experienceBulletPoints
      : Array.isArray(data.experience)
      ? data.experience
      : [],

    projectDescriptions: Array.isArray(data.projectDescriptions)
      ? data.projectDescriptions
      : Array.isArray(data.projects)
      ? data.projects
      : [],

    achievementSuggestions: Array.isArray(data.achievementSuggestions) || typeof data.achievementSuggestions === "string"
      ? data.achievementSuggestions
      : Array.isArray(data.achievements)
      ? data.achievements
      : "",

    resumeKeywords: Array.isArray(data.resumeKeywords)
      ? data.resumeKeywords
      : Array.isArray(data.keywords)
      ? data.keywords
      : [],

    recruiterImpression:
      typeof data.recruiterImpression === "string"
        ? data.recruiterImpression
        : typeof data.impression === "string"
        ? data.impression
        : "Good candidate profile.",
  };
}