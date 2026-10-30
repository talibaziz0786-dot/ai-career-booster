import { create } from "zustand";

import type {
  Difficulty,
  InterviewLanguage,
  InterviewType,
  InterviewHistoryItem,
  InterviewResult,
  CareerInsights,
} from "../types/interview/interview.types";

// ==========================================
// Interview Store
// ==========================================

export interface InterviewStore {
  // ==========================================
  // SETTINGS
  // ==========================================

  industry: string | null;

  category: string;

  difficulty: Difficulty;

  language: InterviewLanguage;

  interviewType: InterviewType;

  resumeSkills: string[];

  selectedSkills: string[];

  customTopic: string;

  // ==========================================
  // CURRENT SESSION
  // ==========================================

  currentQuestion: string;

  currentAnswer: string;

  currentOptions: string[];

  correctAnswer: string;

  currentStep: number;

  totalQuestions: number;

  interviewStarted: boolean;

  // ==========================================
  // INDUSTRY-SPECIFIC DATA
  // ==========================================

  strengthsIndustry: {
    [industry: string]: string[];
  };

  weaknessesIndustry: {
    [industry: string]: string[];
  };

  // ==========================================
  // LEGACY
  // ==========================================

  questions: string[];

  answers: string[];

  // ==========================================
  // ENTERPRISE HISTORY
  // ==========================================

  history: InterviewHistoryItem[];

  // ==========================================
  // EVALUATION
  // ==========================================

  score: number;

  strengths: string[];

  weaknesses: string[];

  feedback: string;

  improvedAnswer: string;

  interviewResult: InterviewResult | null;

  careerInsights: CareerInsights | null;

  // ==========================================
  // LOADING
  // ==========================================

  loading: boolean;

  feedbackLoading: boolean;

  // ==========================================
  // SETTINGS METHODS
  // ==========================================

  setIndustry(industry: string | null): void;

  setCategory(category: string): void;

  setDifficulty(difficulty: Difficulty): void;

  setLanguage(language: InterviewLanguage): void;

  setInterviewType(type: InterviewType): void;

  setResumeSkills(skills: string[]): void;

  setSelectedSkills(skills: string[]): void;

  setCustomTopic(topic: string): void;

  // ==========================================
  // QUESTION METHODS
  // ==========================================

  setQuestion(question: string): void;

  addQuestion(question: string): void;

  setQuestions(questions: string[]): void;

  // ==========================================
  // ANSWER METHODS
  // ==========================================

  setAnswer(answer: string): void;

  addAnswer(answer: string): void;

  // ==========================================
  // HISTORY METHODS
  // ==========================================

  createHistoryItem(
    item: Omit<InterviewHistoryItem, "createdAt">
  ): InterviewHistoryItem;

  addHistoryItem(item: InterviewHistoryItem): void;

  updateHistoryAnswer(
    index: number,
    answer: string
  ): void;

  updateHistoryEvaluation(
    index: number,
    data: {
      score?: number;
      strengths?: string[];
      weaknesses?: string[];
      feedback?: string;
    }
  ): void;

  setHistory(history: InterviewHistoryItem[]): void;

  clearHistory(): void;

  // ==========================================
  // NAVIGATION
  // ==========================================

  nextQuestion(): void;

  previousQuestion(): void;

  // ==========================================
  // LOADING
  // ==========================================

  setLoading(loading: boolean): void;

  setFeedbackLoading(loading: boolean): void;

  // ==========================================
  // EVALUATION
  // ==========================================

  setEvaluation(data: {
    score: number;
    strengths: string[];
    weaknesses: string[];
    feedback: string;
    improvedAnswer: string;
  }): void;

  setInterviewResult(result: InterviewResult): void;

  setCareerInsights(insights: CareerInsights): void;

  setCurrentOptions(options: string[]): void;

  setCorrectAnswer(answer: string): void;

  // ==========================================
  // SESSION
  // ==========================================

  startInterview(): void;

  endInterview(): void;

  clearInterviewSession(): void;
}

// ==========================================
// Zustand Store
// ==========================================

export const useInterviewStore = create<InterviewStore>(
  (set) => ({
    // ==========================================
    // SETTINGS
    // ==========================================

    industry: null,

    category: "React",

    difficulty: "beginner",

    language: "english",

    interviewType: "mixed",

    resumeSkills: [],

    selectedSkills: [],

    customTopic: "",

    // ==========================================
    // CURRENT SESSION
    // ==========================================

    currentQuestion: "",

    currentAnswer: "",

    currentOptions: [],

    correctAnswer: "",

    currentStep: 1,

    totalQuestions: 10,

    interviewStarted: false,

    // ==========================================
    // INDUSTRY-SPECIFIC DATA
    // ==========================================

    strengthsIndustry: {},

    weaknessesIndustry: {},

    // ==========================================
    // LEGACY
    // ==========================================

    questions: [],

    answers: [],

    // ==========================================
    // ENTERPRISE HISTORY
    // ==========================================

    history: [],

    // ==========================================
    // EVALUATION
    // ==========================================

    score: 0,

    strengths: [],

    weaknesses: [],

    feedback: "",

    improvedAnswer: "",

    interviewResult: null,

    careerInsights: null,

    // ==========================================
    // LOADING
    // ==========================================

    loading: false,

    feedbackLoading: false,

    // ==========================================
    // SETTINGS METHODS
    // ==========================================

    setIndustry: (industry) =>
      set({
        industry,
      }),

    setCategory: (category) =>
      set({
        category,
      }),

    setDifficulty: (difficulty) =>
      set({
        difficulty,
      }),

    setLanguage: (language) =>
      set({
        language,
      }),

    setInterviewType: (interviewType) =>
      set({
        interviewType,
      }),

    setResumeSkills: (resumeSkills) =>
      set({
        resumeSkills,
      }),

    setSelectedSkills: (selectedSkills) =>
      set({
        selectedSkills,
      }),

    setCustomTopic: (customTopic) =>
      set({
        customTopic,
      }),

    // ==========================================
    // QUESTION METHODS
    // ==========================================

    setQuestion: (currentQuestion) =>
      set({
        currentQuestion,
      }),

    addQuestion: (question) =>
      set((state) => ({
        questions: [
          ...state.questions,
          question,
        ],
      })),

    setQuestions: (questions) =>
      set({
        questions,
      }),

    // ==========================================
    // ANSWER METHODS
    // ==========================================

    setAnswer: (currentAnswer) =>
      set({
        currentAnswer,
      }),

    addAnswer: (answer) =>
      set((state) => ({
        answers: [
          ...state.answers,
          answer,
        ],
      })),

    // ==========================================
    // HISTORY METHODS
    // ==========================================

    createHistoryItem: (item) => ({
      ...item,
      createdAt: new Date().toISOString(),
    }),

    addHistoryItem: (item) =>
      set((state) => ({
        history: [
          ...state.history,
          item,
        ],
      })),

    updateHistoryAnswer: (index, answer) =>
      set((state) => ({
        history: state.history.map(
          (item, itemIndex) =>
            itemIndex === index
              ? {
                  ...item,
                  answer,
                }
              : item
        ),
      })),

    updateHistoryEvaluation: (
      index,
      data
    ) =>
      set((state) => ({
        history: state.history.map(
          (item, itemIndex) =>
            itemIndex === index
              ? {
                  ...item,

                  score:
                    data.score ??
                    item.score,

                  strengths:
                    data.strengths ??
                    item.strengths,

                  weaknesses:
                    data.weaknesses ??
                    item.weaknesses,

                  feedback:
                    data.feedback ??
                    item.feedback,
                }
              : item
        ),
      })),

    setHistory: (history) =>
      set({
        history,
      }),

    clearHistory: () =>
      set({
        history: [],
      }),

    // ==========================================
    // NAVIGATION METHODS
    // ==========================================

    nextQuestion: () =>
      set((state) => ({
        currentStep: Math.min(
          state.currentStep + 1,
          state.totalQuestions
        ),
      })),

    previousQuestion: () =>
      set((state) => {
        const newStep = Math.max(
          state.currentStep - 1,
          1
        );

        return {
          currentStep: newStep,

          currentQuestion:
            state.history[newStep - 1]
              ?.question ??
            state.questions[newStep - 1] ??
            "",

          currentAnswer:
            state.history[newStep - 1]
              ?.answer ??
            state.answers[newStep - 1] ??
            "",
        };
      }),

    // ==========================================
    // LOADING METHODS
    // ==========================================

    setLoading: (loading) =>
      set({
        loading,
      }),

    setFeedbackLoading: (feedbackLoading) =>
      set({
        feedbackLoading,
      }),

    // ==========================================
    // EVALUATION METHODS
    // ==========================================

    setEvaluation: (data) =>
      set({
        score: data.score,

        strengths: data.strengths,

        weaknesses: data.weaknesses,

        feedback: data.feedback,

        improvedAnswer:
          data.improvedAnswer,
      }),

    setCurrentOptions: (currentOptions) =>
      set({
        currentOptions,
      }),

    setCorrectAnswer: (correctAnswer) =>
      set({
        correctAnswer,
      }),

    setInterviewResult: (
      interviewResult
    ) =>
      set({
        interviewResult,
      }),

    setCareerInsights: (
      careerInsights
    ) =>
      set({
        careerInsights,
      }),

    // ==========================================
    // INTERVIEW LIFECYCLE
    // ==========================================

    startInterview: () =>
      set({
        interviewStarted: true,

        currentStep: 1,

        loading: false,

        feedbackLoading: false,
      }),

    endInterview: () =>
      set({
        interviewStarted: false,

        loading: false,

        feedbackLoading: false,
      }),

    clearInterviewSession: () =>
      set({
        // Current Session
        currentQuestion: "",

        currentAnswer: "",

        currentOptions: [],

        correctAnswer: "",

        currentStep: 1,

        interviewStarted: false,

        // Legacy
        questions: [],

        answers: [],

        // Enterprise History
        history: [],

        // Evaluation
        score: 0,

        strengths: [],

        weaknesses: [],

        feedback: "",

        improvedAnswer: "",

        interviewResult: null,

        careerInsights: null,

        // Loading
        loading: false,

        feedbackLoading: false,
      }),
  })
);