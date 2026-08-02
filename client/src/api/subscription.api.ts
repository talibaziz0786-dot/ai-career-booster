import { createApiClient } from "../lib/api-client";

const subscriptionApi = createApiClient(
  "/api/subscription"
);

export interface SubscriptionData {
  plan: "free" | "trial" | "pro-monthly" | "pro-yearly";

  status: "active" | "expired" | "cancelled";

  trialEnd?: string;

  expiresAt?: string;

  usage: {
    resumeToday: number;

    atsToday: number;

    interviewToday: number;

    coverLetterToday: number;

    lastReset: string;
  };
}

export interface SubscriptionResponse {
  success: boolean;

  subscription: SubscriptionData;
}

export async function getSubscription() {
  const { data } =
    await subscriptionApi.get<SubscriptionResponse>(
      "/me"
    );

  return data;
}

export async function upgradeToMonthly() {
  const { data } =
    await subscriptionApi.post(
      "/upgrade",
      {
        plan: "pro-monthly",
      }
    );

  return data;
}

export async function upgradeToYearly() {
  const { data } =
    await subscriptionApi.post(
      "/upgrade",
      {
        plan: "pro-yearly",
      }
    );

  return data;
}

export async function cancelSubscription() {
  const { data } =
    await subscriptionApi.post(
      "/cancel"
    );

  return data;
}

export async function resetDailyUsage() {
  const { data } =
    await subscriptionApi.post(
      "/reset-usage"
    );

  return data;
}