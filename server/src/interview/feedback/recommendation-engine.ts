import type {
  FeedbackAnalysis,
} from "./feedback-types.js";

export interface RecommendationItem {
  title: string;

  description: string;

  priority: "high" | "medium" | "low";

  category:
    | "technical"
    | "communication"
    | "confidence"
    | "career";
}

export class RecommendationEngine {

  static generate(
    analysis: FeedbackAnalysis
  ): RecommendationItem[] {

    const recommendations: RecommendationItem[] = [];

    // ==========================
    // Technical
    // ==========================

    if (
      analysis.overallScore < 70
    ) {

      recommendations.push({

        title:
          "Strengthen Technical Fundamentals",

        description:
          "Spend time revising core concepts and solve more practical coding problems.",

        priority: "high",

        category: "technical",

      });

    }

    // ==========================
    // Communication
    // ==========================

    if (
      analysis.communication.score <
      75
    ) {

      recommendations.push({

        title:
          "Improve Communication",

        description:
          "Practice explaining your solutions clearly and professionally during interviews.",

        priority: "medium",

        category: "communication",

      });

    }

    // ==========================
    // Confidence
    // ==========================

    if (
      analysis.confidence.score <
      75
    ) {

      recommendations.push({

        title:
          "Increase Interview Confidence",

        description:
          "Practice mock interviews and answer questions without hesitation.",

        priority: "medium",

        category: "confidence",

      });

    }

    // ==========================
    // Weak Competencies
    // ==========================

    analysis.competencyScores.forEach(
      (
        competency
      ) => {

        if (
          competency.score < 70
        ) {

          recommendations.push({

            title:
              `Improve ${competency.competencyName}`,

            description:
              `Focus on strengthening your ${competency.skill} knowledge through projects and consistent practice.`,

            priority: "high",

            category: "technical",

          });

        }

      }
    );

    // ==========================
    // Career Recommendation
    // ==========================

    if (
      analysis.overallScore >= 85
    ) {

      recommendations.push({

        title:
          "Apply for Product-Based Companies",

        description:
          "Your interview performance indicates readiness for high-quality product engineering roles.",

        priority: "low",

        category: "career",

      });

    }

    return recommendations;

  }

}