import { useState } from "react";

import {
  generateInterview,
} from "../api/interview.api";

interface GenerateParams {
  role: string;
  experience: string;
  difficulty: string;
}

export default function useInterviewAI() {
  const [loading, setLoading] =
    useState(false);

  const [questions, setQuestions] =
    useState<string[]>([]);

  const [error, setError] =
    useState("");

  const [upgradeRequired, setUpgradeRequired] =
    useState(false);

  async function startInterview(
    params: GenerateParams
  ) {
    try {
      setLoading(true);

      setError("");

      setUpgradeRequired(false);

      const response =
        await generateInterview(params);

      setQuestions(response.questions);

      return response.questions;
    } catch (err: any) {
      const data =
        err?.response?.data;

      if (data?.upgradeRequired) {
        setUpgradeRequired(true);

        return;
      }

      setError(
        data?.message ??
          "Unable to generate interview."
      );
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,

    questions,

    error,

    upgradeRequired,

    startInterview,
  };
}