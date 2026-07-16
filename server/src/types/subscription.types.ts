export type SubscriptionPlan =
  | "free"
  | "trial"
  | "pro-monthly"
  | "pro-yearly";

export type SubscriptionStatus =
  | "active"
  | "expired"
  | "cancelled";

export interface UsageLimits {
  resumeToday: number;
  atsToday: number;
  interviewToday: number;
  coverLetterToday: number;
  lastReset: Date;
}

export interface SubscriptionData {
  plan: SubscriptionPlan;

  status: SubscriptionStatus;

  trialStart?: Date;

  trialEnd?: Date;

  expiresAt?: Date;
}