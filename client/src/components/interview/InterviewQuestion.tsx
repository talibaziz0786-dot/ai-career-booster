interface Props {
  question: string;
}

export default function InterviewQuestion({
  question,
}: Props) {
  return (
    <div
      className="
      rounded-3xl
      bg-white
      p-8
      shadow-lg

      dark:bg-slate-900
      "
    >
      <h2
        className="
        text-2xl
        font-bold
        "
      >
        {question}
      </h2>
    </div>
  );
}