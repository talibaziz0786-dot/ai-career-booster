interface Props {
  title: string;
  value: string;
}

export default function InterviewStats({
  title,
  value,
}: Props) {
  return (
    <div
      className="
      rounded-3xl
      border
      border-white/10
      bg-white
      p-6
      shadow-lg

      dark:bg-slate-900
      "
    >
      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h3
        className="
        mt-3
        text-4xl
        font-black
        "
      >
        {value}
      </h3>
    </div>
  );
}