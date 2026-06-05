export interface InterviewQuestion {
  id: string;
  question: string;
  category: string;
  difficulty:
    | "beginner"
    | "intermediate"
    | "advanced";
}

export interface InterviewFeedback {
  score: number;

  strengths: string[];

  improvements: string[];

  aiResponse: string;
}