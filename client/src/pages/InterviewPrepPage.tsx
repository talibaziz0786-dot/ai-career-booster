import InterviewDashboard from "../components/interview/InterviewDashboard";
import MockInterviewPanel from "../components/interview/MockInterviewPanel";
import { useInterviewStore } from "../store/interview-store";
import { useResumeStore }
from "../store/resume-store";
import { useEffect } from "react";
import { api } from "../lib/axios";
import InterviewResultPage
from "./InterviewResultPage";
import UpgradeModal from "../components/subscription/UpgradeModal";
import useInterviewAI from "../hooks/useInterviewAI";


export default function InterviewPrepPage() {

  const resumeData =
  useResumeStore(
    (state) => state.data
  );

const setResumeSkills =
  useInterviewStore(
    (state) =>
      state.setResumeSkills
  );

  const interviewResult =
  useInterviewStore(
    (state) => state.interviewResult
  );


  const {
  upgradeRequired,
} = useInterviewAI();

 const {
  interviewStarted,
  startInterview,
  setLanguage,
  setQuestion,
  loading,
  setLoading,
  category,
  difficulty,
  resumeSkills,
  language,
  setDifficulty,
  selectedSkills,
   interviewType,
    setInterviewType,
} = useInterviewStore();

  useEffect(() => {
  if (resumeData.skills) {

    console.log(
  "RAW RESUME SKILLS:",
  resumeData.skills
);
   const uniqueSkills = [
  ...new Map(
    resumeData.skills
      .split(/\r?\n|,/)
      .map((skill) => {
        const trimmed =
          skill.trim();

        return [
          trimmed.toLowerCase(),
          trimmed,
        ];
      })
  ).values(),
];

console.log(
  "UNIQUE SKILLS:",
  uniqueSkills
);

setResumeSkills(uniqueSkills);
  }
}, [resumeData]);

// useEffect(() => {
//   useInterviewStore.setState({
//     interviewStarted: false,
//   });
// }, []);

  const startInterviewHandler =
async () => {

  if (loading) return;

  try {

    setLoading(true);

    console.log(
  "INTERVIEW STARTED:",
  interviewStarted
);

  //  startInterview();

console.log(
  "AFTER START:",
  useInterviewStore.getState().interviewStarted
);

    const response =
      await api.post(
        "/api/interview/question",
        {
          category,
          difficulty,
          interviewType,
          history: [],
          skills:
            selectedSkills.length > 0
              ? selectedSkills
              : resumeSkills,
          language,
        }

        
      );

    setQuestion(
      response.data.question
    );

    console.log(
  "QUESTION RECEIVED:",
  response.data.question
);

    const store =
      useInterviewStore.getState();

    store.addQuestion(
      response.data.question
    );

    store.addQuestionToHistory(
      response.data.question
    );

    startInterview();

  } catch (error) {

    console.error(error);

  } finally {

    setLoading(false);

  }
};


     

  return (
    <div
      className="
      min-h-screen
      bg-slate-50
      p-8

      dark:bg-slate-950
      "
    >
      <h1
        className="
        mb-8
        text-5xl
        font-black
        "
      >
        AI Interview Coach
      </h1>


    {
  interviewResult ? (
    <InterviewResultPage />
  ) : interviewStarted ? (
    <MockInterviewPanel />
  ) : (
    <>
      <InterviewDashboard />

      <div
        className="
        mt-10
        flex
        flex-col
        gap-6
        md:flex-row
        md:items-end
        "
      >

  <div className="flex flex-col gap-2">
    <label
      className="
      text-sm
      font-semibold
      "
    >
      Interview Language
    </label>

    <select
      aria-label="Select Language"
      value={language}
      onChange={(e) =>
        setLanguage(
          e.target.value as any
        )
      }
      className="
      rounded-xl
      border
      border-slate-300
      bg-white
      px-4
      py-3

      dark:border-slate-700
      dark:bg-slate-900
      "
    >
      <option value="english">
        English
      </option>

      <option value="hindi">
        Hindi
      </option>

      <option value="hinglish">
        Hinglish
      </option>

      <option value="urdu">
        Urdu
      </option>
    </select>
  </div>

  <div className="flex flex-col gap-2">
    <label
      className="
      text-sm
      font-semibold
      "
    >
      Difficulty Level
    </label>

    <select 
    aria-label="select-lavel"
      value={difficulty}
      onChange={(e) =>
        setDifficulty(
          e.target.value as any
        )
      }
      className="
      rounded-xl
      border
      border-slate-300
      bg-white
      px-4
      py-3

      dark:border-slate-700
      dark:bg-slate-900
      "
    >
      <option value="beginner">
        Beginner
      </option>

      <option value="intermediate">
        Intermediate
      </option>

      <option value="advanced">
        Advanced
      </option>
    </select>
  </div>

<div className="flex flex-col gap-2">
  <label
    className="
    text-sm
    font-semibold
    "
  >
    Interview Type
  </label>

  <select
  aria-label="interview-mode"
    value={interviewType}
    onChange={(e) =>
      setInterviewType(
        e.target.value as
          | "skill"
          | "hr"
          | "mixed"
      )
    }
    className="
    rounded-xl
    border
    border-slate-300
    bg-white
    px-4
    py-3

    dark:border-slate-700
    dark:bg-slate-900
    "
  >
    <option value="skill">
      Skill Based
    </option>

    <option value="hr">
      HR
    </option>

    <option value="mixed">
      Mixed
    </option>
  </select>
</div>

  <button
    onClick={
      startInterviewHandler
    }
     disabled={loading}
    className={`
    rounded-2xl
    bg-cyan-500
    px-8
    py-3
    font-bold
    text-white
    transition-all

    hover:bg-cyan-600

    ${
      loading
        ? `
          cursor-not-allowed
          bg-slate-400
          opacity-70
        `
        : `
          bg-cyan-500
          hover:bg-cyan-600
        `
    }
  `}
  >
    {loading
  ? "Generating Interview..."
  : "Start Mock Interview"}
    
  </button>

</div>

    </>
  )
}

<UpgradeModal
  open={upgradeRequired}
  onClose={() => {}}
/>

</div>
);
}