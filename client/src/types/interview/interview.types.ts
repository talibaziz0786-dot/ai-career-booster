export type InterviewType =
  | "skill"
  | "hr"
  | "mixed";

export type Difficulty =
  | "beginner"
  | "intermediate"
  | "advanced";

export type InterviewLanguage =
  | "english"
  | "hindi"
  | "hinglish"
  | "urdu";

/* =========================================================
   Interview History
========================================================= */

export interface InterviewHistoryItem {
  question: string;

  answer?: string;

  skill: string;

  competencyId: string;

  competencyName: string;

  difficulty: Difficulty;

  score?: number;

  feedback?: string;

  strengths?: string[];

  weaknesses?: string[];

  provider?: string;

  model?: string;

  createdAt: string;
}

/* =========================================================
   Interview Result
========================================================= */

export interface InterviewResult {
  overallScore: number;

  technicalScore: number;

  communicationScore: number;

  confidenceScore: number;

  strengths: string[];

  weaknesses: string[];

  improvements: string[];

  recruiterVerdict: string;
}

/* =========================================================
   Career Insights
========================================================= */

export interface CareerInsights {
  focusAreas: string[];

  recommendedProjects: string[];

  careerAdvice: string;

  targetField?: string;

  recommendedSubjects?: string[];

  highPayingCareerPaths?: string[];

  growthRoadmap?: string;
}