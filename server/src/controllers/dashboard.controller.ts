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

    // const strongestArea =
    //   Object.keys(
    //     strengthsMap
    //   )[0] || "N/A";

      const strongestArea =
Object.entries(strengthsMap)
  .sort((a, b) => b[1] - a[1])[0]?.[0] ?? "N/A";

    // const weakestArea =
    //   Object.keys(
    //     weaknessesMap
    //   )[0] || "N/A";

      const weakestArea =
Object.entries(weaknessesMap)
  .sort((a, b) => b[1] - a[1])[0]?.[0] ?? "N/A";


      const hiringProbability =
  Math.min(
    100,
    Math.round(
      averageScore * 0.9
    )
  );

const recruiterReadiness =
  Math.min(
    100,
    Math.round(
      averageScore * 0.95
    )
  );

const profileCompletion =
  Math.min(
    100,
    Math.round(
      (
        totalInterviews / 10
      ) * 100
    )
  );

const atsAverage =
  Math.min(
    100,
    Math.round(
      averageScore * 0.92
    )
  );

    res.json({
  success: true,

  stats: {
    totalInterviews,

    averageScore,

    strongestArea,

    weakestArea,

    atsAverage,

    hiringProbability,

    recruiterReadiness,

    profileCompletion,
  },
});

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
    });

  }
};


// NEW FUNCTION ADD

export const getResumeAnalytics = async (
  req: Request,
  res: Response
) => {
  try {
    const interviews =
      await InterviewSession.find().sort({
        createdAt: 1,
      });

    const monthlyMap = new Map<
      string,
      number[]
    >();

    interviews.forEach((item) => {
      const month =
        new Date(item.createdAt).toLocaleString(
          "en-US",
          {
            month: "short",
          }
        );

      if (!monthlyMap.has(month)) {
        monthlyMap.set(month, []);
      }

      monthlyMap
        .get(month)!
        .push(item.overallScore || 0);
    });

    const analytics = Array.from(
      monthlyMap.entries()
    ).map(([month, scores]) => ({
      month,
      score:
        Math.round(
          scores.reduce(
            (a, b) => a + b,
            0
          ) / scores.length
        ),
    }));

    res.json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
    });
  }
};