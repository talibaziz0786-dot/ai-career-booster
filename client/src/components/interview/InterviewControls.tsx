import { useInterviewStore } from "../../store/interview-store";

export default function InterviewControls() {
  const {
    nextQuestion,
    endInterview,
  } = useInterviewStore();

  return (
    <div
      className="
      flex
      gap-4
      "
    >
      <button
        onClick={nextQuestion}
        className="
        rounded-2xl
        bg-cyan-500
        px-6
        py-3
        font-semibold
        text-white
        "
      >
        Next Question
      </button>

      <button
        onClick={endInterview}
        className="
        rounded-2xl
        bg-red-500
        px-6
        py-3
        font-semibold
        text-white
        "
      >
        End Interview
      </button>
    </div>
  );
}