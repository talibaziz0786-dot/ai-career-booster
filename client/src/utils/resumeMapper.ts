import type { ResumeData } from "../store/resume-store";

export function mapAIResumeToResumeData(
  ai: Record<string, any>
): ResumeData {
  return {
    photo: ai.photo ?? "",

    fullName:
      ai.fullName ??
      ai.personalInfo?.fullName ??
      "",

    email:
      ai.email ??
      ai.personalInfo?.email ??
      "",

    phone:
      ai.phone ??
      ai.personalInfo?.phone ??
      "",

    location:
      ai.location ??
      ai.personalInfo?.location ??
      "",

    linkedin:
      ai.linkedin ??
      ai.personalInfo?.linkedin ??
      "",

    github:
      ai.github ??
      ai.personalInfo?.github ??
      "",

    portfolio:
      ai.portfolio ??
      ai.personalInfo?.portfolio ??
      "",

    jobTitle:
      ai.jobTitle ??
      ai.personalInfo?.jobTitle ??
      "",

    summary:
      ai.professionalSummary ??
      ai.summary ??
      "",

    skills: Array.isArray(ai.atsOptimizedSkills)
      ? ai.atsOptimizedSkills.join(", ")
      : Array.isArray(ai.skills)
      ? ai.skills.join(", ")
      : ai.skills ?? "",

    experience: Array.isArray(ai.experienceBulletPoints)
      ? ai.experienceBulletPoints.join("\n")
      : Array.isArray(ai.experience)
      ? ai.experience.join("\n")
      : ai.experience ?? "",

    education: Array.isArray(ai.education)
      ? ai.education
          .map(
            (x: any) =>
              `${x.degree ?? ""} - ${x.institute ?? ""}`
          )
          .join("\n")
      : ai.education ?? "",

    projects: Array.isArray(ai.projectDescriptions)
      ? ai.projectDescriptions.join("\n\n")
      : Array.isArray(ai.projects)
      ? ai.projects.join("\n\n")
      : ai.projects ?? "",

    certifications: Array.isArray(ai.certifications)
      ? ai.certifications.join("\n")
      : ai.certifications ?? "",

    achievements: Array.isArray(ai.achievementSuggestions)
      ? ai.achievementSuggestions.join("\n")
      : Array.isArray(ai.achievements)
      ? ai.achievements.join("\n")
      : ai.achievements ?? "",

    languages: Array.isArray(ai.languages)
      ? ai.languages.join(", ")
      : ai.languages ?? "",
  };
} 