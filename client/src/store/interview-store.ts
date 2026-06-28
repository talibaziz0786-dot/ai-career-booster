import { create } from "zustand";

type Difficulty =
  | "beginner"
  | "intermediate"
  | "advanced";

  interface InterviewResult {
  overallScore: number;
  technicalScore: number;
  communicationScore: number;
  confidenceScore: number;
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
  recruiterVerdict: string;
}

interface InterviewStore {
  category: string;

  difficulty: Difficulty;

  currentQuestion: string;

  currentAnswer: string;

  currentStep: number;

  

  totalQuestions: number;

  interviewStarted: boolean;

  loading: boolean;

  feedbackLoading: boolean;

  score: number;

  strengths: string[];

  weaknesses: string[];

  feedback: string;

  improvedAnswer: string;

  resumeSkills: string[];

  questions: string[];

  answers: string[];

  selectedSkills: string[];

       careerInsights: {
  focusAreas: string[];
  recommendedProjects: string[];
  careerAdvice: string;
} | null;



  language:
  | "english"
  | "hindi"
  | "hinglish"
  | "urdu";

  interviewType:
  | "skill"
  | "hr"
  | "mixed";

 interviewResult: InterviewResult | null;


  setCareerInsights: (
  insights: any
) => void;

 setInterviewType: (
  type:
    | "skill"
    | "hr"
    | "mixed"
) => void;

setSelectedSkills: (
  skills: string[]
) => void;

 setLanguage: (
 language:
  | "english"
  | "hindi"
  | "hinglish"
  | "urdu"
) => void;

 clearInterviewSession: () => void;

setInterviewResult: (
  result: InterviewResult
) => void;

  addAnswer: (
 answer: string
) => void;

setQuestions: (
  questions: string[]
) => void;

addQuestion: (
  question: string
) => void;

setResumeSkills: (
  skills: string[]
) => void;

  questionHistory: string[];

addQuestionToHistory: (
  question: string
) => void;

  startInterview: () => void;

  endInterview: () => void;

  setLoading: (
    loading: boolean
  ) => void;

  setFeedbackLoading: (
 loading: boolean
) => void;

  setQuestion: (
    question: string
  ) => void;

  setAnswer: (
    answer: string
  ) => void;

  setDifficulty: (
    difficulty: Difficulty
  ) => void;

setCategory: (
  category: string
) => void;

  setEvaluation: (
    data: {
      score: number;
      strengths: string[];
      weaknesses: string[];
      feedback: string;
      improvedAnswer: string;
    }
  ) => void;

  nextQuestion: () => void;

  

  previousQuestion: () => void;
}



export const useInterviewStore =
  create<InterviewStore>((set) => ({
    category: "React",

    language:
  "english",

  interviewType: "mixed",

    difficulty: "beginner",

    currentQuestion: 
       "",

      
    currentAnswer: "",

    currentStep: 1,

    totalQuestions: 10,

    interviewStarted: false,

    questionHistory: [],

    loading: false,

    feedbackLoading: false,

    score: 0,

    strengths: [],

    weaknesses: [],

    feedback: "",

    improvedAnswer: "",

    interviewResult: null,

    resumeSkills: [],

    selectedSkills: [],

    questions: [],

    answers: [],

    careerInsights: null,


    addAnswer: (
 answer
) =>
 set((state) => ({
   answers: [
     ...state.answers,
     answer,
   ],
 })),
 
 setInterviewType: (
  type
) =>
  set({
    interviewType: type,
  }),

    setResumeSkills: (
  skills
) =>
  set({
    resumeSkills: skills,
  }),

  
startInterview: () =>
  set({
    interviewStarted: true,
  }),

      addQuestionToHistory: (
  question
) =>
  set((state) => ({
    questionHistory: [
      ...state.questionHistory,
      question,
    ],
  })),

    endInterview: () =>
      set({
        interviewStarted: false,
      }),

    setLoading: (loading) =>
      set({
        loading,
      }),

      setFeedbackLoading: (loading) =>
  set({
    feedbackLoading: loading,
  }),

      setSelectedSkills: (
  skills
) =>
  set({
    selectedSkills: skills,
  }),

    setQuestion: (question) =>
      set({
        currentQuestion: question,
      }),

   

    setAnswer: (answer) =>
      set({
        currentAnswer: answer,
      }),

    setDifficulty: (
      difficulty
    ) =>
      set({
        difficulty,
      }),


      setCategory: (
  category
) =>
  set({
    category,
  }),

    setEvaluation: (
      data
    ) =>
      set({
        score: data.score,
        strengths:
          data.strengths,
        weaknesses:
          data.weaknesses,
        feedback:
          data.feedback,
        improvedAnswer:
          data.improvedAnswer,
      }),

      setInterviewResult: (
  result
) =>
  set({
    interviewResult: result,
  }),

    nextQuestion: () =>
      set((state) => ({
        currentStep:
          state.currentStep + 1,
      })),

 previousQuestion: () =>
  set((state) => {

    const newStep =
      Math.max(
        state.currentStep - 1,
        1
      );

    return {
      currentStep: newStep,

      currentQuestion:
        state.questions[
          newStep - 1
        ] || "",

      currentAnswer:
        state.answers[
          newStep - 1
        ] || "",
    };
  }),

  setLanguage: (
 language
) =>
 set({
   language,
 }),
 
  setQuestions: (
  questions
) =>
  set({
    questions,
  }),

addQuestion: (
  question
) =>
  set((state) => ({
    questions: [
      ...state.questions,
      question,
    ],
  })),

  

  clearInterviewSession: () =>
  set({
    currentQuestion: "",
    currentAnswer: "",

    feedbackLoading: false,

    currentStep: 1,

    questionHistory: [],

    questions: [],

    answers: [],

    interviewResult: null,

    loading: false,
    

  }),

  setCareerInsights: (
  insights
) =>
  set({
    careerInsights: insights,
  }),


  }

));