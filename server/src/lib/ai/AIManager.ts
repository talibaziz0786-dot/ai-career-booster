import type {
  AIProviderAdapter,
  AIProviderName,
  AIResponse,
} from "./types/provider.types.js";

import {
  AIProviderError,
} from "./utils/AIErrors.js";

import ProviderHealth from "./ProviderHealth.js";

import {
  recordAIProviderFailure,
  recordAIProviderSuccess,
} from "./ai-telemetry.service.js";

export interface AIManagerResult
  extends AIResponse {
  attempts: number;

  attemptedProviders:
    AIProviderName[];
}

interface ProviderFailure {
  provider: AIProviderName;

  message: string;

  status?: number;
}

/**
 * ============================================================
 * AI Manager
 * ============================================================
 *
 * Responsibilities:
 *
 * - Provider availability
 * - Ordered fallback
 * - Health-aware provider selection
 * - Provider failure classification
 * - Safe telemetry
 * - No duplicated application-level retries
 *
 * NOTE:
 * Interview services already perform their own
 * higher-level retry logic. Therefore this manager
 * intentionally performs ONE request per provider
 * per run.
 * ============================================================
 */

export class AIManager {
  private readonly providers:
    AIProviderAdapter[];

  constructor(
    providers: AIProviderAdapter[]
  ) {
    if (!providers.length) {
      throw new Error(
        "AIManager requires at least one provider."
      );
    }

    this.providers = [
      ...providers,
    ];
  }

  async generate(
    prompt: string
  ): Promise<AIManagerResult> {
    if (
      !prompt ||
      !prompt.trim()
    ) {
      throw new Error(
        "AI prompt cannot be empty."
      );
    }

    const attemptedProviders:
      AIProviderName[] = [];

    const errors:
      ProviderFailure[] = [];

    let configuredProviderCount =
      0;

    let lastError:
      unknown;

    /**
     * --------------------------------------------------------
     * First pass:
     *
     * Try every configured provider that is currently healthy.
     * --------------------------------------------------------
     */

    for (
      const provider of
        this.providers
    ) {
      const providerName =
        provider.name;

      /**
       * Availability means configured.
       */
      let available = false;

      try {
        available =
          await provider.isAvailable();
      } catch (error) {
        lastError = error;

        console.error(
          `[AI] Availability check failed: ${providerName}`,
          error instanceof Error
            ? error.message
            : error
        );

        continue;
      }

      if (!available) {
        continue;
      }

      configuredProviderCount +=
        1;

      /**
       * Healthy providers get first priority.
       */
      if (
        !ProviderHealth.canUse(
          providerName
        )
      ) {
        console.warn(
          `[AI] Provider temporarily unhealthy: ${providerName}`
        );

        continue;
      }

      console.log(
        `[AI] Trying provider: ${providerName}`
      );

      attemptedProviders.push(
        providerName
      );

      const startedAt =
        Date.now();

      try {
        const response =
          await provider.generate(
            prompt
          );

        const latency =
          response.latency ??
          Date.now() -
            startedAt;

        if (
          !response.text?.trim()
        ) {
          throw new AIProviderError(
            `${providerName} returned an empty response.`,
            providerName,
            undefined,
            false,
            "EMPTY_RESPONSE"
          );
        }

        ProviderHealth.markSuccess(
          providerName
        );

        recordAIProviderSuccess(
          providerName,
          latency
        );

        console.log(
          `[AI] Provider success: ${providerName}`
        );

        return {
          ...response,

          attempts:
            attemptedProviders.length,

          attemptedProviders,
        };
      } catch (error) {
        lastError =
          error;

        const latency =
          Date.now() -
          startedAt;

        const providerError =
          error instanceof
          AIProviderError
            ? error
            : new AIProviderError(
                error instanceof Error
                  ? error.message
                  : `${providerName} request failed.`,
                providerName,
                undefined,
                true
              );

        ProviderHealth.markFailure(
          providerName
        );

        recordAIProviderFailure(
          providerName,
          latency
        );

        errors.push({
          provider:
            providerName,

          message:
            providerError.message,

          status:
            providerError.status,
        });

        console.error(
          `[AI] Provider failed: ${providerName}`,
          {
            message:
              providerError.message,

            status:
              providerError.status,

            latency,
          }
        );

        /**
         * Continue immediately to the next provider.
         */
        continue;
      }
    }

    /**
     * --------------------------------------------------------
     * Second pass:
     *
     * If all configured providers were temporarily unhealthy,
     * do NOT incorrectly say "not configured".
     *
     * Give each configured provider one more opportunity.
     *
     * This is intentionally only ONE additional pass.
     * --------------------------------------------------------
     */

    if (
      configuredProviderCount >
        0 &&
      attemptedProviders.length ===
        0
    ) {
      console.warn(
        "[AI] All configured providers are temporarily unhealthy. Performing recovery pass."
      );

      for (
        const provider of
          this.providers
      ) {
        const providerName =
          provider.name;

        let available = false;

        try {
          available =
            await provider.isAvailable();
        } catch {
          continue;
        }

        if (!available) {
          continue;
        }

        /**
         * Don't wait for cooldown here.
         *
         * The purpose is recovery after all
         * providers entered cooldown simultaneously.
         */
        if (
          attemptedProviders.includes(
            providerName
          )
        ) {
          continue;
        }

        attemptedProviders.push(
          providerName
        );

        const startedAt =
          Date.now();

        try {
          console.log(
            `[AI] Recovery attempt: ${providerName}`
          );

          const response =
            await provider.generate(
              prompt
            );

          const latency =
            response.latency ??
            Date.now() -
              startedAt;

          if (
            !response.text?.trim()
          ) {
            throw new AIProviderError(
              `${providerName} returned an empty response.`,
              providerName,
              undefined,
              false,
              "EMPTY_RESPONSE"
            );
          }

          ProviderHealth.markSuccess(
            providerName
          );

          recordAIProviderSuccess(
            providerName,
            latency
          );

          return {
            ...response,

            attempts:
              attemptedProviders.length,

            attemptedProviders,
          };
        } catch (error) {
          lastError =
            error;

          const latency =
            Date.now() -
            startedAt;

          const providerError =
            error instanceof
            AIProviderError
              ? error
              : new AIProviderError(
                  error instanceof Error
                    ? error.message
                    : `${providerName} request failed.`,
                  providerName,
                  undefined,
                  true
                );

          ProviderHealth.markFailure(
            providerName
          );

          recordAIProviderFailure(
            providerName,
            latency
          );

          errors.push({
            provider:
              providerName,

            message:
              providerError.message,

            status:
              providerError.status,
          });

          console.error(
            `[AI] Recovery provider failed: ${providerName}`,
            {
              message:
                providerError.message,

              status:
                providerError.status,

              latency,
            }
          );
        }
      }
    }

    /**
     * --------------------------------------------------------
     * No provider configured.
     * --------------------------------------------------------
     */

    if (
      configuredProviderCount ===
      0
    ) {
      throw new AIProviderError(
        "No AI provider is configured. Check OPENAI_API_KEY, GEMINI_API_KEY, and OPENROUTER_API_KEY.",
        "system",
        undefined,
        false,
        "NO_PROVIDER_CONFIGURED"
      );
    }

    /**
     * --------------------------------------------------------
     * All providers failed.
     * --------------------------------------------------------
     */

    console.error(
      "[AI] All configured providers failed.",
      {
        attemptedProviders,
        errors,
      }
    );

    const errorSummary =
      errors.length
        ? errors
            .map(
              (item) =>
                `${item.provider}: ${item.message}`
            )
            .join(" | ")
        : "No provider request succeeded.";

    throw new AIProviderError(
      `All configured AI providers failed. ${errorSummary}`,
      errors.at(-1)
        ?.provider ??
        attemptedProviders.at(-1) ??
        "system",
      errors.at(-1)?.status,
      true,
      "ALL_PROVIDERS_FAILED"
    );
  }
}