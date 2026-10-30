import type {
  InterviewHistoryItem,
} from "../history/interview-history.types.js";

import type {
  TechnicalScore,
} from "./feedback-types.js";


export class TechnicalScorer {

  static score(
    history: InterviewHistoryItem[]
  ): TechnicalScore {

    if (
      history.length === 0
    ) {

      return {

        score: 0,

        problemSolving: 0,

        codeQuality: 0,

        accuracy: 0,

        conceptUnderstanding: 0,

      };

    }

    let totalScore = 0;

for (const item of history) {

  totalScore +=
    item.score ?? 0;

}

const averageScore =
  totalScore /
  history.length;

const problemSolving =
  Math.min(
    averageScore + 3,
    100
  );

const codeQuality =
  Math.min(
    averageScore + 5,
    100
  );

const accuracy =
  Math.min(
    averageScore + 2,
    100
  );

const conceptUnderstanding =
  Math.min(
    averageScore + 4,
    100
  );


  return {

  score: Math.round(
    averageScore
  ),

  problemSolving,

  codeQuality,

  accuracy,

  conceptUnderstanding,

};

  }

}