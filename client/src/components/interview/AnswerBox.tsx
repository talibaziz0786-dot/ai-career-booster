import { useInterviewStore } from "../../store/interview-store";

export default function AnswerBox() {
  const {
    currentAnswer,
    setAnswer,
  } = useInterviewStore();

  return (
    <textarea
      value={currentAnswer}
      onChange={(e) =>
        setAnswer(
          e.target.value
        )
      }
      rows={8}
      placeholder="Write your answer..."
      className="
      w-full
      rounded-3xl
      border
      border-slate-200
      p-5

      dark:border-white/10
      dark:bg-slate-900
      "
    />
  );
}