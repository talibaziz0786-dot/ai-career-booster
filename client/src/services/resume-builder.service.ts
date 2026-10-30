import { api } from "../lib/axios";

export interface GenerateResumePayload {
  resumeText: string;
  language?: string;
}

export async function generateResume(
  payload: GenerateResumePayload
) {
  const { data } = await api.post(
    "/api/resume-builder/generate",
    {
      resumeText: payload.resumeText,
      language: payload.language ?? "english",
    }
  );

  return data.data;
}

export async function getMyResumes() {
  const { data } = await api.get(
    "/api/resume-builder"
  );

  return data.data;
}

export async function getResume(
  id: string
) {
  if (!id?.trim()) {
    throw new Error(
      "Resume ID is required."
    );
  }

  const { data } = await api.get(
    `/api/resume-builder/${id}`
  );

  return data.data;
}

export async function updateResume(
  id: string,
  payload: unknown
) {
  if (!id?.trim()) {
    throw new Error(
      "Resume ID is required."
    );
  }

  const { data } = await api.put(
    `/api/resume-builder/${id}`,
    payload
  );

  return data.data;
}