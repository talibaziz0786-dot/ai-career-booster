import {
  BriefcaseBusiness,
} from "lucide-react";

interface Props {
  onCreate(): void;
}

export default function EmptyJobState({
  onCreate,
}: Props) {
  return (
    <div
      className="
      flex
      flex-col
      items-center
      justify-center
      rounded-3xl
      border
      border-dashed
      border-slate-300
      p-16
      text-center

      dark:border-slate-700
      "
    >
      <BriefcaseBusiness
        size={64}
        className="text-cyan-500"
      />

      <h2
        className="
        mt-6
        text-2xl
        font-bold
        "
      >
        No Jobs Yet
      </h2>

      <p
        className="
        mt-3
        max-w-md
        text-slate-500
        "
      >
        Start tracking your job
        applications to stay
        organized and improve
        your hiring success.
      </p>

      <button
        onClick={onCreate}
        className="
        mt-8
        rounded-2xl
        bg-cyan-500
        px-6
        py-3
        font-bold
        text-white
        transition

        hover:bg-cyan-600
        "
      >
        Add First Job
      </button>
    </div>
  );
}