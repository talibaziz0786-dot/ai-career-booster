/* =========================================================
   CareerBoost AI
   Adaptive Interview — Canonical Types
========================================================= */

/* =========================================================
   Interview Type
========================================================= */

/**
 * Supported adaptive interview modes.
 *
 * skill:
 * Technical / domain-specific practical interview.
 *
 * hr:
 * Behavioral, leadership and HR interview.
 *
 * mixed:
 * Adaptive combination of technical, behavioral,
 * situational and problem-solving questions.
 *
 
 *
 * IMPORTANT:
 * Keep this as the single source of truth for the
 * backend interview type system.
 */
export type InterviewType =
  | "skill"
  | "hr"
  | "mixed";

/* =========================================================
   Interview Difficulty
========================================================= */

export type InterviewDifficulty =
  | "beginner"
  | "intermediate"
  | "advanced";

/* =========================================================
   Interview Language
========================================================= */

export type InterviewLanguage =
  | "english"
  | "hindi"
  | "hinglish"
  | "urdu";

/* =========================================================
   Interview Question Type
========================================================= */

export type InterviewQuestionType =
  | "skill"
  | "behavioral"
  | "situational"
  | "hr";



/* =========================================================
   Runtime Constants
========================================================= */

export const INTERVIEW_TYPES = [
  "skill",
  "hr",
  "mixed",
] as const;

export const INTERVIEW_DIFFICULTIES = [
  "beginner",
  "intermediate",
  "advanced",
] as const;

export const INTERVIEW_LANGUAGES = [
  "english",
  "hindi",
  "hinglish",
  "urdu",
] as const;

export const INTERVIEW_QUESTION_TYPES = [
  "skill",
  "behavioral",
  "situational",
  "hr",
] as const;

/* =========================================================
   Type Guards
========================================================= */

export function isInterviewType(
  value: unknown
): value is InterviewType {
  return (
    typeof value === "string" &&
    INTERVIEW_TYPES.includes(
      value as InterviewType
    )
  );
}

export function isInterviewDifficulty(
  value: unknown
): value is InterviewDifficulty {
  return (
    typeof value === "string" &&
    INTERVIEW_DIFFICULTIES.includes(
      value as InterviewDifficulty
    )
  );
}

export function isInterviewLanguage(
  value: unknown
): value is InterviewLanguage {
  return (
    typeof value === "string" &&
    INTERVIEW_LANGUAGES.includes(
      value as InterviewLanguage
    )
  );
}

export function isInterviewQuestionType(
  value: unknown
): value is InterviewQuestionType {
  return (
    typeof value === "string" &&
    INTERVIEW_QUESTION_TYPES.includes(
      value as InterviewQuestionType
    )
  );
}

/* =========================================================
   Interview Type Helpers
========================================================= */


/**
 * Returns true when the interview is technical.
 */
export function isSkillInterview(
  interviewType: InterviewType
): interviewType is "skill" {
  return (
    interviewType === "skill"
  );
}

/**
 * Returns true when the interview is HR/behavioral.
 */
export function isHRInterview(
  interviewType: InterviewType
): interviewType is "hr" {
  return (
    interviewType === "hr"
  );
}

/**
 * Returns true when the interview is mixed/adaptive.
 */
export function isMixedInterview(
  interviewType: InterviewType
): interviewType is "mixed" {
  return (
    interviewType === "mixed"
  );
}

/* =========================================================
   Generated Interview Question
========================================================= */

export interface GeneratedInterviewQuestion {
  question: string;

  skill: string;

  questionType: InterviewQuestionType;

  difficulty: InterviewDifficulty;

  /**
   * AI-selected competency.
   */
  competencyId?: string;

  competencyName?: string;

  /**
   * Provider metadata.
   *
   * These fields should never contain secrets.
   */
  provider?: string;

  model?: string;

  retries?: number;
}

/* =========================================================
   Interview Request
========================================================= */

export interface GenerateInterviewRequest {
  userId: string;

  profession: string;

  role?: string;

  interviewType: InterviewType;

  skills: string[];

  difficulty: InterviewDifficulty;

  language: InterviewLanguage;
}



/* =========================================================
   Interview Evaluation
========================================================= */

export interface InterviewEvaluation {
  overallScore: number;

  technicalScore: number;

  communicationScore: number;

  confidenceScore: number;

  problemSolvingScore: number;

  domainKnowledgeScore: number;

  professionalismScore: number;

  leadershipScore?: number;

  strengths: string[];

  weaknesses: string[];

  missingConcepts: string[];

  idealAnswer: string;

  recruiterFeedback: string;

  improvements: string[];

  hiringProbability: number;

  overallDecision:
    | "Strong Hire"
    | "Hire"
    | "Borderline"
    | "Reject";

  followUpQuestion: string;

  nextDifficulty:
    | InterviewDifficulty
    | "";

  interviewStatus:
    | "continue"
    | "completed"
    | "terminated";
}

/* =========================================================
   Interview Session Configuration
========================================================= */

export interface InterviewConfiguration {
  profession: string;

  role?: string;

  interviewType: InterviewType;

  skills: string[];

  difficulty: InterviewDifficulty;

  language: InterviewLanguage;

  totalQuestions: number;
}