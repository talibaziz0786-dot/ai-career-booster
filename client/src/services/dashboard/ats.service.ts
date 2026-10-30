import { api } from "../../lib/axios";

export interface ATSScoreResponse {
  score: number;
  status: string;
  message: string;
  matchedKeywords: number;
  missingKeywords: number;
}

export async function getATSScore() {
  const { data } = await api.get(
    "/api/dashboard/ats-score"
  );

  return data.data as ATSScoreResponse;
}