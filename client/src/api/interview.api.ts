import axios from "axios";

const API =
  import.meta.env.VITE_API_URL ??
  "http://localhost:5000";

const interviewApi = axios.create({
  baseURL: `${API}/api/ai/interview`,
});

interviewApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

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