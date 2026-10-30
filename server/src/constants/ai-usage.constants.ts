/**
 * Centralized AI usage/quota definitions.
 *
 * IMPORTANT:
 * - Feature names are stable API-level identifiers.
 * - These identifiers are shared by:
 *   - AI orchestrator
 *   - AI quota service
 *   - Subscription usage model
 * - Do not duplicate these definitions elsewhere.
 */

export const AI_USAGE_FEATURES = [
  "resume",
  "ats",
  "interview",
  "coverLetter",
  "linkedin",
  "career",
  "recruiter",
  "general",
] as const;

export type AIUsageFeature =
  (typeof AI_USAGE_FEATURES)[number];

export const SUBSCRIPTION_PLANS = [
  "free",
  "trial",
  "pro-monthly",
  "pro-yearly",
] as const;

export type SubscriptionPlan =
  (typeof SUBSCRIPTION_PLANS)[number];

export interface AIPlanLimit {
  readonly daily: number;
}

/**
 * Centralized daily AI limits.
 *
 * V1 limits:
 *
 * free        -> 10 AI requests/day
 * trial       -> 25 AI requests/day
 * pro-monthly -> 100 AI requests/day
 * pro-yearly  -> 150 AI requests/day
 *
 * These values can later be moved to an admin/database
 * configuration layer without changing the orchestrator API.
 */
export const AI_PLAN_LIMITS = {
  free: {
    daily: 10,
  },

  trial: {
    daily: 25,
  },

  "pro-monthly": {
    daily: 100,
  },

  "pro-yearly": {
    daily: 150,
  },
} as const satisfies Record<
  SubscriptionPlan,
  AIPlanLimit
>;

/**
 * Maps logical AI features to the corresponding
 * Subscription.usage field.
 *
 * Example:
 *
 * "resume" -> subscription.usage.resumeToday
 */
export const AI_FEATURE_KEYS = {
  resume: "resumeToday",
  ats: "atsToday",
  interview: "interviewToday",
  coverLetter: "coverLetterToday",
  linkedin: "linkedinToday",
  career: "careerToday",
  recruiter: "recruiterToday",
  general: "generalToday",
} as const satisfies Record<
  AIUsageFeature,
  string
>;

export type AIUsageField =
  (typeof AI_FEATURE_KEYS)[AIUsageFeature];