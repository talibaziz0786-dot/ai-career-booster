import { generateWithGemini } from "./providers/gemini.provider.js";
import { generateWithDeepSeek } from "./providers/deepseek.provider.js";
import { generateWithQwen } from "./providers/qwen.provider.js";
import { generateWithLocalAI } from "./providers/local.provider.js";

import { getAIModel } from "./router/model-resolver.service.js";

export interface AIResponse {
  provider: string;
  model?: string;
  content: string;
}

interface AskAIOptions {
  userId: string;
  prompt: string;
}

interface ProviderAttempt {
  label: string;
  generate: (
    prompt: string
  ) => Promise<AIResponse>;
}

export async function askAI({
  userId,
  prompt,
}: AskAIOptions): Promise<AIResponse> {

  const aiConfig =
    await getAIModel(userId);

  const attempts: ProviderAttempt[] = [
    {
      label: aiConfig.primary,
      generate: (input) =>
        generateWithGemini(
          input,
          aiConfig.primary
        ),
    },
  ];

  if (
    aiConfig.primary !== aiConfig.fallback
  ) {
    attempts.push({
      label: aiConfig.fallback,
      generate: (input) =>
        generateWithGemini(
          input,
          aiConfig.fallback
        ),
    });
  }

  attempts.push(
    {
      label: "DeepSeek",
      generate: generateWithDeepSeek,
    },
    {
      label: "Qwen",
      generate: generateWithQwen,
    },
    {
      label: "Local AI",
      generate: generateWithLocalAI,
    }
  );

  const errors: unknown[] = [];

  for (const attempt of attempts) {

    try {

      console.log(
        `Using ${attempt.label}`
      );

      return await attempt.generate(prompt);

    } catch (error) {

      console.error(
        `${attempt.label} Failed`
      );

      errors.push(error);

    }

  }

  console.error(errors);

  throw new Error(
    "All AI Providers Failed."
  );

}
