import type {
  InterviewType,
  InterviewLanguage,
} from "../types/interview.types.js";

import type {
  InterviewHistoryItem,
} from "./interview-history.types.js";

export interface InterviewSession {
  userId: string;

  profession: string;

  role: string;

  interviewType: InterviewType;

  language: InterviewLanguage;

  history: InterviewHistoryItem[];

  overallScore?: number;

  createdAt: string;
}