import type { Request, Response } from "express";
import InterviewSession from "../models/interview-session.model.js";

export const getDashboardStats =
async (
  req: Request,
  res: Response
) => {
  try {

    const interviews =
      await InterviewSession.find();

    const totalInterviews =
      interviews.length;

    const averageScore =
      totalInterviews > 0
        ? Math.round(
            interviews.reduce(
              (acc, item) =>
                acc +
                (item.overallScore || 0),
              0
            ) / totalInterviews
          )
        : 0;

    const strengthsMap:
      Record<string, number> = {};

    const weaknessesMap:
      Record<string, number> = {};

    interviews.forEach(
      (session) => {

        (session.strengths || [])
          .forEach((item: string) => {

            strengthsMap[item] =
              (strengthsMap[item] || 0)
              + 1;

          });

        (session.weaknesses || [])
          .forEach((item: string) => {

            weaknessesMap[item] =
              (weaknessesMap[item] || 0)
              + 1;

          });

      }
    );

    const strongestArea =
      Object.keys(
        strengthsMap
      )[0] || "N/A";

    const weakestArea =
      Object.keys(
        weaknessesMap
      )[0] || "N/A";

    res.json({
      success: true,

      stats: {
        totalInterviews,
        averageScore,
        strongestArea,
        weakestArea,
      },
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
    });

  }
};