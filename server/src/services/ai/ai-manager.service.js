import { askGemini }
from "./gemini.service.js";

import { askDeepSeek }
from "./deepseek.service.js";

import { askQwen }
from "./qwen.service.js";

import { localAI }
from "./local-ai.service.js";

export async function askAI(
  prompt
) {

  try {

    console.log(
      "Using Gemini"
    );

    return await askGemini(
      prompt
    );

  }

  catch (error) {

    console.log(
      "Gemini Failed"
    );

    try {

      console.log(
        "Using DeepSeek"
      );

      return await askDeepSeek(
        prompt
      );

    }

    catch {

      try {

        console.log(
          "Using Qwen"
        );

        return await askQwen(
          prompt
        );

      }

      catch {

        console.log(
          "Using Local AI"
        );

        return await localAI(
          prompt
        );

      }

      return {
  provider: "gemini",
  content: result,
};

    }

  }

}