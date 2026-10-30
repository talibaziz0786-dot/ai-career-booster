import type {
  InterviewHistoryItem,
} from "../history/interview-history.types.js";

import type {
  CompetencyScore,
} from "./feedback-types.js";

export class CompetencyScorer {
  static score(
    history: InterviewHistoryItem[]
  ): CompetencyScore[] {
    return history.map((item) => ({
      competencyId:
        item.competencyId ?? "default-competency",

      competencyName:
        item.competencyName ?? item.skill,

      skill:
        item.skill,

      score:
        item.score ?? 0,

      strengths:
        item.strengths ?? [],

      weaknesses:
        item.weaknesses ?? [],
    }));
  }
}