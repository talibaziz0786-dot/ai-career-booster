import type { NextFunction, Response } from "express";

import type { AuthRequest } from "./auth.middleware.js";
import { sendError } from "../utils/http-response.js";
import {
  clearDailyUsage,
  FREE_PLAN_LIMITS,
  getSubscriptionOr404,
  isSameDay,
  USAGE_FIELDS,
  type UsageFeature,
} from "../utils/subscription.util.js";

const UNLIMITED_PLANS = [
  "trial",
  "pro-monthly",
  "pro-yearly",
];

export const checkAIUsage =
  (feature: UsageFeature) =>
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const subscription =
        await getSubscriptionOr404(
          res,
          req.user!.id
        );

      if (!subscription) {
        return;
      }

      const now = new Date();

      if (
        !isSameDay(
          now,
          new Date(
            subscription.usage.lastReset
          )
        )
      ) {
        clearDailyUsage(
          subscription,
          now
        );

        await subscription.save();
      }

      if (
        UNLIMITED_PLANS.includes(
          subscription.plan
        )
      ) {
        return next();
      }

      const field = USAGE_FIELDS[feature];

      if (
        subscription.usage[field] >=
        FREE_PLAN_LIMITS[feature]
      ) {
        return limitReached(res, feature);
      }

      subscription.usage[field]++;

      await subscription.save();

      next();
    } catch (error) {
      console.error(error);

      sendError(
        res,
        500,
        "AI Usage Middleware Error"
      );
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
