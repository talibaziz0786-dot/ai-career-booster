import { aiManager } from "./ai-engine.js";

import {
  recordAIProviderSuccess,
} from "./ai-telemetry.service.js";

import {
  assertAIQuota,
  commitAIUsage,
} from "./ai-usage.service.js";

import type {
  AIProviderName,
} from "./types/provider.types.js";

import type {
  AIUsageFeature,
} from "../../constants/ai-usage.constants.js";

/**
 * Application-level AI modules.
 *
 * These represent actual CareerBoost features.
 * They are intentionally different from AIUsageFeature,
 * which represents the canonical quota buckets.
 */
export type AIUsageModule =
  | "general"
  | "career-intelligence"
  | "resume-builder"
  | "resume-analysis"
  | "cover-letter"
  | "interview"
  | "interview-answer"
  | "interview-evaluation"
  | "interview-feedback"
  | "recruiter-simulation"
  | "linkedin-optimizer"
  | "career-insights"
  | "evaluation"
  | "competency"
  | "question-regenerator";

/**
 * Canonical mapping:
 *
 * Application module
 *        ↓
 * AI usage/quota feature
 *
 * Keep this mapping centralized.
 * Do not duplicate this logic inside individual services.
 */
const AI_MODULE_TO_FEATURE: Record<
  AIUsageModule,
  AIUsageFeature
> = {
  general: "general",

  "career-intelligence": "career",
  "career-insights": "career",

  "resume-builder": "resume",

  "resume-analysis": "ats",

  "cover-letter": "coverLetter",

  "linkedin-optimizer": "linkedin",

  "recruiter-simulation": "recruiter",

  interview: "interview",
  "interview-answer": "interview",
  "interview-evaluation": "interview",
  "interview-feedback": "interview",

  evaluation: "interview",
  competency: "interview",
  "question-regenerator": "interview",
};

/**
 * Converts an application module into
 * the canonical quota feature.
 */
function moduleToFeature(
  module: AIUsageModule
): AIUsageFeature {
  return AI_MODULE_TO_FEATURE[module];
}

/**
 * Input accepted by the centralized AI orchestrator.
 */
export interface AIOrchestratorInput {
  /**
   * Authenticated application user.
   */
  userId: string;

  /**
   * Application-level AI module.
   *
   * Example:
   *
   * "resume-builder"
   * "career-intelligence"
   * "interview"
   */
  module?: AIUsageModule;

  /**
   * Optional explicit quota feature.
   *
   * Normally this should NOT be required because
   * the orchestrator derives it from `module`.
   *
   * Explicit feature takes priority when supplied.
   */
  feature?: AIUsageFeature;

  /**
   * Prompt sent to the AI provider manager.
   */
  prompt: string;

  /**
   * Optional language hint.
   */
  language?: string;

  /**
   * Optional recruiter-mode flag.
   */
  recruiterMode?: boolean;

  /**
   * Enables centralized quota enforcement.
   *
   * false/undefined:
   *     AI request runs without quota handling.
   *
   * true:
   *     assert quota before provider call
   *     and commit usage after successful response.
   */
  enforceQuota?: boolean;
}

/**
 * Standard response returned by the centralized
 * AI orchestration layer.
 */
export interface AIOrchestratorResponse {
  /**
   * Canonical AI response text.
   */
  text: string;

  /**
   * Parsed JSON if the provider returned structured JSON.
   */
  json?: unknown;

  /**
   * Backward-compatible alias.
   *
   * Existing CareerBoost services currently consume
   * `response.content`.
   */
  content: string;

  /**
   * Provider that successfully generated the response.
   */
  provider: AIProviderName;

  /**
   * Model used by the successful provider.
   */
  model: string;

  /**
   * Total provider latency.
   */
  latency: number;

  /**
   * Number of provider attempts performed
   * by AIManager.
   */
  attempts: number;

  /**
   * Providers attempted during fallback.
   */
  attemptedProviders: AIProviderName[];

  /**
   * Quota information when quota enforcement
   * or quota state is available.
   */
  usage?: {
    used: number;
    limit: number;
    remaining: number;
    resetAt: Date;
  };
}

/**
 * Maximum prompt size accepted by the orchestrator.
 *
 * This prevents accidental oversized requests
 * from reaching the provider layer.
 */
const MAX_PROMPT_LENGTH = 30_000;

/**
 * Validates all mandatory AI request fields.
 */
function validateInput(
  data: AIOrchestratorInput
): void {
  if (!data.userId?.trim()) {
    throw new Error(
      "Authenticated userId is required for AI requests."
    );
  }

  if (!data.prompt?.trim()) {
    throw new Error(
      "AI prompt cannot be empty."
    );
  }

  if (
    data.prompt.length >
    MAX_PROMPT_LENGTH
  ) {
    throw new Error(
      `AI prompt exceeds the maximum allowed size of ${MAX_PROMPT_LENGTH} characters.`
    );
  }
}

/**
 * Returns the application module.
 *
 * Existing services that have not yet been migrated
 * can continue working without explicitly providing
 * a module.
 */
function getModule(
  module?: AIUsageModule
): AIUsageModule {
  return module ?? "general";
}

/**
 * Resolves the final quota feature.
 *
 * Priority:
 *
 * 1. Explicit `feature`
 * 2. Module → feature mapping
 */
function getFeature(
  data: AIOrchestratorInput
): AIUsageFeature {
  if (data.feature) {
    return data.feature;
  }

  return moduleToFeature(
    getModule(data.module)
  );
}

/**
 * Main centralized AI execution pipeline.
 *
 * Flow:
 *
 * validate
 *    ↓
 * resolve module
 *    ↓
 * resolve quota feature
 *    ↓
 * optional quota assertion
 *    ↓
 * AIManager
 *    ↓
 * provider success
 *    ↓
 * telemetry
 *    ↓
 * optional quota commit
 *    ↓
 * normalized response
 */
export async function runAI(
  data: AIOrchestratorInput
): Promise<AIOrchestratorResponse> {
  validateInput(data);

  const module =
    getModule(data.module);

  const feature =
    getFeature(data);

  /**
   * Stores quota state when quota checking
   * is enabled.
   */
  let quotaState:
    Awaited<
      ReturnType<typeof assertAIQuota>
    > | undefined;

  /**
   * IMPORTANT:
   *
   * Quota enforcement is opt-in.
   *
   * This prevents double counting while some
   * legacy routes may still have external
   * middleware-based quota protection.
   */
  if (data.enforceQuota) {
    quotaState =
      await assertAIQuota(
        data.userId,
        feature
      );
  }

  const startedAt =
    Date.now();

  try {
    /**
     * AIManager owns:
     *
     * - provider selection
     * - fallback
     * - provider availability
     * - provider execution
     * - provider-level failure handling
     */
    const response =
      await aiManager.generate(
        data.prompt
      );

    /**
     * Prefer provider-reported latency.
     * Fall back to orchestrator measurement.
     */
    const latency =
      response.latency ??
      Date.now() - startedAt;

    /**
     * Record telemetry only after a genuine
     * successful AI response.
     */
    recordAIProviderSuccess(
      response.provider,
      latency
    );

    let usage:
      AIOrchestratorResponse["usage"];

    /**
     * Commit quota ONLY after successful
     * provider generation.
     *
     * Therefore:
     *
     * provider failure
     *     ↓
     * no commit
     *
     * provider success
     *     ↓
     * commit
     */
    if (data.enforceQuota) {
      const committed =
        await commitAIUsage(
          data.userId,
          feature
        );

      usage = {
        used:
          committed.used,

        limit:
          committed.limit,

        remaining:
          committed.remaining,

        resetAt:
          committed.resetAt,
      };
    } else if (quotaState) {
      usage = {
        used:
          quotaState.used,

        limit:
          quotaState.limit,

        remaining:
          quotaState.remaining,

        resetAt:
          quotaState.resetAt,
      };
    }

    /**
     * Normalize the provider response
     * into the public orchestrator contract.
     */
    return {
      text:
        response.text,

      json:
        response.json,

      /**
       * Backward compatibility for existing
       * CareerBoost services.
       */
      content:
        response.text,

      provider:
        response.provider,

      model:
        response.model,

      latency,

      attempts:
        response.attempts,

      attemptedProviders:
        response.attemptedProviders,

      usage,
    };
  } catch (error) {
    /**
     * Provider fallback and provider-specific
     * failure tracking belong to AIManager.
     *
     * Do not fabricate provider information here.
     */
    throw error;
  }
}

/**
 * Backward-compatible public API.
 *
 * Existing services can continue using:
 *
 * await askAI({
 *   userId,
 *   prompt,
 * });
 *
 * New services should provide:
 *
 * await askAI({
 *   userId,
 *   module: "resume-builder",
 *   prompt,
 *   enforceQuota: true,
 * });
 */
export async function askAI(
  data: AIOrchestratorInput
): Promise<AIOrchestratorResponse> {
  return runAI(data);
}