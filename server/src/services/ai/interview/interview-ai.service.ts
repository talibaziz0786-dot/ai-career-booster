import { randomUUID } from "node:crypto";

import { askAI } from "../../../lib/ai/ai-orchestrator.js";

import {
  INTERVIEW_GENERATION_PROMPT,
} from "../../../prompts/interview.prompt.js";

import type {
  InterviewDifficulty,
  InterviewQuestion,
  InterviewSession,
} from "../../../types/interview.types.js";

function parseJsonResponse(
  content: string
): unknown {
  const trimmed =
    content.trim();

  if (!trimmed) {
    throw new Error(
      "Interview AI returned an empty response."
    );
  }

  const fencedMatch =
    trimmed.match(
      /```(?:json)?\s*([\s\S]*?)\s*```/i
    );

  const jsonText =
    fencedMatch?.[1] ??
    trimmed;

  try {
    return JSON.parse(jsonText);
  } catch {
    const objectMatch =
      jsonText.match(
        /\{[\s\S]*\}/
      );

    if (!objectMatch) {
      throw new Error(
        "Interview AI returned invalid JSON."
      );
    }

    try {
      return JSON.parse(
        objectMatch[0]
      );
    } catch {
      throw new Error(
        "Interview AI JSON parsing failed."
      );
    }
  }
}

function isValidQuestion(
  value: unknown
): value is InterviewQuestion {
  if (
    !value ||
    typeof value !== "object"
  ) {
    return false;
  }

  const question =
    value as Record<string, unknown>;

  return (
    typeof question.id === "string" &&
    typeof question.question ===
      "string" &&
    typeof question.type ===
      "string" &&
    typeof question.difficulty ===
      "string" &&
    typeof question.expectedAnswer ===
      "string" &&
    Array.isArray(
      question.keyPoints
    )
  );
}

function validateInterview(
  value: unknown,
  difficulty: InterviewDifficulty
): InterviewSession {
  if (
    !value ||
    typeof value !== "object"
  ) {
    throw new Error(
      "Invalid interview response."
    );
  }

  const data =
    value as Record<string, unknown>;

  if (
    typeof data.profession !==
      "string" ||
    !Array.isArray(data.skills) ||
    typeof data.experienceLevel !==
      "string" ||
    !Array.isArray(data.questions)
  ) {
    throw new Error(
      "Interview response structure is invalid."
    );
  }

  const questions =
    data.questions.filter(
      isValidQuestion
    );

  if (questions.length === 0) {
    throw new Error(
      "Interview AI returned no valid questions."
    );
  }

  return {
    sessionId:
      randomUUID(),

    profession:
      data.profession,

    skills:
      data.skills.filter(
        (item): item is string =>
          typeof item === "string"
      ),

    experienceLevel:
      data.experienceLevel,

    difficulty,

    totalQuestions:
      questions.length,

    questions,

    createdAt:
      new Date().toISOString(),
  };
}

export async function generateInterview(
  userId: string,
  profession: string,
  skills: string[],
  experienceLevel: string,
  difficulty: InterviewDifficulty = "medium",
  questionCount = 10
): Promise<InterviewSession> {
  if (!userId?.trim()) {
    throw new Error(
      "User ID is required."
    );
  }

  if (!profession?.trim()) {
    throw new Error(
      "Profession is required."
    );
  }

  if (!Array.isArray(skills)) {
    throw new Error(
      "Skills must be an array."
    );
  }

  if (!experienceLevel?.trim()) {
    throw new Error(
      "Experience level is required."
    );
  }

  const safeQuestionCount =
    Math.min(
      Math.max(
        Math.floor(questionCount),
        3
      ),
      20
    );

  const prompt = `
${INTERVIEW_GENERATION_PROMPT}

Candidate Profession:
${profession}

Candidate Skills:
${skills.join(", ")}

Experience Level:
${experienceLevel}

Interview Difficulty:
${difficulty}

Number of Questions:
${safeQuestionCount}
`;

  const response =
    await askAI({
      userId,
      prompt,
    });

  const parsed =
    parseJsonResponse(
      response.content ?? ""
    );

  return validateInterview(
    parsed,
    difficulty
  );
}
