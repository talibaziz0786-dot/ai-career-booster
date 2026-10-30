import { api } from "../lib/axios";

export interface SubscriptionData {
  plan:
    | "free"
    | "trial"
    | "pro-monthly"
    | "pro-yearly";

  status:
    | "active"
    | "expired"
    | "cancelled";

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
    await api.get<SubscriptionResponse>(
      "/api/subscription/me"
    );

  return data;
}

export async function startTrial() {
  const { data } =
    await api.post(
      "/api/subscription/trial"
    );

  return data;
}

export async function upgradeToMonthly() {
  const { data } =
    await api.put(
      "/api/subscription/upgrade",
      {
        plan: "pro-monthly",
      }
    );

  return data;
}

export async function upgradeToYearly() {
  const { data } =
    await api.put(
      "/api/subscription/upgrade",
      {
        plan: "pro-yearly",
      }
    );

  return data;
}

export async function cancelSubscription() {
  const { data } =
    await api.put(
      "/api/subscription/cancel"
    );

  return data;
}

export async function resetDailyUsage() {
  const { data } =
    await api.put(
      "/api/subscription/reset-usage"
    );

  return data;
}