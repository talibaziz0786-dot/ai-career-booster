import type {
  InterviewHistoryItem,
} from "../history/interview-history.types.js";

import type {
  CommunicationScore,
} from "./feedback-types.js";

export class CommunicationScorer {
  static score(
    history: InterviewHistoryItem[]
  ): CommunicationScore {
    if (history.length === 0) {
      return {
        score: 0,
        grammar: 0,
        clarity: 0,
        professionalism: 0,
        vocabulary: 0,
      };
    }

    let total = 0;

    for (const item of history) {
      total += item.score ?? 0;
    }

    const average =
      total / history.length;

    return {
      score: average,

      grammar:
        Math.min(
          average + 5,
          100
        ),

      clarity:
        Math.min(
          average + 2,
          100
        ),

      professionalism:
        average,

      vocabulary:
        Math.min(
          average + 4,
          100
        ),
    };
  }
}