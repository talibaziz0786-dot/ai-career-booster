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

  aiResume: ResumeData | null;

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

  projects: "",
  certifications: "",
  achievements: "",
  languages: "",

  jobTitle: "",
};

export const useResumeStore =
  create<ResumeStore>((set) => ({
    data:
      JSON.parse(
        localStorage.getItem(
          "resume-data"
        ) || "null"
      ) || initialData,

    selectedTemplate:
      (localStorage.getItem(
        "resume-template"
      ) as ResumeTemplate) ||
      "modern",

      aiResume: null,

setAIResume: (resume) =>
  set({
    aiResume: resume,
  }),


  resumeList: [],

setResumeList: (resumes) =>
  set({
    resumeList: resumes,
  }),

  lastSaved: Date.now(),

setLastSaved: () =>
  set({
    lastSaved: Date.now(),
  }),

    updateData: (values) =>
      set((state) => {
        const updated = {
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
    const updated = {
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
        selectedTemplate:
          template,
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
        selectedTemplate:
          "modern",
      });
    },

    
  }));