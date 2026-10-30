import { askAI } from "../../lib/ai/ai-orchestrator.js";
import { parseAIJson } from "../../utils/json-parser.js";
import { buildInterviewAnswerPrompt } from "../../prompts/interview-answer.prompt.js";

export interface GenerateInterviewAnswerInput {
  userId: string;

  profession: string;

  role: string;

  interviewType: "skill" | "hr" | "mixed";

  difficulty: "beginner" | "intermediate" | "advanced";

  language: "english" | "hindi" | "hinglish" | "urdu";

  skill: string;

  question: string;

  answer: string;
}

export async function generateInterviewAnswer(
  data: GenerateInterviewAnswerInput
) {
  const prompt = buildInterviewAnswerPrompt(data);

  const response = await askAI({
    userId: data.userId,
    prompt,
  });

  const parsed = parseAIJson(response.content);

  return {
    ...parsed,

    provider: response.provider,

    model: response.model,
  };
}
