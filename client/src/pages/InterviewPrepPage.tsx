import InterviewDashboard from "../components/interview/InterviewDashboard";
import MockInterviewPanel from "../components/interview/MockInterviewPanel";
import { useInterviewStore } from "../store/interview-store";

export default function InterviewPrepPage() {
  const {
    interviewStarted,
    startInterview,
  } = useInterviewStore();

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

      {!interviewStarted ? (
        <>
          <InterviewDashboard />

          <button
            onClick={
              startInterview
            }
            className="
            mt-8
            rounded-3xl
            bg-cyan-500
            px-8
            py-4
            text-lg
            font-bold
            text-white
            "
          >
            Start Mock Interview
          </button>
        </>
      ) : (
        <MockInterviewPanel />
      )}
    </div>
  );
}