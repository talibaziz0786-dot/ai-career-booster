import { askAI } from "../../lib/ai/ai-orchestrator.js";

import { parseAIJson } from "../../utils/json-parser.js";

import { buildInterviewEvaluationPrompt } from "../../prompts/interview-evaluation.prompt.js";

export interface InterviewEvaluationInput {
  userId: string;

  profession: string;

  role: string;

  interviewType: "skill" | "hr" | "mixed";

  difficulty: "beginner" | "intermediate" | "advanced";

  language: "english" | "hindi" | "hinglish" | "urdu";

  currentSkill: string;

  question: string;

  answer: string;

  previousQuestions: string[];

  previousScores: number[];

  previousWeaknesses: string[];

  previousStrengths: string[];
}

export async function evaluateInterviewAnswer(
  data: InterviewEvaluationInput
) {
  const prompt =
    buildInterviewEvaluationPrompt(data);

  const response =
    await askAI({
      userId: data.userId,
      prompt,
    });

  const parsed =
    parseAIJson(response.content);

  return {
    ...parsed,

    provider: response.provider,

    model: response.model,
  };
}
