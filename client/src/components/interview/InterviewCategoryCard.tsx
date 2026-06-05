interface Props {
  title: string;
  questions: number;
}

export default function InterviewCategoryCard({
  title,
  questions,
}: Props) {
  return (
    <div
      className="
      rounded-3xl
      bg-gradient-to-br
      from-cyan-500
      to-blue-600
      p-6
      text-white
      "
    >
      <h3 className="text-xl font-bold">
        {title}
      </h3>

      <p className="mt-2">
        {questions} Questions
      </p>
    </div>
  );
}