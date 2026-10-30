import { create } from "zustand";

import type {
  CoverLetterInput,
  CoverLetterResult,
} from "../types/cover-letter/cover-letter.types";

/* ==========================================
   History Item
========================================== */

export interface CoverLetterHistoryItem {
  id: string;

  companyName: string;

  jobTitle: string;

  createdAt: string;

  result: CoverLetterResult;
}

/* ==========================================
   Store
========================================== */

interface CoverLetterStore {
  /* ==========================
     Input
  ========================== */

  input: CoverLetterInput;

  updateField: <
    K extends keyof CoverLetterInput
  >(
    field: K,
    value: CoverLetterInput[K]
  ) => void;

  setInput: (
    value: CoverLetterInput
  ) => void;

  /* ==========================
     AI Result
  ========================== */

  result: CoverLetterResult | null;

  setResult: (
    result: CoverLetterResult
  ) => void;

  clearResult: () => void;

  /* ==========================
     Loading
  ========================== */

  loading: boolean;

  setLoading: (
    loading: boolean
  ) => void;

  /* ==========================
     History
  ========================== */

  history: CoverLetterHistoryItem[];

  setHistory: (
    history: CoverLetterHistoryItem[]
  ) => void;

  addHistory: (
    item: CoverLetterHistoryItem
  ) => void;

  removeHistory: (
    id: string
  ) => void;

  clearHistory: () => void;

  /* ==========================
     Reset
  ========================== */

  reset: () => void;
}

/* ==========================================
   Default Input
========================================== */

const defaultInput: CoverLetterInput = {
  fullName: "",

  email: "",

  phone: "",

  companyName: "",

  hiringManager: "",

  jobTitle: "",

  experience: "",

  skills: [],

  achievements: [],

  projects: [],

  tone: "professional",

  language: "english",
};

/* ==========================================
   Store
========================================== */

export const useCoverLetterStore =
  create<CoverLetterStore>((set) => ({
    /* ==========================
       Input
    ========================== */

    input: defaultInput,

    updateField: (
      field,
      value
    ) =>
      set((state) => ({
        input: {
          ...state.input,
          [field]: value,
        },
      })),

    setInput: (
      value
    ) =>
      set({
        input: value,
      }),

    /* ==========================
       AI Result
    ========================== */

    result: null,

    setResult: (
      result
    ) =>
      set({
        result,
      }),

    clearResult: () =>
      set({
        result: null,
      }),

    /* ==========================
       Loading
    ========================== */

    loading: false,

    setLoading: (
      loading
    ) =>
      set({
        loading,
      }),


          /* ==========================
       History
    ========================== */

    history: [],

    setHistory: (
      history
    ) =>
      set({
        history,
      }),

    addHistory: (
      item
    ) =>
      set((state) => ({
        history: [
          item,
          ...state.history,
        ],
      })),

    removeHistory: (
      id
    ) =>
      set((state) => ({
        history:
          state.history.filter(
            (item) =>
              item.id !== id
          ),
      })),

    clearHistory: () =>
      set({
        history: [],
      }),

    /* ==========================
       Reset
    ========================== */

    reset: () =>
      set({
        input: {
          ...defaultInput,
        },

        result: null,

        loading: false,
      }),
  }));