import { create } from "zustand";

import type {
  LinkedInProfileInput,
  LinkedInOptimizationResult,
} from "../types/linkedin/linkedin.types";

/* ===========================================================
   Store State
=========================================================== */

interface LinkedInStore {
  /* ==========================================
     Profile Form
  ========================================== */

  profile: LinkedInProfileInput;

  setProfile: (
    profile: LinkedInProfileInput
  ) => void;

  updateField: <
    K extends keyof LinkedInProfileInput
  >(
    key: K,
    value: LinkedInProfileInput[K]
  ) => void;

  resetProfile: () => void;

  /* ==========================================
     AI Result
  ========================================== */

  result:
    | LinkedInOptimizationResult
    | null;

  setResult: (
    result: LinkedInOptimizationResult
  ) => void;

  clearResult: () => void;

  /* ==========================================
     Loading
  ========================================== */

  loading: boolean;

  setLoading: (
    loading: boolean
  ) => void;

  /* ==========================================
     Error
  ========================================== */

  error: string | null;

  setError: (
    error: string | null
  ) => void;
}

/* ===========================================================
   Default Profile
=========================================================== */

const defaultProfile: LinkedInProfileInput =
  {
    fullName: "",

    headline: "",

    currentRole: "",

    yearsOfExperience: 0,

    location: "",

    skills: [],

    summary: "",

    achievements: [],

    targetRole: "",

    industry: "",
  };

  /* ===========================================================
   Zustand Store
=========================================================== */

export const useLinkedInStore =
  create<LinkedInStore>((set) => ({
    /* ==========================================
       Profile
    ========================================== */

    profile: defaultProfile,

    setProfile: (profile) =>
      set({
        profile,
      }),

    updateField: (
      key,
      value
    ) =>
      set((state) => ({
        profile: {
          ...state.profile,
          [key]: value,
        },
      })),

    resetProfile: () =>
      set({
        profile: defaultProfile,
      }),

    /* ==========================================
       AI Result
    ========================================== */

    result: null,

    setResult: (result) =>
      set({
        result,
      }),

    clearResult: () =>
      set({
        result: null,
      }),

    /* ==========================================
       Loading
    ========================================== */

    loading: false,

    setLoading: (
      loading
    ) =>
      set({
        loading,
      }),

    /* ==========================================
       Error
    ========================================== */

    error: null,

    setError: (
      error
    ) =>
      set({
        error,
      }),
  }));