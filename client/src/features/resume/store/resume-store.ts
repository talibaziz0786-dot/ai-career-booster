import { create } from "zustand";

import type { ResumeData } from "../types/resume.types";

interface ResumeStore {
  resume: ResumeData;

  updateResume: (
    data: Partial<ResumeData>
  ) => void;
}

export const useResumeStore =
  create<ResumeStore>((set) => ({
    resume: {
      personalInfo: {
        fullName: "",
        email: "",
        phone: "",
        location: "",
      },

      summary: "",

      skills: [],

      experience: [],

      education: [],
    },

    updateResume: (data) =>
      set((state) => ({
        resume: {
          ...state.resume,
          ...data,
        },
      })),
  }));