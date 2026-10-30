import {
  GoogleGenAI,
} from "@google/genai";

import type {
  AIProviderAdapter,
  AIResponse,
} from "../types/provider.types.js";

import {
  AIProviderError,
  AIRateLimitError,
  AIUnavailableError,
  AIResponseError,
  normalizeAIError,
} from "../utils/AIErrors.js";

const DEFAULT_MODEL =
  "gemini-2.5-flash";

export class GeminiProvider
  implements AIProviderAdapter
{
  readonly name =
    "gemini" as const;

  private client:
    GoogleGenAI | null = null;

  private getClient(): GoogleGenAI {
    const apiKey =
      process.env.GEMINI_API_KEY?.trim();

    if (
      !apiKey ||
      apiKey.startsWith("YOUR_")
    ) {
      throw new AIProviderError(
        "Gemini API key is not configured.",
        this.name,
        401,
        false,
        "NOT_CONFIGURED"
      );
    }

    if (!this.client) {
      this.client =
        new GoogleGenAI({
          apiKey,
        });
    }

    return this.client;
  }

  async isAvailable(): Promise<boolean> {
    const key =
      process.env.GEMINI_API_KEY?.trim();

    return Boolean(
      key &&
      !key.startsWith("YOUR_")
    );
  }

  async generate(
    prompt: string
  ): Promise<AIResponse> {
    const model =
      process.env.GEMINI_MODEL?.trim() ||
      DEFAULT_MODEL;

    const startedAt =
      Date.now();

    try {
      const client =
        this.getClient();

      const response =
        await client.models.generateContent(
          {
            model,

            contents: prompt,

            config: {
              responseMimeType:
                "application/json",

              temperature: 0.2,
            },
          }
        );

      const latency =
        Date.now() - startedAt;

      const text =
        response.text;

      if (
        typeof text !== "string" ||
        !text.trim()
      ) {
        throw new AIResponseError(
          "Gemini returned an empty response.",
          this.name,
          200
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
          "Gemini returned invalid JSON.",
          this.name,
          200
        );
      }

      return {
        text: text.trim(),

        json,

        provider: this.name,

        model,

        latency,
      };
    } catch (error) {
      if (
        error instanceof
        AIProviderError
      ) {
        throw error;
      }

      /**
       * @google/genai SDK errors can have
       * status/statusCode/code/message.
       */
      const candidate =
        error as {
          status?: number;
          statusCode?: number;
          code?: number | string;
          message?: string;
        };

      const status =
        typeof candidate.status ===
        "number"
          ? candidate.status
          : typeof candidate.statusCode ===
              "number"
            ? candidate.statusCode
            : undefined;

      const message =
        typeof candidate.message ===
        "string"
          ? candidate.message
          : "Gemini request failed.";

      /**
       * Rate limit.
       */
      if (status === 429) {
        throw new AIRateLimitError(
          "Gemini rate limit or quota limit reached.",
          this.name,
          429
        );
      }

      /**
       * Temporary Google service error.
       */
      if (
        status === 408 ||
        status === 500 ||
        status === 502 ||
        status === 503 ||
        status === 504
      ) {
        throw new AIUnavailableError(
          `Gemini service is temporarily unavailable: ${message}`,
          this.name,
          status
        );
      }

      /**
       * Authentication.
       */
      if (
        status === 401 ||
        status === 403
      ) {
        throw new AIProviderError(
          "Gemini authentication failed. Check GEMINI_API_KEY.",
          this.name,
          status,
          false,
          "AUTHENTICATION_FAILED"
        );
      }

      /**
       * Invalid model/request.
       */
      if (
        status === 400 ||
        status === 404
      ) {
        throw new AIProviderError(
          `Gemini rejected the request: ${message}`,
          this.name,
          status,
          false,
          "BAD_REQUEST"
        );
      }

      /**
       * Final safe normalization.
       */
      throw normalizeAIError(
        error,
        this.name
      );
    }
  }
}