import type {
  AIProviderAdapter,
  AIResponse,
} from "../types/provider.types.js";

import {
  aiHttp,
} from "../utils/AIHttpClient.js";

import {
  AIProviderError,
  AIRateLimitError,
  AITimeoutError,
  AIUnavailableError,
  AIResponseError,
  normalizeAIError,
} from "../utils/AIErrors.js";

const DEFAULT_MODEL =
  "gpt-5-mini";

export class OpenAIProvider
  implements AIProviderAdapter
{
  readonly name =
    "openai" as const;

  async isAvailable(): Promise<boolean> {
    const key =
      process.env.OPENAI_API_KEY?.trim();

    return Boolean(
      key &&
      !key.startsWith("YOUR_")
    );
  }

  async generate(
    prompt: string
  ): Promise<AIResponse> {
    const apiKey =
      process.env.OPENAI_API_KEY?.trim();

    if (
      !apiKey ||
      apiKey.startsWith("YOUR_")
    ) {
      throw new AIProviderError(
        "OpenAI API key is not configured.",
        this.name,
        401,
        false,
        "NOT_CONFIGURED"
      );
    }

    const model =
      process.env.OPENAI_MODEL?.trim() ||
      DEFAULT_MODEL;

    const startedAt =
      Date.now();

    try {
      const response =
        await aiHttp.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model,

            messages: [
              {
                role: "system",
                content:
                  "You are CareerBoost AI. Return valid JSON only. Never use markdown fences.",
              },
              {
                role: "user",
                content: prompt,
              },
            ],

            response_format: {
              type: "json_object",
            },
          },
          {
            headers: {
              Authorization:
                `Bearer ${apiKey}`,
            },
          }
        );

      const latency =
        Date.now() - startedAt;

      /**
       * HTTP error handling.
       */
      if (
        response.status === 429
      ) {
        throw new AIRateLimitError(
          "OpenAI rate limit or quota limit reached.",
          this.name,
          429
        );
      }

      if (
        response.status === 408 ||
        response.status === 500 ||
        response.status === 502 ||
        response.status === 503 ||
        response.status === 504
      ) {
        throw new AIUnavailableError(
          "OpenAI service is temporarily unavailable.",
          this.name,
          response.status
        );
      }

      if (
        response.status === 401 ||
        response.status === 403
      ) {
        throw new AIProviderError(
          "OpenAI authentication failed. Check OPENAI_API_KEY.",
          this.name,
          response.status,
          false,
          "AUTHENTICATION_FAILED"
        );
      }

      if (
        response.status < 200 ||
        response.status >= 300
      ) {
        throw new AIProviderError(
          `OpenAI rejected the request with status ${response.status}.`,
          this.name,
          response.status,
          false,
          "HTTP_ERROR"
        );
      }

      const text =
        response.data
          ?.choices?.[0]
          ?.message?.content;

      if (
        typeof text !== "string" ||
        !text.trim()
      ) {
        throw new AIResponseError(
          "OpenAI returned an empty response.",
          this.name,
          response.status
        );
      }

      let json: unknown;

      try {
        json =
          JSON.parse(
            text.trim()
          );
      } catch {
        throw new AIResponseError(
          "OpenAI returned invalid JSON.",
          this.name,
          response.status
        );
      }

      return {
        text: text.trim(),

        json,

        provider: this.name,

        model,

        latency,

        tokensUsed:
          response.data
            ?.usage
            ?.total_tokens,
      };
    } catch (error) {
      if (
        error instanceof
        AIProviderError
      ) {
        throw error;
      }

      const normalized =
        normalizeAIError(
          error,
          this.name
        );

      /**
       * Preserve timeout semantics.
       */
      if (
        normalized instanceof
        AITimeoutError
      ) {
        throw normalized;
      }

      throw normalized;
    }
  }
}