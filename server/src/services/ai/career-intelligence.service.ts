import { runAI } from "../../lib/ai/ai-orchestrator.js";

import {
  retryAI,
} from "../../lib/ai/utils/ai-retry.js";

import {
  getAIFromCache,
  setAIInCache,
} from "../../lib/ai/utils/ai-cache.js";

import {
  parseAIJson,
} from "../../lib/ai/utils/ai-json.js";

import {
  validateAIResponse,
} from "../../lib/ai/utils/ai-validator.js";

import {
  logAIRequest,
} from "../../lib/ai/utils/ai-logger.js";

import {
  CAREER_INTELLIGENCE_PROMPT,
} from "./prompts/career-intelligence.prompt.js";

import type {
  ResumeIntelligence,
} from "../../types/resume-intelligence.js";

function isObject(
  value: unknown
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

export async function generateCareerIntelligence(
  userId: string,
  cacheKey: string,
  resumeText: string
): Promise<ResumeIntelligence> {
  if (!userId?.trim()) {
    throw new Error(
      "User ID is required for career intelligence."
    );
  }

  if (
    typeof resumeText !== "string" ||
    !resumeText.trim()
  ) {
    throw new Error(
      "Resume text is required."
    );
  }

  const cached =
    getAIFromCache<ResumeIntelligence>(
      cacheKey
    );

  if (cached) {
    return cached;
  }

  const startedAt = Date.now();

  const response = await retryAI(
    async () =>
      runAI({
        userId,

        module:
          "career-intelligence",

        feature:
          "career",

        prompt: `
${CAREER_INTELLIGENCE_PROMPT}

Candidate Resume:

${resumeText}
`,

        /*
         * Career Intelligence is now handled
         * by the centralized quota system.
         */
        enforceQuota: true,
      })
  );

  const parsed =
    parseAIJson(
      response.content
    );

  if (!isObject(parsed)) {
    throw new Error(
      "Career Intelligence AI returned an invalid response structure."
    );
  }

  validateAIResponse(
    parsed,
    [
      {
        field: "profession",
        type: "string",
        required: true,
      },
      {
        field: "overallScore",
        type: "number",
        required: true,
      },
      {
        field: "strengths",
        type: "array",
        required: true,
      },
      {
        field: "weaknesses",
        type: "array",
        required: true,
      },
      {
        field: "careerAdvice",
        type: "string",
        required: true,
      },
    ]
  );

  const result =
  parsed as unknown as ResumeIntelligence;

  /*
   * Cache only a successfully validated
   * AI response.
   */
  setAIInCache(
    cacheKey,
    result,
    30
  );

  logAIRequest({
    module:
      "career-intelligence",

    provider:
      response.provider,

    success: true,

    retries:
      Math.max(
        response.attempts - 1,
        0
      ),

    latency:
      Date.now() - startedAt,
  });

  return result;
}