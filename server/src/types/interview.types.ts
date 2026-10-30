export type InterviewDifficulty =
  | "easy"
  | "medium"
  | "hard";

export type InterviewQuestionType =
  | "technical"
  | "behavioral"
  | "situational"
  | "hr";

export interface InterviewQuestion {
  id: string;

  question: string;

  type: InterviewQuestionType;

  difficulty: InterviewDifficulty;

  expectedAnswer: string;

  keyPoints: string[];

  followUpQuestion?: string;
}

export interface InterviewAnswerEvaluation {
  score: number;

  rating:
    | "poor"
    | "needs-improvement"
    | "good"
    | "excellent";

  feedback: string;

  strengths: string[];

  weaknesses: string[];

  missingPoints: string[];

  improvedAnswer: string;
}

export interface InterviewSession {
  sessionId: string;

  profession: string;

  skills: string[];

  experienceLevel: string;

  difficulty: InterviewDifficulty;

  totalQuestions: number;

  questions: InterviewQuestion[];

  createdAt: string;
}

export interface InterviewSessionResult {
  sessionId: string;

  totalQuestions: number;

  answeredQuestions: number;

  skippedQuestions: number;

  viewedAnswers: number;

  averageScore: number;

  overallRating:
    | "poor"
    | "needs-improvement"
    | "good"
    | "excellent";

  strengths: string[];

  weaknesses: string[];

  recommendations: string[];

  questionResults: Array<{
    questionId: string;

    question: string;

    userAnswer?: string;

    viewedAnswer: boolean;

    evaluation?: InterviewAnswerEvaluation;
  }>;
}