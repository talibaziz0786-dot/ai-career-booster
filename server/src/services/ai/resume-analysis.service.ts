import { askAI } from "./ai-manager.service.js";
import { buildResumeAnalysisPrompt } from "./prompts/resume-analysis.prompt.js";

export async function analyzeResumeWithAI(
  resumeText: string,
  language: string = "english"
) {
  const prompt = buildResumeAnalysisPrompt(
    resumeText,
    language
  );

  const aiResponse = await askAI(prompt);

  const rawContent =
    aiResponse.content ?? "";

  console.log(
    "========== AI RESUME ANALYSIS =========="
  );

  console.log(rawContent);

  const jsonMatch =
    rawContent.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    throw new Error(
      "AI did not return valid JSON."
    );
  }

  try {
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error(
      "Resume Analysis JSON Parse Error"
    );

    console.error(error);

    console.error(rawContent);

    throw new Error(
      "Unable to parse Resume Analysis JSON."
    );
  }
}