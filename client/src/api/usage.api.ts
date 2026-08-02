import { createApiClient } from "../lib/api-client";

const usageApi = createApiClient(
  "/api/usage"
);

export interface UsageResponse {
  success: boolean;

  plan:
    | "free"
    | "trial"
    | "pro-monthly"
    | "pro-yearly";

  status:
    | "active"
    | "expired"
    | "cancelled";

  usage: {
    resumeToday: number;
    atsToday: number;
    interviewToday: number;
    coverLetterToday: number;
    lastReset: string;
  };

  limits: {
    resume: number;
    ats: number;
    interview: number;
    coverLetter: number;
  } | null;

  trialEnd?: string;
  expiresAt?: string;
}

export async function getUsage() {
  const { data } =
    await usageApi.get<UsageResponse>("/me");

  return data;
}