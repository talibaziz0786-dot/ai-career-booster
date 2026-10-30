import clsx from "clsx";

import type {
  JobPriority,
} from "../../types/job/job.types";

interface Props {
  priority: JobPriority;
}

const styles:
  Record<JobPriority, string> = {

  low:
    "bg-slate-200 text-slate-700",

  medium:
    "bg-yellow-100 text-yellow-700",

  high:
    "bg-red-100 text-red-700",
};

export default function JobPriorityBadge({
  priority,
}: Props) {
  return (
    <span
      className={clsx(
        "rounded-full px-3 py-1 text-xs font-semibold capitalize",
        styles[priority]
      )}
    >
      {priority}
    </span>
  );
}