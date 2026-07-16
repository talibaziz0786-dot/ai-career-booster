import { askAI } from "../ai-manager.service.js";

import { SYSTEM_PROMPT } from "../prompts/shared/system.prompt.js";
import { JSON_MODE_PROMPT } from "../prompts/shared/json-mode.prompt.js";
import { RECRUITER_MODE } from "../prompts/shared/recruiter-mode.prompt.js";

import { retryAI } from "./ai-retry.service.js";
import { getCache, setCache } from "./ai-cache.service.js";
import { logAIRequest } from "./ai-logger.service.js";

interface AIRequest {

  module: string;

  prompt: string;

  language?: string;

  recruiterMode?: boolean;

  cacheKey?: string;

  cacheMinutes?: number;

  useCache?: boolean;

}

interface AIResponse {

  provider: string;

  content: string;

}

export async function runAI({

  module,

  prompt,

  language = "english",

  recruiterMode = false,

  cacheKey,

  cacheMinutes = 30,

  useCache = true,

}: AIRequest): Promise<AIResponse> {

  if (useCache && cacheKey) {

    const cached = getCache<AIResponse>(cacheKey);

    if (cached) {

      return cached;

    }

  }

  const started = Date.now();

  const finalPrompt = `

${SYSTEM_PROMPT}

${JSON_MODE_PROMPT}

${recruiterMode ? RECRUITER_MODE : ""}

Language:

${language}

--------------------------------

${prompt}

`;

  const response = await retryAI(async () => {

    return await askAI(finalPrompt);

  });

  if (useCache && cacheKey) {

    setCache(

      cacheKey,

      response,

      cacheMinutes

    );

  }

  logAIRequest({

    module,

    provider: response.provider,

    success: true,

    retries: 0,

    latency: Date.now() - started,

    timestamp: new Date().toISOString(),

  });

  return response;

}