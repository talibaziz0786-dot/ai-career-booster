import { useInterviewStore } from "../../store/interview-store";

interface Props {
  title: string;
  questions: number;
}

export default function InterviewCategoryCard({
  title,
  questions,
}: Props) {

  const category =
    useInterviewStore(
      (state) => state.category
    );

  const setCategory =
    useInterviewStore(
      (state) => state.setCategory
    );

  const isSelected =
    category === title;

  return (
    <button
      onClick={() =>
        setCategory(title)
      }
      className={`
      w-full
      rounded-3xl
      p-6
      text-left
      text-white
      transition-all
      duration-300

      ${
        isSelected
          ? "scale-105 ring-4 ring-cyan-300 bg-gradient-to-br from-cyan-500 to-blue-600"
          : "bg-gradient-to-br from-slate-700 to-slate-900 hover:scale-105"
      }
      `}
    >
      <h3
        className="
        text-xl
        font-bold
        "
      >
        {title}
      </h3>

      <p
        className="
        mt-2
        text-sm
        opacity-90
        "
      >
        {questions} Questions
      </p>

      {isSelected && (
        <div
          className="
          mt-4
          inline-block
          rounded-full
          bg-white/20
          px-3
          py-1
          text-xs
          font-semibold
          "
        >
          Selected
        </div>
      )}
    </button>
  );
}