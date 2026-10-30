import {
  askAI,
} from "../lib/ai/ai-orchestrator.js";

import {
  buildResumeAnalysisPrompt,
} from "./ai/prompts/resume-analysis.prompt.js";

/* ==========================================================
   Resume Analysis Service
========================================================== */

export async function analyzeResumeWithAI(
  userId: string,
  resumeText: string,
  language: string = "english"
) {
  if (!userId) {
    throw new Error(
      "User ID is required for resume analysis."
    );
  }

  if (
    !resumeText?.trim()
  ) {
    throw new Error(
      "Resume text cannot be empty."
    );
  }

  const prompt =
    buildResumeAnalysisPrompt(
      resumeText,
      language
    );

  const aiResponse =
    await askAI({
      userId,
      prompt,
    });

  const rawContent =
    aiResponse.content
      ?.trim() || "";

  if (!rawContent) {
    throw new Error(
      "AI returned an empty resume analysis response."
    );
  }

  console.log(
    "========== AI RESUME ANALYSIS =========="
  );

  console.log(
    rawContent
  );

  console.log(
    "========================================"
  );

  /* ========================================================
     Extract JSON Object
  ======================================================== */

  const jsonMatch =
    rawContent.match(
      /\{[\s\S]*\}/
    );

  if (!jsonMatch) {
    throw new Error(
      "AI did not return valid JSON."
    );
  }

  try {
    return JSON.parse(
      jsonMatch[0]
    );
  } catch (error) {
    console.error(
      "Resume Analysis JSON Parse Error:",
      error
    );

    console.error(
      "Resume Analysis Raw Response:",
      rawContent
    );

    throw new Error(
      "Unable to parse Resume Analysis JSON."
    );
  }
}
