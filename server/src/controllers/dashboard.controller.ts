import type { Request } from "express";

import InterviewSession from "../models/interview-session.model.js";
import {
  asyncHandler,
  sendSuccess,
} from "../utils/http-response.js";

function countOccurrences(values: string[]) {
  return values.reduce<Record<string, number>>(
    (counts, value) => {
      counts[value] = (counts[value] || 0) + 1;

      return counts;
    },
    {}
  );
}

export const getDashboardStats = asyncHandler<Request>(
  async (_req, res) => {
    const interviews =
      await InterviewSession.find();

    const totalInterviews = interviews.length;

    const averageScore =
      totalInterviews > 0
        ? Math.round(
            interviews.reduce(
              (acc, item) =>
                acc + (item.overallScore || 0),
              0
            ) / totalInterviews
          )
        : 0;

    const strengthsMap = countOccurrences(
      interviews.flatMap(
        (session) => session.strengths || []
      )
    );

    const weaknessesMap = countOccurrences(
      interviews.flatMap(
        (session) => session.weaknesses || []
      )
    );

    return sendSuccess(res, {
      stats: {
        totalInterviews,

        averageScore,

        strongestArea:
          Object.keys(strengthsMap)[0] || "N/A",

        weakestArea:
          Object.keys(weaknessesMap)[0] ||
          "N/A",
      },
    });
  }
);
