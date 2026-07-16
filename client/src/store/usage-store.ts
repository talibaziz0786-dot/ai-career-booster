import { create } from "zustand";

interface UsageState {
  loading: boolean;

  plan: string;

  usage: {
    resumeToday: number;
    atsToday: number;
    interviewToday: number;
    coverLetterToday: number;
  };

  limits: {
    resume: number;
    ats: number;
    interview: number;
    coverLetter: number;
  } | null;

  setUsage: (data: Partial<UsageState>) => void;

  setLoading: (loading: boolean) => void;
}

export const useUsageStore =
  create<UsageState>((set) => ({
    loading: false,

    plan: "free",

    usage: {
      resumeToday: 0,
      atsToday: 0,
      interviewToday: 0,
      coverLetterToday: 0,
    },

    limits: null,

    setLoading: (loading) =>
      set({ loading }),

    setUsage: (data) =>
      set((state) => ({
        ...state,
        ...data,
      })),
  }));