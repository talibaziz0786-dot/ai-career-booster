import clsx from "clsx";

import type {
  JobStatus,
} from "../../types/job/job.types";

interface Props {
  status: JobStatus;
}

const statusStyles: Record<JobStatus, string> = {
  wishlist:
    "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300",

  applied:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",

  screening:
    "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",

  interview:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",

  technical:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",

  hr:
    "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",

  offer:
    "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",

  accepted:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",

  rejected:
    "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
};

export default function JobStatusBadge({
  status,
}: Props) {
  return (
    <span
      className={clsx(
        "rounded-full px-3 py-1 text-xs font-bold capitalize",
        statusStyles[status]
      )}
    >
      {status}
    </span>
  );
}