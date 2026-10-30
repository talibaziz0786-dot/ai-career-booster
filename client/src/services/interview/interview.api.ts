import {
  api,
} from "../../lib/axios";

import {
  retryRequest,
} from "../../utils/network/retry-request";

import {
  withTimeout,
} from "../../utils/network/request-timeout";

import type {
  InterviewHistoryItem,
} from "../../types/interview/interview.types";

/* =========================================================
   Common API Response
========================================================= */

export interface ApiResponse<T> {
  success: boolean;

  message?: string;

  data: T;
}

/* =========================================================
   Interview Question Response
========================================================= */

export interface InterviewQuestionResponse {
  question: string;

  options?: string[];

  correctAnswer?: string;

  explanation?: string;

  skill: string;

  competencyId: string;

  competencyName: string;

  provider: string;

  model: string;

  retries?: number;
}

/* =========================================================
   Generate Question Request
========================================================= */

export interface GenerateQuestionRequest {
  category: string;

  difficulty:
    | "beginner"
    | "intermediate"
    | "advanced";

  interviewType:
    | "skill"
    | "hr"
    | "mixed";

  language:
    | "english"
    | "hindi"
    | "hinglish"
    | "urdu";

  skills: string[];

  history: InterviewHistoryItem[];
}

/* =========================================================
   Generate Feedback Request
========================================================= */

export interface GenerateFeedbackRequest {
  history: InterviewHistoryItem[];

  language:
    | "english"
    | "hindi"
    | "hinglish"
    | "urdu";

  answers: string[];

  skills: string[];
}

/* =========================================================
   Career Insight Request
========================================================= */

export interface CareerInsightRequest {
  overallScore: number;

  strengths: string[];

  weaknesses: string[];
}

/* =========================================================
   Save Interview Session
========================================================= */

export interface SaveInterviewSessionRequest {
  category: string;

  difficulty:
    | "beginner"
    | "intermediate"
    | "advanced";

  interviewType:
    | "skill"
    | "hr"
    | "mixed";

  language:
    | "english"
    | "hindi"
    | "hinglish"
    | "urdu";

  skills: string[];

  history: InterviewHistoryItem[];

  overallScore: number;

  recruiterVerdict: string;

  strengths: string[];

  weaknesses: string[];

  recommendations: unknown[];
}

/* =========================================================
   Generate Question
========================================================= */

export async function generateInterviewQuestion(
  payload: GenerateQuestionRequest
): Promise<
  ApiResponse<InterviewQuestionResponse>
> {
  const response =
    await retryRequest(() =>
      withTimeout(
        api.post<
          ApiResponse<InterviewQuestionResponse>
        >(
          "/api/interview/question",
          payload
        )
      )
    );

  return response.data;
}

/* =========================================================
   Generate Feedback
========================================================= */

export async function generateInterviewFeedback(
  payload: GenerateFeedbackRequest
) {
  const response =
    await retryRequest(() =>
      withTimeout(
        api.post(
          "/api/interview/feedback",
          payload
        )
      )
    );

  return response.data;
}

/* =========================================================
   Career Insights
========================================================= */

export async function generateCareerInsights(
  payload: CareerInsightRequest
) {
  const response =
    await retryRequest(() =>
      withTimeout(
        api.post(
          "/api/career-insights/generate",
          payload
        )
      )
    );

  return response.data;
}

/* =========================================================
   Save Interview Session
========================================================= */

export async function saveInterviewSession(
  payload: SaveInterviewSessionRequest
) {
  const response =
    await retryRequest(() =>
      withTimeout(
        api.post(
          "/api/interview-session/save",
          payload
        )
      )
    );

  return response.data;
}

/* =========================================================
   Service Object
========================================================= */

export const InterviewAPI = {
  generateInterviewQuestion,

  generateInterviewFeedback,

  generateCareerInsights,

  saveInterviewSession,
};