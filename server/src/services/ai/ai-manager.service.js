import {
  askGemini,
} from "./gemini.service.js";

import {
  askDeepSeek,
} from "./deepseek.service.js";

import {
  askQwen,
} from "./qwen.service.js";

import {
  localAI,
} from "./local-ai.service.js";

export async function askAI(
  prompt
) {
  try {
    console.log("Using Gemini");

    const result =
      await askGemini(prompt);

    return {
      provider: "gemini",
      content: result,
    };
  }

  catch {

    try {

      console.log(
        "Using DeepSeek"
      );

      const result =
        await askDeepSeek(
          prompt
        );

      return {
        provider:
          "deepseek",
        content: result,
      };

    }

    catch {

      try {

        console.log(
          "Using Qwen"
        );

        const result =
          await askQwen(
            prompt
          );

        return {
          provider:
            "qwen",
          content: result,
        };

      }

      catch {

        console.log(
          "Using Local AI"
        );

        const result =
          await localAI(
            prompt
          );

        return {
          provider:
            "local",
          content: result,
        };

      }

    }

  }

}