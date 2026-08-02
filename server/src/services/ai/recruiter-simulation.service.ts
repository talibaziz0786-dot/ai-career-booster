import { askAI } from "./ai-manager.service.js";
import { recruiterSimulationPrompt } from "../../prompts/recruiter.prompt.js";

export interface RecruiterSimulationInput {
  resumeAnalysis: unknown;
  interviewAnalysis: unknown;
  careerProfile: unknown;
  userId?: string;
}

export async function runRecruiterSimulation(
  data: RecruiterSimulationInput
) {
  const { userId, ...simulationData } = data;

  const prompt = recruiterSimulationPrompt(
    JSON.stringify(simulationData, null, 2)
  );

  const result = await askAI({
    userId,
    prompt,
  });

  const raw =
    result.content?.trim() || "";

  const jsonMatch =
    raw.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    throw new Error(
      "Recruiter AI returned invalid JSON."
    );
  }

  try {
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error(
      "Recruiter Simulation Parse Error:",
      raw
    );

    throw new Error(
      "Recruiter AI JSON parsing failed."
    );
  }
}