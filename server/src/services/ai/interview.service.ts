import { aiManager } from "../../lib/ai/ai-engine.js";
import { buildInterviewQuestionPrompt } from "../../prompts/interview-question.prompt.js";

import type { InterviewHistoryItem } from "../../interview/history/interview-history.types.js";
import type {
  InterviewType,
  InterviewDifficulty,
  InterviewLanguage,
} from "../../interview/types/interview.types.js";

export interface GenerateInterviewQuestionInput {
  userId: string;

  profession: string;

  role?: string;

  interviewType: InterviewType;

  skills: string[];

  customTopic?: string;

  difficulty: InterviewDifficulty;

  language: InterviewLanguage;

  history: InterviewHistoryItem[];
}

function cleanString(
  value: string
): string {
  return value.trim();
}

function cleanStringArray(
  values: string[]
): string[] {
  return [
    ...new Set(
      values
        .map(cleanString)
        .filter(Boolean)
    ),
  ];
}

export async function generateInterviewQuestion(
  data: GenerateInterviewQuestionInput
): Promise<any> {
  const userId =
    cleanString(data.userId);

  const profession =
    cleanString(data.profession);

  if (!userId) {
    throw new Error(
      "User ID is required."
    );
  }

  if (!profession) {
    throw new Error(
      "Profession is required."
    );
  }

  if (
    !Array.isArray(data.skills) ||
    data.skills.length === 0
  ) {
    throw new Error(
      "At least one skill is required."
    );
  }

  if (
    !Array.isArray(data.history)
  ) {
    throw new Error(
      "Interview history must be an array."
    );
  }

  const skills =
    cleanStringArray(
      data.skills
    );

  if (skills.length === 0) {
    throw new Error(
      "At least one valid skill is required."
    );
  }

  const prompt = buildInterviewQuestionPrompt({
    profession,
    role: data.role ? cleanString(data.role) : undefined,
    interviewType: data.interviewType,
    skills,
    difficulty: data.difficulty,
    language: data.language,
    history: data.history.map((h) => h.question),
  });

  const response = await aiManager.generate(prompt);

  let parsed: any;
  try {
    parsed = typeof response.json === "object" && response.json !== null
      ? response.json
      : JSON.parse(response.text);
  } catch {
    parsed = {
      question: "Could you explain a challenging project you worked on recently?",
      expectedAnswer: "Clear breakdown of situation, action, and result.",
      keyPoints: ["Problem definition", "Technical solution", "Impact"],
    };
  }

  return {
    id: `q-${Date.now()}`,
    question: parsed.question || "Tell me about your experience.",
    type: "technical",
    difficulty: data.difficulty,
    expectedAnswer: parsed.expectedAnswer || "Structured response.",
    keyPoints: Array.isArray(parsed.keyPoints) ? parsed.keyPoints : ["Clarity", "Depth"],
  };
}
