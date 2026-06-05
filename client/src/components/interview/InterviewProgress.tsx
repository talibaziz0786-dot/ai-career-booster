interface Props {
  current: number;
  total: number;
}

export default function InterviewProgress({
  current,
  total,
}: Props) {
  const progress =
    (current / total) * 100;

  return (
    <div>
      <div
        className="
        mb-2
        flex
        justify-between
        "
      >
        <span>
          Progress
        </span>

        <span>
          {current}/{total}
        </span>
      </div>

      <div
        className="
        h-3
        rounded-full
        bg-slate-200
        "
      >
        <div
          style={{
            width: `${progress}%`,
          }}
          className="
          h-3
          rounded-full
          bg-cyan-500
          "
        />
      </div>
    </div>
  );
}