import {
  askAI,
} from "../../lib/ai/ai-orchestrator.js";

import {
  buildInterviewFeedbackPrompt,
} from "../../prompts/interview-feedback.prompt.js";

import {
  parseAIJson,
} from "../../utils/json-parser.js";

import {
  normalizeScore,
} from "../../utils/interview-score-normalizer.js";

export interface InterviewFeedbackInput {
  userId: string;

  questions: string[];

  answers: string[];

  skills: string[];

  language:
    | "english"
    | "hindi"
    | "hinglish"
    | "urdu";
}

function normalizeStringArray(
  value: unknown
): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (item): item is string =>
        typeof item === "string"
    )
    .map((item) =>
      item.trim()
    )
    .filter(Boolean);
}

function normalizeString(
  value: unknown
): string {
  return typeof value === "string"
    ? value.trim()
    : "";
}

function validateFeedbackShape(
  value: unknown
): Record<string, unknown> {
  if (
    !value ||
    typeof value !== "object" ||
    Array.isArray(value)
  ) {
    throw new Error(
      "AI returned an invalid interview feedback structure."
    );
  }

  const feedback =
    value as Record<string, unknown>;

  return feedback;
}

export async function generateInterviewFeedback(
  data: InterviewFeedbackInput
) {
  if (
    !data.userId?.trim()
  ) {
    throw new Error(
      "User ID is required."
    );
  }

  if (
    !Array.isArray(data.questions) ||
    !Array.isArray(data.answers)
  ) {
    throw new Error(
      "Questions and answers must be arrays."
    );
  }

  if (
    data.questions.length === 0 ||
    data.answers.length === 0
  ) {
    throw new Error(
      "Questions and answers are required."
    );
  }

  if (
    data.questions.length !==
    data.answers.length
  ) {
    throw new Error(
      "Questions and answers must have the same length."
    );
  }

  const prompt =
    buildInterviewFeedbackPrompt({
      questions:
        data.questions,

      answers:
        data.answers,

      skills:
        data.skills,

      language:
        data.language,
    });

  const response =
    await askAI({
      userId:
        data.userId,

      prompt,
    });

  const feedback =
    validateFeedbackShape(
      parseAIJson(
        response.content
      )
    );

  feedback.overallScore =
    normalizeScore(
      feedback.overallScore
    );

  feedback.technicalScore =
    normalizeScore(
      feedback.technicalScore
    );

  feedback.communicationScore =
    normalizeScore(
      feedback.communicationScore
    );

  feedback.confidenceScore =
    normalizeScore(
      feedback.confidenceScore
    );

  feedback.problemSolvingScore =
    normalizeScore(
      feedback.problemSolvingScore
    );

  feedback.industryReadinessScore =
    normalizeScore(
      feedback.industryReadinessScore
    );

  feedback.hiringProbability =
    normalizeScore(
      feedback.hiringProbability
    );

  feedback.strengths =
    normalizeStringArray(
      feedback.strengths
    );

  feedback.weaknesses =
    normalizeStringArray(
      feedback.weaknesses
    );

  feedback.improvements =
    normalizeStringArray(
      feedback.improvements
    );

  feedback.learningRoadmap =
    normalizeStringArray(
      feedback.learningRoadmap
    );

  feedback.recruiterVerdict =
    normalizeString(
      feedback.recruiterVerdict
    );

  feedback.verdict =
    normalizeString(
      feedback.verdict
    );

  console.log(
    "Interview feedback generated:",
    {
      provider:
        response.provider,

      model:
        response.model,
    }
  );

  return {
    ...feedback,

    provider:
      response.provider,

    model:
      response.model,
  };
}
