import { runAI } from "./core/ai-orchestrator.service.js";
import { retryAI } from "./core/ai-retry.service.js";
import { getCache, setCache } from "./core/ai-cache.service.js";
import { parseAIJson } from "./core/ai-parser.js";
import { validateAIResponse } from "./core/ai-validator.js";
import { logAIRequest } from "./core/ai-logger.service.js";

import { CAREER_INTELLIGENCE_PROMPT } from "./prompts/career-intelligence.prompt.js";

import { ResumeIntelligence } from "../../types/resume-intelligence.js";

export async function generateCareerIntelligence(

  cacheKey: string,

  resumeText: string

): Promise<ResumeIntelligence> {

  const cached =

    getCache<ResumeIntelligence>(cacheKey);

  if (cached) {

    return cached;

  }

  const started = Date.now();

  const raw = await retryAI(

    async () => {

      return await runAI({

        module: "career-intelligence",

        prompt: `
${CAREER_INTELLIGENCE_PROMPT}

Resume:

${resumeText}
`,

      });

    }

  );

 const parsed =
  parseAIJson<ResumeIntelligence>(
    raw.content || ""
  );

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

 const result = parsed;
  setCache(

    cacheKey,

    result,

    30

  );

  logAIRequest({

    module: "career-intelligence",

    provider: raw.provider,

    success: true,

    retries: 0,

    latency:

      Date.now() - started,

    timestamp:

      new Date().toISOString(),

  });

  return result;

}