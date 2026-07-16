import { create } from "zustand";
import { type ResumeAnalysisResult } from "../types/resume-analysis";

interface ResumeAnalysisStore {
  loading: boolean;

  result: ResumeAnalysisResult | null;

  setLoading: (loading: boolean) => void;

  setResult: (
    result: ResumeAnalysisResult
  ) => void;

  clear: () => void;
}

export const useResumeAnalysisStore =
  create<ResumeAnalysisStore>((set) => ({
    loading: false,

    result: null,

    setLoading: (loading) =>
      set({
        loading,
      }),

    setResult: (result) =>
      set({
        result,
      }),

    clear: () =>
      set({
        result: null,
      }),
  }));