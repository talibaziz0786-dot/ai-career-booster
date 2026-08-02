import type { Response } from "express";

import Subscription from "../models/subscription.model.js";
import { sendError } from "./http-response.js";

export type UsageFeature =
  | "resume"
  | "ats"
  | "interview"
  | "coverLetter";

/** Daily AI limits applied to the free plan, enforced and reported. */
export const FREE_PLAN_LIMITS: Record<
  UsageFeature,
  number
> = {
  resume: 2,
  ats: 2,
  interview: 15,
  coverLetter: 1,
};

export const USAGE_FIELDS: Record<
  UsageFeature,
  "resumeToday" | "atsToday" | "interviewToday" | "coverLetterToday"
> = {
  resume: "resumeToday",
  ats: "atsToday",
  interview: "interviewToday",
  coverLetter: "coverLetterToday",
};

export type SubscriptionDocument = NonNullable<
  Awaited<ReturnType<typeof Subscription.findOne>>
>;

export function findSubscriptionByUser(
  userId: string
) {
  return Subscription.findOne({
    user: userId,
  });
}

/**
 * Loads the subscription of a user, answering with a 404 when it is missing.
 * Returns `null` once the response has been sent.
 */
export async function getSubscriptionOr404(
  res: Response,
  userId: string
) {
  const subscription =
    await findSubscriptionByUser(userId);

  if (!subscription) {
    sendError(
      res,
      404,
      "Subscription not found"
    );

    return null;
  }

  return subscription;
}

export function clearDailyUsage(
  subscription: SubscriptionDocument,
  resetAt = new Date()
) {
  for (const field of Object.values(
    USAGE_FIELDS
  )) {
    subscription.usage[field] = 0;
  }

  subscription.usage.lastReset = resetAt;
}

export function isSameDay(
  first: Date,
  second: Date
) {
  return (
    first.getDate() === second.getDate() &&
    first.getMonth() === second.getMonth() &&
    first.getFullYear() ===
      second.getFullYear()
  );
}
