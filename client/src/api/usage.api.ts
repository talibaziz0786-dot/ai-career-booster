import axios from "axios";

const API =
  import.meta.env.VITE_API_URL ??
  "http://localhost:5000";

const usageApi = axios.create({
  baseURL: `${API}/api/usage`,
});

usageApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

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