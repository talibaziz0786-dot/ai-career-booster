import type {
  Competency,
  DifficultyLevel,
} from "./competency-types.js";
import type {
  InterviewDifficulty,
  InterviewLanguage,
  InterviewType,
} from "../types/interview.types.js";

export interface AICompetenciesInput {
  userId: string;
  profession: string;
  skill: string;
  interviewType: InterviewType;
  difficulty: InterviewDifficulty;
  language: InterviewLanguage;
}

export async function generateAICompetencies(
  input: AICompetenciesInput
): Promise<Competency[]> {
  const diff: DifficultyLevel =
    input.difficulty === "beginner"
      ? "beginner"
      : input.difficulty === "advanced"
      ? "advanced"
      : "intermediate";

  return [
    {
      id: `${input.skill.toLowerCase().replace(/\s+/g, "-")}-core`,
      name: `Core ${input.skill} Concepts`,
      description: `Fundamental understanding and practical application of ${input.skill}.`,
      difficulty: diff,
      tags: [input.skill],
      keywords: [input.skill.toLowerCase()],
    },
  ];
}
