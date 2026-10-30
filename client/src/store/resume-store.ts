import { create } from "zustand";

export interface ResumeData {
  photo: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;

  linkedin: string;
  github: string;
  portfolio: string;

  summary: string;

  skills: string;
  experience: string;
  education: string;

  jobTitle: string;

  projects: string;
  certifications: string;
  achievements: string;
  languages: string;
}

export interface ResumeVersion {
  _id: string;
  title: string;
  version: number;
  updatedAt: string;
}

export type ResumeTemplate =
  | "modern"
  | "corporate"
  | "minimal";

interface ResumeStore {
  data: ResumeData;

  selectedTemplate: ResumeTemplate;

  resumeList: ResumeVersion[];

  lastSaved: number;

  aiResume: ResumeData | null;

  setLastSaved: () => void;

  setResumeList: (
    resumes: ResumeVersion[]
  ) => void;

  updateData: (
    values: Partial<ResumeData>
  ) => void;

  loadResume: (
    values: Partial<ResumeData>
  ) => void;

  setTemplate: (
    template: ResumeTemplate
  ) => void;

  resetResume: () => void;

  setAIResume: (
    resume: ResumeData
  ) => void;
}

const initialData: ResumeData = {
  photo: "",
  fullName: "",
  email: "",
  phone: "",
  location: "",

  linkedin: "",
  github: "",
  portfolio: "",

  summary: "",

  skills: "",
  experience: "",
  education: "",

  jobTitle: "",

  projects: "",
  certifications: "",
  achievements: "",
  languages: "",
};

function getInitialResumeData(): ResumeData {
  try {
    const saved =
      localStorage.getItem(
        "resume-data"
      );

    if (!saved) {
      return initialData;
    }

    const parsed = JSON.parse(saved);

    if (
      !parsed ||
      typeof parsed !== "object"
    ) {
      return initialData;
    }

    return {
      ...initialData,
      ...parsed,
    };
  } catch (error) {
    console.error(
      "Failed to load saved resume data:",
      error
    );

    return initialData;
  }
}

function getInitialTemplate(): ResumeTemplate {
  const saved =
    localStorage.getItem(
      "resume-template"
    );

  if (
    saved === "modern" ||
    saved === "corporate" ||
    saved === "minimal"
  ) {
    return saved;
  }

  return "modern";
}

export const useResumeStore =
  create<ResumeStore>((set) => ({
    data: getInitialResumeData(),

    selectedTemplate:
      getInitialTemplate(),

    resumeList: [],

    lastSaved: Date.now(),

    aiResume: null,

    setAIResume: (resume) =>
      set({
        aiResume: resume,
      }),

    setResumeList: (resumes) =>
      set({
        resumeList: resumes,
      }),

    setLastSaved: () =>
      set({
        lastSaved: Date.now(),
      }),

    updateData: (values) =>
      set((state) => {
        const updated: ResumeData = {
          ...state.data,
          ...values,
        };

        localStorage.setItem(
          "resume-data",
          JSON.stringify(updated)
        );

        return {
          data: updated,
        };
      }),

    loadResume: (values) =>
      set(() => {
        const updated: ResumeData = {
          ...initialData,
          ...values,
        };

        localStorage.setItem(
          "resume-data",
          JSON.stringify(updated)
        );

        return {
          data: updated,
        };
      }),

    setTemplate: (template) => {
      localStorage.setItem(
        "resume-template",
        template
      );

      set({
        selectedTemplate: template,
      });
    },

    resetResume: () => {
      localStorage.removeItem(
        "resume-data"
      );

      localStorage.removeItem(
        "resume-template"
      );

      set({
        data: initialData,
        selectedTemplate: "modern",
        aiResume: null,
      });
    },
  }));