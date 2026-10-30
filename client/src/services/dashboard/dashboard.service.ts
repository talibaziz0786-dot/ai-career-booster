import { api } from "../../lib/axios";

export interface ResumeAnalyticsPoint {
  month: string;
  score: number;
}

export async function getResumeAnalytics() {
  const response = await api.get(
    "/api/dashboard/resume-analytics"
  );

  return response.data.data as ResumeAnalyticsPoint[];
}