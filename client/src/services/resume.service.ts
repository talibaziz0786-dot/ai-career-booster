import { api } from "../lib/axios";

export async function analyzeResume(
  resumeText: string,
  language = "english"
) {
  const response = await api.post(
    "/api/resume-analysis/analyze",
    {
      resumeText,
      language,
    }
  );

  return response.data.analysis;
}

export async function generateResume(
  resumeText: string,
  language = "english"
) {
  const response = await api.post(
    "/api/resume-builder/generate",
    {
      resumeText,
      language,
    }
  );

  return response.data.data;
}