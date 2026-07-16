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

export async function askAI({
  userId,
  prompt,
}: AskAIOptions): Promise<AIResponse> {

  const aiConfig =
    await getAIModel(userId);

  const errors: unknown[] = [];

  // ==========================
  // PRIMARY MODEL
  // ==========================

  try {

    console.log(
      `Using ${aiConfig.primary}`
    );

    return await generateWithGemini(
      prompt,
      aiConfig.primary
    );

  } catch (error) {

    console.error(
      `${aiConfig.primary} Failed`
    );

    errors.push(error);

  }

  // ==========================
  // GEMINI FALLBACK
  // ==========================

  if (
    aiConfig.primary !==
    aiConfig.fallback
  ) {

    try {

      console.log(
        `Fallback → ${aiConfig.fallback}`
      );

      return await generateWithGemini(
        prompt,
        aiConfig.fallback
      );

    } catch (error) {

      console.error(
        `${aiConfig.fallback} Failed`
      );

      errors.push(error);

    }

  }

  // ==========================
  // DEEPSEEK
  // ==========================

  try {

    console.log("Using DeepSeek");

    return await generateWithDeepSeek(
      prompt
    );

  } catch (error) {

    console.error("DeepSeek Failed");

    errors.push(error);

  }

  // ==========================
  // QWEN
  // ==========================

  try {

    console.log("Using Qwen");

    return await generateWithQwen(
      prompt
    );

  } catch (error) {

    console.error("Qwen Failed");

    errors.push(error);

  }

  // ==========================
  // LOCAL AI
  // ==========================

  try {

    console.log("Using Local AI");

    return await generateWithLocalAI(
      prompt
    );

  } catch (error) {

    console.error("Local AI Failed");

    errors.push(error);

  }

  console.error(errors);

  throw new Error(
    "All AI Providers Failed."
  );

}