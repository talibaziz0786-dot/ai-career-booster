import { createApiClient } from "../lib/api-client";

const interviewApi = createApiClient(
  "/api/ai/interview"
);

export interface InterviewRequest {
  role: string;
  experience: string;
  difficulty: string;
}

export interface InterviewResponse {
  success: boolean;

  role: string;

  experience: string;

  difficulty: string;

  questions: string[];
}

export async function generateInterview(
  body: InterviewRequest
) {
  const { data } =
    await interviewApi.post<InterviewResponse>(
      "/generate",
      body
    );

  return data;
}