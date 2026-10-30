import type {
  FeedbackAnalysis,
} from "./feedback-types.js";

export interface RecruiterVerdict {

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

export class RecruiterVerdictEngine {

  static evaluate(
    analysis: FeedbackAnalysis
  ): RecruiterVerdict {

    const positives: string[] = [];

    const concerns: string[] = [];

    // ==========================
    // Technical
    // ==========================

    if (
      analysis.overallScore >= 80
    ) {

      positives.push(
        "Strong technical performance."
      );

    } else {

      concerns.push(
        "Technical performance requires improvement."
      );

    }

    // ==========================
    // Communication
    // ==========================

    if (
      analysis.communication.score >= 75
    ) {

      positives.push(
        "Professional communication."
      );

    } else {

      concerns.push(
        "Communication skills need improvement."
      );

    }

    // ==========================
    // Confidence
    // ==========================

    if (
      analysis.confidence.score >= 75
    ) {

      positives.push(
        "Confident during interview."
      );

    } else {

      concerns.push(
        "Candidate showed hesitation."
      );

    }

    // ==========================
    // Competencies
    // ==========================

    const weakCompetencies =
      analysis.competencyScores.filter(
        (
          competency
        ) =>
          competency.score < 70
      );

    if (
      weakCompetencies.length > 0
    ) {

      concerns.push(
        `${weakCompetencies.length} competency areas require improvement.`
      );

    }

    // ==========================
    // Final Verdict
    // ==========================

    let verdict:
      RecruiterVerdict["verdict"];

    let summary: string;

    if (
      analysis.overallScore >= 90
    ) {

      verdict = "Strong Hire";

      summary =
        "Outstanding interview performance with excellent technical knowledge and communication.";

    } else if (
      analysis.overallScore >= 80
    ) {

      verdict = "Hire";

      summary =
        "Good interview performance. Candidate is suitable for hiring.";

    } else if (
      analysis.overallScore >= 65
    ) {

      verdict =
        "Borderline";

      summary =
        "Candidate shows potential but requires improvement before hiring.";

    } else {

      verdict =
        "No Hire";

      summary =
        "Interview performance does not currently meet hiring expectations.";

    }

    return {

      verdict,

      hireScore:
        analysis.overallScore,

      summary,

      positives,

      concerns,

    };

  }

}