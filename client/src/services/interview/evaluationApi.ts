


import { api } from "../../lib/axios";

export async function evaluateAnswer(
  question: string,
  answer: string
) {
  const response = await api.post(
    "/api/evaluation/evaluate",
    {
      question,
      answer,
    }
  );

  return response.data;
}