import type {
  JobItem,
} from "../../types/job/job.types";

import JobCard from "./JobCard";

interface Props {
  jobs: JobItem[];

  onSelectJob?(
    job: JobItem
  ): void;
}

export default function JobList({
  jobs,
  onSelectJob,
}: Props) {
  if (!jobs.length) {
    return (
      <div
        className="
        rounded-3xl
        border
        border-dashed
        border-slate-300
        p-12
        text-center

        dark:border-slate-700
        "
      >
        <h2
          className="
          text-xl
          font-bold
          "
        >
          No Jobs Found
        </h2>

        <p
          className="
          mt-3
          text-slate-500
          "
        >
          Try changing your filters
          or create a new job.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
      grid
      gap-6
      "
    >
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          onClick={() =>
            onSelectJob?.(job)
          }
        />
      ))}
    </div>
  );
}