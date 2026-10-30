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
  AIUnavailableError,
  AIResponseError,
  normalizeAIError,
} from "../utils/AIErrors.js";

const DEFAULT_MODEL =
  "openrouter/free";

export class OpenRouterProvider
  implements AIProviderAdapter
{
  readonly name =
    "openrouter" as const;

  async isAvailable(): Promise<boolean> {
    const key =
      process.env.OPENROUTER_API_KEY?.trim();

    return Boolean(
      key &&
      !key.startsWith("YOUR_")
    );
  }

  async generate(
    prompt: string
  ): Promise<AIResponse> {
    const apiKey =
      process.env.OPENROUTER_API_KEY?.trim();

    if (
      !apiKey ||
      apiKey.startsWith("YOUR_")
    ) {
      throw new AIProviderError(
        "OpenRouter API key is not configured.",
        this.name,
        401,
        false,
        "NOT_CONFIGURED"
      );
    }

    const model =
      process.env.OPENROUTER_MODEL?.trim() ||
      DEFAULT_MODEL;

    const startedAt =
      Date.now();

    try {
      const response =
        await aiHttp.post(
          "https://openrouter.ai/api/v1/chat/completions",
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

            /**
             * Ask OpenRouter-compatible models
             * for JSON where supported.
             *
             * The parser below still validates
             * the actual response.
             */
            response_format: {
              type: "json_object",
            },

            stream: false,
          },
          {
            headers: {
              Authorization:
                `Bearer ${apiKey}`,

              "HTTP-Referer":
                process.env.APP_URL ||
                "http://localhost:5173",

              "X-Title":
                "CareerBoost AI",
            },
          }
        );

      const latency =
        Date.now() - startedAt;

      /**
       * HTTP status handling.
       */
      if (
        response.status === 429
      ) {
        throw new AIRateLimitError(
          "OpenRouter rate limit or quota reached.",
          this.name,
          429
        );
      }

      if (
        response.status === 401 ||
        response.status === 403
      ) {
        throw new AIProviderError(
          "OpenRouter authentication failed. Check OPENROUTER_API_KEY.",
          this.name,
          response.status,
          false,
          "AUTHENTICATION_FAILED"
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
          "OpenRouter service is temporarily unavailable.",
          this.name,
          response.status
        );
      }

      if (
        response.status < 200 ||
        response.status >= 300
      ) {
        throw new AIProviderError(
          `OpenRouter rejected the request with status ${response.status}.`,
          this.name,
          response.status,
          false,
          "HTTP_ERROR"
        );
      }

      /**
       * OpenRouter may return content as:
       *
       * message.content
       *
       * Some providers/models can return
       * content arrays, so normalize both.
       */
      const rawContent =
        response.data
          ?.choices?.[0]
          ?.message
          ?.content;

      let text: string | null =
        null;

      if (
        typeof rawContent === "string"
      ) {
        text =
          rawContent.trim();
      } else if (
        Array.isArray(rawContent)
      ) {
        const parts =
          rawContent
            .map((part: unknown) => {
              if (
                typeof part === "string"
              ) {
                return part;
              }

              if (
                part &&
                typeof part ===
                  "object" &&
                "text" in part
              ) {
                const value =
                  (
                    part as {
                      text?: unknown;
                    }
                  ).text;

                return typeof value ===
                  "string"
                  ? value
                  : "";
              }

              return "";
            })
            .filter(Boolean);

        if (parts.length) {
          text =
            parts.join("\n").trim();
        }
      }

      /**
       * Some OpenRouter responses can contain
       * a refusal/message field.
       */
      if (
        (!text || !text.trim()) &&
        typeof response.data
          ?.choices?.[0]
          ?.message
          ?.refusal === "string"
      ) {
        throw new AIResponseError(
          `OpenRouter model refused the request: ${response.data.choices[0].message.refusal}`,
          this.name,
          response.status
        );
      }

      if (
        !text ||
        !text.trim()
      ) {
        /**
         * Log only safe structural information.
         *
         * Never log the API key.
         */
        console.error(
          "[AI][OpenRouter] Empty model response.",
          {
            status:
              response.status,

            model,

            finishReason:
              response.data
                ?.choices?.[0]
                ?.finish_reason,

            id:
              response.data?.id,
          }
        );

        throw new AIResponseError(
          "OpenRouter returned an empty response.",
          this.name,
          response.status
        );
      }

      /**
       * Remove accidental markdown fences
       * before JSON parsing.
       */
      const cleanedText =
        text
          .replace(
            /^```json\s*/i,
            ""
          )
          .replace(
            /^```\s*/i,
            ""
          )
          .replace(
            /\s*```$/i,
            ""
          )
          .trim();

      let json: unknown;

      try {
        json =
          JSON.parse(
            cleanedText
          );
      } catch {
        throw new AIResponseError(
          "OpenRouter returned invalid JSON.",
          this.name,
          response.status
        );
      }

      return {
        text: cleanedText,

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

      throw normalizeAIError(
        error,
        this.name
      );
    }
  }
}