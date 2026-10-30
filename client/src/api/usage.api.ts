import { api } from "../lib/axios";

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
    await api.get<UsageResponse>(
      "/api/usage/me"
    );

  return data;
}