import type {
  InterviewHistoryItem,
} from "../history/interview-history.types.js";

import type {
  ConfidenceScore,
} from "./feedback-types.js";

export class ConfidenceScorer {

  static score(
    history: InterviewHistoryItem[]
  ): ConfidenceScore {

    if (
      history.length === 0
    ) {

      return {

        score: 0,

        confidence: 0,

        hesitation: 0,

        explanationDepth: 0,

      };

    }

    let confidenceTotal = 0;

    let hesitationTotal = 0;

    let explanationDepthTotal = 0;

    for (const item of history) {

      const answer =
        item.answer ?? "";

      const wordCount =
        answer
          .trim()
          .split(/\s+/)
          .filter(Boolean)
          .length;

      // Explanation Depth
      if (wordCount >= 80) {

        explanationDepthTotal += 95;

      } else if (wordCount >= 50) {

        explanationDepthTotal += 80;

      } else if (wordCount >= 25) {

        explanationDepthTotal += 65;

      } else {

        explanationDepthTotal += 45;

      }

      // Hesitation Detection
      const hesitationWords = [

        "maybe",

        "perhaps",

        "i think",

        "not sure",

        "probably",

        "umm",

        "uh",

        "guess",

      ];

      let hesitationScore = 100;

      const lowerAnswer =
        answer.toLowerCase();

      for (const word of hesitationWords) {

        if (
          lowerAnswer.includes(word)
        ) {

          hesitationScore -= 10;

        }

      }

      hesitationScore =
        Math.max(
          hesitationScore,
          20
        );

      hesitationTotal +=
        hesitationScore;

      // Confidence Score
      confidenceTotal +=
        (
          hesitationScore +
          (
            wordCount >= 40
              ? 90
              : 65
          )
        ) / 2;

    }

    const confidence =
      Math.round(
        confidenceTotal /
          history.length
      );

    const hesitation =
      Math.round(
        hesitationTotal /
          history.length
      );

    const explanationDepth =
      Math.round(
        explanationDepthTotal /
          history.length
      );

    return {

      score: Math.round(
        (
          confidence +
          explanationDepth
        ) / 2
      ),

      confidence,

      hesitation,

      explanationDepth,

    };

  }

}