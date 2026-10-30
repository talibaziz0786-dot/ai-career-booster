import Subscription from "../../models/subscription.model.js";

import {
  AI_FEATURE_KEYS,
  AI_PLAN_LIMITS,
  type AIUsageFeature,
  type SubscriptionPlan,
} from "../../constants/ai-usage.constants.js";

/* =========================================================
   Types
========================================================= */

export interface AIQuotaState {
  feature: AIUsageFeature;

  used: number;

  limit: number;

  remaining: number;

  resetAt: Date;
}

export interface AIQuotaError extends Error {
  code: "AI_QUOTA_EXCEEDED";

  feature: AIUsageFeature;

  limit: number;

  used: number;

  resetAt: Date;
}

/* =========================================================
   Constants
========================================================= */

/**
 * Legacy plan value that may exist in older database
 * documents created by the previous admin implementation.
 *
 * IMPORTANT:
 *
 * Do NOT add "pro" to the Subscription schema enum.
 *
 * We normalize old documents to the canonical
 * "pro-monthly" plan before saving.
 */
const LEGACY_PRO_PLAN = "pro";

const CANONICAL_PRO_PLAN: SubscriptionPlan =
  "pro-monthly";

/* =========================================================
   Date Helpers
========================================================= */

/**
 * Calculate the next daily reset time.
 *
 * Uses the server's local calendar day.
 */
function getResetAt(): Date {
  const reset = new Date();

  reset.setHours(
    24,
    0,
    0,
    0
  );

  return reset;
}

/**
 * Check whether two dates belong to
 * the same calendar day.
 */
function isSameDay(
  first: Date,
  second: Date
): boolean {
  return (
    first.getFullYear() ===
      second.getFullYear() &&
    first.getMonth() ===
      second.getMonth() &&
    first.getDate() ===
      second.getDate()
  );
}

/* =========================================================
   Subscription
========================================================= */

/**
 * Load the user's subscription.
 */
async function getSubscription(
  userId: string
) {
  if (!userId?.trim()) {
    throw new Error(
      "Authenticated userId is required for AI quota checks."
    );
  }

  const subscription =
    await Subscription.findOne({
      user: userId,
    });

  if (!subscription) {
    throw new Error(
      "Subscription not found."
    );
  }

  return subscription;
}

/* =========================================================
   Plan Normalization
========================================================= */

/**
 * Normalize subscription plan values.
 *
 * Canonical plans:
 *
 * - free
 * - trial
 * - pro-monthly
 * - pro-yearly
 *
 * Legacy:
 *
 * - pro
 *
 * The legacy "pro" value is mapped to "pro-monthly"
 * so old documents do not break quota operations.
 *
 * Unknown values fall back to free.
 */
function normalizePlan(
  value: unknown
): SubscriptionPlan {
  switch (value) {
    case "free":
      return "free";

    case "trial":
      return "trial";

    case "pro-monthly":
      return "pro-monthly";

    case "pro-yearly":
      return "pro-yearly";

    /**
     * Backward compatibility for old admin code.
     */
    case LEGACY_PRO_PLAN:
      return CANONICAL_PRO_PLAN;

    default:
      return "free";
  }
}

/**
 * Normalize a subscription document before a save.
 *
 * This is important because old database records may contain
 * plan: "pro", which is no longer allowed by the Mongoose enum.
 */
function normalizeSubscriptionPlan(
  subscription: any
): SubscriptionPlan {
  const normalizedPlan =
    normalizePlan(
      subscription.plan
    );

  if (
    subscription.plan !==
    normalizedPlan
  ) {
    subscription.plan =
      normalizedPlan;
  }

  return normalizedPlan;
}

/* =========================================================
   Daily Usage Reset
========================================================= */

/**
 * Reset daily AI usage when the calendar day changes.
 *
 * Older subscription documents are handled safely.
 *
 * IMPORTANT:
 *
 * Legacy plan values are normalized BEFORE save().
 * This prevents Mongoose enum validation failures.
 */
async function resetUsageIfRequired(
  subscription: any
): Promise<void> {
  const now = new Date();

  /**
   * Normalize legacy subscription plan BEFORE
   * any possible save operation.
   */
  normalizeSubscriptionPlan(
    subscription
  );

  const lastResetValue =
    subscription.usage?.lastReset;

  const lastReset =
    lastResetValue
      ? new Date(lastResetValue)
      : undefined;

  const shouldReset =
    !lastReset ||
    !isSameDay(
      now,
      lastReset
    );

  if (!shouldReset) {
    /**
     * If the plan itself was legacy and was normalized,
     * persist that migration even when usage does not need
     * a daily reset.
     */
    if (
      subscription.isModified?.(
        "plan"
      )
    ) {
      await subscription.save();
    }

    return;
  }

  if (!subscription.usage) {
    subscription.usage = {};
  }

  subscription.usage.resumeToday = 0;

  subscription.usage.atsToday = 0;

  subscription.usage.interviewToday = 0;

  subscription.usage.coverLetterToday = 0;

  subscription.usage.linkedinToday = 0;

  subscription.usage.careerToday = 0;

  subscription.usage.recruiterToday = 0;

  subscription.usage.generalToday = 0;

  subscription.usage.totalToday = 0;

  subscription.usage.lastReset =
    now;

  await subscription.save();
}

/* =========================================================
   Usage Helpers
========================================================= */

/**
 * Read current usage for a logical AI feature.
 */
function getUsageValue(
  subscription: any,
  feature: AIUsageFeature
): number {
  const usageKey =
    AI_FEATURE_KEYS[feature];

  const value =
    subscription.usage?.[
      usageKey
    ];

  if (
    typeof value !== "number" ||
    !Number.isFinite(value) ||
    value < 0
  ) {
    return 0;
  }

  return Math.floor(value);
}

/**
 * Set usage for a logical AI feature.
 */
function setUsageValue(
  subscription: any,
  feature: AIUsageFeature,
  value: number
): void {
  const usageKey =
    AI_FEATURE_KEYS[feature];

  if (!subscription.usage) {
    subscription.usage = {};
  }

  subscription.usage[usageKey] =
    Math.max(
      0,
      Math.floor(value)
    );
}

/* =========================================================
   Quota Error
========================================================= */

/**
 * Build a standardized quota error.
 */
function createQuotaExceededError(
  feature: AIUsageFeature,
  limit: number,
  used: number
): AIQuotaError {
  const error =
    new Error(
      "Daily AI usage limit reached."
    ) as AIQuotaError;

  error.code =
    "AI_QUOTA_EXCEEDED";

  error.feature =
    feature;

  error.limit =
    limit;

  error.used =
    used;

  error.resetAt =
    getResetAt();

  return error;
}

/* =========================================================
   Plan Limit
========================================================= */

/**
 * Get the canonical plan and its daily AI limit.
 */
function getPlanAndLimit(
  subscription: any
): {
  plan: SubscriptionPlan;
  limit: number;
} {
  const plan =
    normalizeSubscriptionPlan(
      subscription
    );

  const limit =
    AI_PLAN_LIMITS[
      plan
    ].daily;

  return {
    plan,
    limit,
  };
}

/* =========================================================
   Assert Quota
========================================================= */

/**
 * Check whether the user can consume
 * one AI request.
 *
 * IMPORTANT:
 *
 * This function does NOT increment usage.
 */
export async function assertAIQuota(
  userId: string,
  feature: AIUsageFeature
): Promise<AIQuotaState> {
  const subscription =
    await getSubscription(
      userId
    );

  await resetUsageIfRequired(
    subscription
  );

  const {
    limit,
  } =
    getPlanAndLimit(
      subscription
    );

  const used =
    getUsageValue(
      subscription,
      feature
    );

  const remaining =
    Math.max(
      limit - used,
      0
    );

  if (
    used >= limit
  ) {
    throw createQuotaExceededError(
      feature,
      limit,
      used
    );
  }

  return {
    feature,

    used,

    limit,

    remaining,

    resetAt:
      getResetAt(),
  };
}

/* =========================================================
   Commit Usage
========================================================= */

/**
 * Commit one successful AI usage.
 *
 * Usage is incremented ONLY after the AI operation
 * successfully resolves.
 */
export async function commitAIUsage(
  userId: string,
  feature: AIUsageFeature
): Promise<AIQuotaState> {
  const subscription =
    await getSubscription(
      userId
    );

  await resetUsageIfRequired(
    subscription
  );

  const {
    limit,
  } =
    getPlanAndLimit(
      subscription
    );

  const current =
    getUsageValue(
      subscription,
      feature
    );

  /**
   * Re-check quota immediately before
   * incrementing.
   */
  if (
    current >= limit
  ) {
    throw createQuotaExceededError(
      feature,
      limit,
      current
    );
  }

  const nextValue =
    current + 1;

  setUsageValue(
    subscription,
    feature,
    nextValue
  );

  /**
   * Keep totalToday synchronized.
   */
  const currentTotal =
    typeof subscription
      .usage
      ?.totalToday ===
    "number"
      ? Math.max(
          0,
          Math.floor(
            subscription
              .usage
              .totalToday
          )
        )
      : 0;

  subscription.usage.totalToday =
    currentTotal + 1;

  /**
   * Ensure any legacy "pro" plan is
   * normalized before save().
   */
  normalizeSubscriptionPlan(
    subscription
  );

  await subscription.save();

  return {
    feature,

    used:
      nextValue,

    limit,

    remaining:
      Math.max(
        limit -
          nextValue,
        0
      ),

    resetAt:
      getResetAt(),
  };
}

/* =========================================================
   Consume Quota
========================================================= */

/**
 * Convenience helper:
 *
 * Check quota
 *      ↓
 * Execute AI operation
 *      ↓
 * Commit successful usage
 *
 * Failed AI operations do not consume quota.
 */
export async function consumeAIQuota<T>(
  userId: string,
  feature: AIUsageFeature,
  operation: () => Promise<T>
): Promise<{
  result: T;
  usage: AIQuotaState;
}> {
  await assertAIQuota(
    userId,
    feature
  );

  const result =
    await operation();

  const usage =
    await commitAIUsage(
      userId,
      feature
    );

  return {
    result,
    usage,
  };
}