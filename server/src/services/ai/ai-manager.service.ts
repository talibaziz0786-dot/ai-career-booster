import { generateWithGemini } from "./providers/gemini.provider.js";
import { generateWithDeepSeek } from "./providers/deepseek.provider.js";
import { generateWithQwen } from "./providers/qwen.provider.js";
import { generateWithLocalAI } from "./providers/local.provider.js";

import { getAIModel } from "./router/model-resolver.service.js";

import { toError } from "../../utils/errors.js";

export interface AIResponse {
  provider: string;
  model?: string;
  content: string;
}

interface AskAIOptions {
  userId?: string;
  prompt: string;
}

export async function askAI({
  userId,
  prompt,
}: AskAIOptions): Promise<AIResponse> {

  const aiConfig =
    await getAIModel(userId);

  const errors: Error[] = [];

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
      `${aiConfig.primary} Failed:`,
      toError(error).message
    );

    errors.push(
      new Error(
        `${aiConfig.primary} failed`,
        { cause: error }
      )
    );

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
        `${aiConfig.fallback} Failed:`,
        toError(error).message
      );

      errors.push(
        new Error(
          `${aiConfig.fallback} failed`,
          { cause: error }
        )
      );

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

    console.error(
      "DeepSeek Failed:",
      toError(error).message
    );

    errors.push(
      new Error("DeepSeek failed", {
        cause: error,
      })
    );

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

    console.error(
      "Qwen Failed:",
      toError(error).message
    );

    errors.push(
      new Error("Qwen failed", {
        cause: error,
      })
    );

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

    console.error(
      "Local AI Failed:",
      toError(error).message
    );

    errors.push(
      new Error("Local AI failed", {
        cause: error,
      })
    );

  }

  throw new AggregateError(
    errors,
    `All AI providers failed: ${errors
      .map((error) => toError(error).message)
      .join("; ")}`
  );

}