import { runAI } from "../../core/ai-orchestrator.service.js";

import { retryAI } from "../../core/ai-retry.service.js";

import { getCache, setCache } from "../../core/ai-cache.service.js";

import { logAIRequest } from "../../core/ai-logger.service.js";

import { RESUME_BUILDER_PROMPT } from "../prompts/resume-builder.prompt.js";

import { parseResumeBuilder } from "../parser/resume-builder.parser.js";

import { validateResumeBuilder } from "../validators/resume-builder.validator.js";

import { saveResumeVersion, } from "../../resume-builder/resume-builder-db.service.js";

export async function buildResume(

  userId: string,

  resumeText: string,

  language = "english"

) {

  const cacheKey = `resume-builder:${language}:${resumeText}`;

  const cached = getCache(cacheKey);

  if (cached) {

    return cached;

  }

  const started = Date.now();

  const response = await retryAI(async () => {

    return runAI({

      module: "resume-builder",

      prompt: `

${RESUME_BUILDER_PROMPT}

Language:

${language}

Resume:

${resumeText}

`,

    });

  });

  console.log("========== GEMINI RESPONSE ==========");
console.log(response.content);
console.log("=====================================");

  const parsed = parseResumeBuilder(

    response.content

  );

  if (

    !validateResumeBuilder(parsed)

  ) {

    throw new Error(

      "Invalid Resume Builder response."

    );

  }

  setCache(

    cacheKey,

    parsed,

    30

  );

  logAIRequest({

    module: "resume-builder",

    provider: response.provider,

    success: true,

    retries: 0,

    latency: Date.now() - started,

    timestamp: new Date().toISOString(),

  });

 await saveResumeVersion(

userId,

parsed,

language

);

return parsed;

}