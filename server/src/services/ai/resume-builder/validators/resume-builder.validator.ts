import {
  ResumeBuilderResult,
} from "../parser/resume-builder.parser.js";

export function validateResumeBuilder(
  data: ResumeBuilderResult
): boolean {

  return (
    typeof data.professionalSummary === "string" &&

    Array.isArray(data.atsOptimizedSkills) &&

    Array.isArray(data.experienceBulletPoints) &&

    Array.isArray(data.projectDescriptions) &&

    (
      typeof data.achievementSuggestions === "string" ||
      Array.isArray(data.achievementSuggestions)
    ) &&

    Array.isArray(data.resumeKeywords) &&

    typeof data.recruiterImpression === "string"
  );

}