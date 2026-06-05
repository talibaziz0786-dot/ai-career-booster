import { create } from "zustand";

interface InterviewStore {
  category: string;

  difficulty:
    | "beginner"
    | "intermediate"
    | "advanced";

  currentQuestion: string;

  currentAnswer: string;

  currentStep: number;

  totalQuestions: number;

  interviewStarted: boolean;

  loading: boolean;

  startInterview: () => void;

  endInterview: () => void;

  setLoading: (
 loading: boolean
) => void;
 
  setQuestion: (
    question: string
  ) => void;

  setAnswer: (
    answer: string
  ) => void;

  setDifficulty: (
    difficulty:
      | "beginner"
      | "intermediate"
      | "advanced"
  ) => void;

  nextQuestion: () => void;
}

export const useInterviewStore =
  create<InterviewStore>((set) => ({
    category: "React",

    difficulty: "beginner",

    currentQuestion:
      "Tell me about yourself",

    currentAnswer: "",

    currentStep: 1,

    totalQuestions: 10,

    interviewStarted: false,

    loading: false,

    startInterview: () =>
      set({
        interviewStarted: true,
      }),

    endInterview: () =>
      set({
        interviewStarted: false,
      }),

      setLoading: (
  loading
) =>
  set({
    loading,
  }),

    setQuestion: (
      question
    ) =>
      set({
        currentQuestion:
          question,
      }),

    setAnswer: (
      answer
    ) =>
      set({
        currentAnswer: answer,
      }),

    setDifficulty: (
      difficulty
    ) =>
      set({
        difficulty,
      }),

    nextQuestion: () =>
      set((state) => ({
        currentStep:
          state.currentStep + 1,
      })),
  }));