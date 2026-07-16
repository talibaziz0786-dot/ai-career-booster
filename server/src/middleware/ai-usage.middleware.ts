import type { Request, Response, NextFunction } from "express";
import Subscription from "../models/subscription.model.js";

type Feature =
  | "resume"
  | "ats"
  | "interview"
  | "coverLetter";

const FREE_LIMITS = {
  resume: 2,
  ats: 2,
  interview: 15,
  coverLetter: 1,
};

export const checkAIUsage =
  (feature: Feature) =>
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = (req as any).user;

      const subscription =
        await Subscription.findOne({
          user: user.id,
        });

      if (!subscription) {
        return res.status(404).json({
          success: false,
          message: "Subscription not found",
        });
      }

      // --------------------------
      // Reset Daily Usage
      // --------------------------

      const now = new Date();

      const last =
        new Date(subscription.usage.lastReset);

      if (
        now.getDate() !== last.getDate() ||
        now.getMonth() !== last.getMonth() ||
        now.getFullYear() !==
          last.getFullYear()
      ) {
        subscription.usage.resumeToday = 0;
        subscription.usage.atsToday = 0;
        subscription.usage.interviewToday = 0;
        subscription.usage.coverLetterToday = 0;

        subscription.usage.lastReset =
          now;

        await subscription.save();
      }

      // --------------------------
      // Trial + Pro Unlimited
      // --------------------------

      if (
        subscription.plan === "trial" ||
        subscription.plan ===
          "pro-monthly" ||
        subscription.plan ===
          "pro-yearly"
      ) {
        return next();
      }

      // --------------------------
      // Free Plan Limit Check
      // --------------------------

      switch (feature) {
        case "resume":
          if (
            subscription.usage.resumeToday >=
            FREE_LIMITS.resume
          ) {
            return limitReached(
              res,
              feature
            );
          }

          subscription.usage.resumeToday++;

          break;

        case "ats":
          if (
            subscription.usage.atsToday >=
            FREE_LIMITS.ats
          ) {
            return limitReached(
              res,
              feature
            );
          }

          subscription.usage.atsToday++;

          break;

        case "interview":
          if (
            subscription.usage
              .interviewToday >=
            FREE_LIMITS.interview
          ) {
            return limitReached(
              res,
              feature
            );
          }

          subscription.usage
            .interviewToday++;

          break;

        case "coverLetter":
          if (
            subscription.usage
              .coverLetterToday >=
            FREE_LIMITS.coverLetter
          ) {
            return limitReached(
              res,
              feature
            );
          }

          subscription.usage
            .coverLetterToday++;

          break;
      }

      await subscription.save();

      next();
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "AI Usage Middleware Error",
      });
    }
  };

function limitReached(
  res: Response,
  feature: string
) {
  return res.status(403).json({
    success: false,

    upgradeRequired: true,

    feature,

    message:
      "Daily AI limit reached. Upgrade to Pro.",
  });
}