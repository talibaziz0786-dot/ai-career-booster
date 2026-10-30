import { askAI } from "../../lib/ai/ai-orchestrator.js";

import { recruiterSimulationPrompt } from "../../prompts/recruiter.prompt.js";

export interface RecruiterSimulationInput {
resumeAnalysis: unknown;
interviewAnalysis: unknown;
careerProfile: unknown;
}

function extractJsonObject(
content: string
): string {
const trimmed = content.trim();

if (
trimmed.startsWith("{") &&
trimmed.endsWith("}")
) {
return trimmed;
}

const start = trimmed.indexOf("{");
const end = trimmed.lastIndexOf("}");

if (
start === -1 ||
end === -1 ||
end <= start
) {
throw new Error(
"Recruiter AI returned invalid JSON."
);
}

return trimmed.slice(
start,
end + 1
);
}

export async function runRecruiterSimulation(
userId: string,
data: RecruiterSimulationInput
) {
const prompt =
recruiterSimulationPrompt(
JSON.stringify(
data,
null,
2
)
);

const result = await askAI({
userId,
prompt,
});

const raw =
result.content?.trim() || "";

if (!raw) {
throw new Error(
"Recruiter AI returned an empty response."
);
}

try {
const json =
extractJsonObject(raw);

return JSON.parse(json);

} catch (error) {
console.error(
"Recruiter Simulation Parse Error:",
error
);

console.error(
  "Recruiter AI Raw Response:",
  raw
);

throw new Error(
  "Recruiter AI JSON parsing failed."
);


}
}

