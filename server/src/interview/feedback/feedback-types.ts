import type {
  InterviewHistoryItem,
} from "../history/interview-history.types.js";

export interface CompetencyScore {
  competencyId: string;

  competencyName: string;

  skill: string;

  score: number;

  strengths: string[];

  weaknesses: string[];
}

export interface CommunicationScore {
  score: number;

  grammar: number;

  clarity: number;

  professionalism: number;

  vocabulary: number;
}

export interface ConfidenceScore {
  score: number;

  confidence: number;

  hesitation: number;

  explanationDepth: number;
}

export interface FeedbackAnalysis {
  competencyScores: CompetencyScore[];

  communication: CommunicationScore;

  confidence: ConfidenceScore;
  technical: TechnicalScore;

  strengths: string[];

  weaknesses: string[];

 recommendations:
  RecommendationItem[];

recruiterVerdict: string;

recruiterSummary?:
  RecruiterSummary;

overallScore: number;
}

export interface FeedbackEngineInput {
  history: InterviewHistoryItem[];
}



export interface TechnicalScore {
  score: number;

  problemSolving: number;

  codeQuality: number;

  accuracy: number;

  conceptUnderstanding: number;
}

export interface RecommendationItem {
  title: string;

  description: string;

  priority:
    | "high"
    | "medium"
    | "low";
}

export interface RecruiterSummary {

  verdict:
    | "Strong Hire"
    | "Hire"
    | "Borderline"
    | "No Hire";

  hireScore: number;

  summary: string;

  positives: string[];

  concerns: string[];

}