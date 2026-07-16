import { api } from "../lib/axios";

export async function generateResume(payload: {
  resumeText: string;
  language: string;
}) {
  const { data } = await api.post(
    "/api/resume-builder/generate",
    payload
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
  const { data } = await api.get(
    `/api/resume-builder/${id}`
  );

  return data.data;
}

export async function updateResume(
  id: string,
  payload: unknown
) {
  const { data } = await api.put(
    `/api/resume-builder/${id}`,
    payload
  );

  return data.data;
}