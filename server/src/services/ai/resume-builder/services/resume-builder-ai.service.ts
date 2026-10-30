import { runAI } from "../../../../lib/ai/ai-orchestrator.js";

import {
  getAIFromCache,
  setAIInCache,
} from "../../../../lib/ai/utils/ai-cache.js";

import {
  logAIRequest,
} from "../../../../lib/ai/utils/ai-logger.js";

import {
  RESUME_BUILDER_PROMPT,
} from "../prompts/resume-builder.prompt.js";

import {
  parseResumeBuilder,
} from "../parser/resume-builder.parser.js";

import {
  validateResumeBuilder,
} from "../validators/resume-builder.validator.js";



/**
 * Maximum size of the user resume payload that this feature
 * will intentionally send into the AI prompt.
 *
 * This is kept below the centralized orchestrator limit so
 * the Resume Builder has room for its system instructions,
 * language metadata and formatting contract.
 */
const MAX_RESUME_INPUT_LENGTH = 24_000;

/**
 * Removes fields that are not useful to the AI Resume Writer.
 *
 * Binary/base64 photo data is especially important here.
 * A profile image should never be sent to the text-generation
 * model as part of the resume-generation prompt.
 */
function sanitizeResumeInput(
  resumeText: string
): string {
  const trimmed = resumeText.trim();

  if (!trimmed) {
    throw new Error(
      "Resume text is required."
    );
  }

  try {
    const parsed = JSON.parse(trimmed);

    if (
      parsed &&
      typeof parsed === "object" &&
      !Array.isArray(parsed)
    ) {
      const sanitized = {
        ...parsed,
      };

      /**
       * Photo/image data is presentation information,
       * not resume-writing information.
       *
       * Remove common image payload fields if present.
       */
      delete sanitized.photo;
      delete sanitized.photoUrl;
      delete sanitized.profilePhoto;
      delete sanitized.avatar;
      delete sanitized.image;
      delete sanitized.imageUrl;

      return JSON.stringify(
        sanitized
      );
    }
  } catch {
    /**
     * If the input is not JSON, preserve the original
     * text rather than silently destroying user content.
     */
  }

  return trimmed;
}

/**
 * Builds a deterministic cache key without allowing
 * accidental whitespace differences to create duplicate entries.
 */
function createCacheKey(
  language: string,
  resume: string
): string {
  return [
    "resume-builder",
    language,
    resume,
  ].join(":");
}

export async function buildResume(
  userId: string,
  resumeText: string,
  language = "english"
) {
  if (!userId?.trim()) {
    throw new Error(
      "User ID is required."
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

  if (!language?.trim()) {
    throw new Error(
      "Resume language is required."
    );
  }

  const normalizedLanguage =
    language
      .trim()
      .toLowerCase();

  const normalizedResume =
    sanitizeResumeInput(
      resumeText
    );

  /**
   * Do not allow the Resume Builder to consume
   * the entire centralized AI prompt budget.
   *
   * This gives the system prompt enough space while
   * preserving the orchestrator's 30k hard safety limit.
   */
  if (
    normalizedResume.length >
    MAX_RESUME_INPUT_LENGTH
  ) {
    throw new Error(
      `Resume input is too large. Please keep the resume data under ${MAX_RESUME_INPUT_LENGTH} characters.`
    );
  }

  const cacheKey =
    createCacheKey(
      normalizedLanguage,
      normalizedResume
    );

  const cached =
    getAIFromCache(
      cacheKey
    );

  if (cached) {
    return cached;
  }

  const startedAt =
    Date.now();

  const prompt = `
${RESUME_BUILDER_PROMPT}

LANGUAGE
${normalizedLanguage}

USER RESUME DATA
${normalizedResume}
`;

  const response =
    await runAI({
      userId,

      module:
        "resume-builder",

      feature:
        "resume",

      prompt,

      enforceQuota:
        true,
    });

  const parsed =
    parseResumeBuilder(
      response.content
    );

  if (
    !validateResumeBuilder(
      parsed
    )
  ) {
    throw new Error(
      "Invalid Resume Builder response."
    );
  }

  /**
   * Only validated AI output is cached.
   */
  setAIInCache(
    cacheKey,
    parsed,
    30
  );

  logAIRequest({
    module:
      "resume-builder",

    provider:
      response.provider,

    success:
      true,

    retries:
      Math.max(
        response.attempts - 1,
        0
      ),

    latency:
      Date.now() -
      startedAt,
  });

  /**
   * Persist only after successful parsing
   * and validation.
   */
  

  return parsed;
}