import { useState } from "react";

import axios from "axios";

import {
  generateInterview,
} from "../api/interview.api";

import {
  getErrorMessage,
} from "../utils/getErrorMessage";

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
    } catch (err) {
      const upgradeRequired =
        axios.isAxiosError(err) &&
        err.response?.data?.upgradeRequired ===
          true;

      if (upgradeRequired) {
        setUpgradeRequired(true);

        return;
      }

      setError(
        getErrorMessage(
          err,
          "Unable to generate interview."
        )
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