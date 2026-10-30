import type {
  ResumeData,
} from "../store/resume-store";

function toText(
  value: unknown
): string {
  if (
    typeof value === "string"
  ) {
    return value;
  }

  if (
    Array.isArray(value)
  ) {
    return value
      .filter(
        (item) =>
          typeof item ===
          "string"
      )
      .join(", ");
  }

  return "";
}

function mergeText(
  existing: string,
  generated: unknown
): string {
  const value =
    toText(generated).trim();

  return value
    ? value
    : existing;
}

export function mapAIResumeToResumeData(
  ai: Record<string, unknown>,
  existing?: ResumeData
): ResumeData {
  const base: ResumeData =
    existing ?? {
      photo: "",
      fullName: "",
      email: "",
      phone: "",
      location: "",

      linkedin: "",
      github: "",
      portfolio: "",

      summary: "",

      skills: "",
      experience: "",
      education: "",

      jobTitle: "",

      projects: "",
      certifications: "",
      achievements: "",
      languages: "",
    };

  const personalInfo =
    typeof ai.personalInfo ===
    "object" &&
    ai.personalInfo !== null
      ? (ai.personalInfo as Record<
          string,
          unknown
        >)
      : {};

  return {
    /*
     * NEVER let AI erase existing
     * personal information.
     */
    photo: base.photo,

    fullName:
      mergeText(
        base.fullName,
        ai.fullName ??
          personalInfo.fullName
      ),

    email:
      mergeText(
        base.email,
        ai.email ??
          personalInfo.email
      ),

    phone:
      mergeText(
        base.phone,
        ai.phone ??
          personalInfo.phone
      ),

    location:
      mergeText(
        base.location,
        ai.location ??
          personalInfo.location
      ),

    linkedin:
      mergeText(
        base.linkedin,
        ai.linkedin ??
          personalInfo.linkedin
      ),

    github:
      mergeText(
        base.github,
        ai.github ??
          personalInfo.github
      ),

    portfolio:
      mergeText(
        base.portfolio,
        ai.portfolio ??
          personalInfo.portfolio
      ),

    jobTitle:
      mergeText(
        base.jobTitle,
        ai.jobTitle ??
          personalInfo.jobTitle
      ),

    /*
     * AI enhancement fields.
     */
    summary:
      mergeText(
        base.summary,
        ai.professionalSummary ??
          ai.summary
      ),

    skills:
      mergeText(
        base.skills,
        ai.atsOptimizedSkills ??
          ai.skills
      ),

    experience:
      mergeText(
        base.experience,
        ai.experienceBulletPoints ??
          ai.experience
      ),

    education:
      mergeText(
        base.education,
        ai.education
      ),

    projects:
      mergeText(
        base.projects,
        ai.projectDescriptions ??
          ai.projects
      ),

    certifications:
      mergeText(
        base.certifications,
        ai.certifications
      ),

    achievements:
      mergeText(
        base.achievements,
        ai.achievementSuggestions ??
          ai.achievements
      ),

    languages:
      mergeText(
        base.languages,
        ai.languages
      ),
  };
}