export interface InterviewHistoryItem {
  id: string;
  question: string;
  skill: string;
  questionType?: string;
  difficulty: string;
  answer?: string;
  userAnswer?: string;
  score?: number;
  feedback?: string;
  strengths?: string[];
  weaknesses?: string[];
  competencyId?: string;
  competencyName?: string;
  provider?: string;
  model?: string;
  createdAt?: string;
}
