import {
  Building2,
  MapPin,
  Briefcase,
  CalendarDays,
} from "lucide-react";

import type {
  JobItem,
} from "../../types/job/job.types";

import JobStatusBadge from "./JobStatusBadge";
import JobPriorityBadge from "./JobPriorityBadge";

interface Props {
  job: JobItem;

  onClick?(): void;
}

export default function JobCard({
  job,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
      w-full
      rounded-3xl
      border
      border-slate-200
      bg-white
      p-6
      text-left
      transition-all
      duration-300

      hover:-translate-y-1
      hover:border-cyan-400
      hover:shadow-xl

      dark:border-slate-800
      dark:bg-slate-900
      "
    >
      <div className="flex items-start justify-between">
        <div>
          <h3
            className="
            text-xl
            font-bold
            "
          >
            {job.position}
          </h3>

          <div
            className="
            mt-2
            flex
            items-center
            gap-2
            text-slate-500
            "
          >
            <Building2 size={16} />

            {job.company}
          </div>
        </div>

        <JobStatusBadge
          status={job.status}
        />
      </div>

      <div
        className="
        mt-6
        flex
        flex-wrap
        gap-4
        text-sm
        text-slate-500
        "
      >
        <span className="flex items-center gap-2">
          <MapPin size={16} />

          {job.location}
        </span>

        <span className="flex items-center gap-2">
          <Briefcase size={16} />

          {job.workMode}
        </span>

        <span className="flex items-center gap-2">
          <CalendarDays size={16} />

          {new Date(
            job.createdAt
          ).toLocaleDateString()}
        </span>
      </div>

      <div
        className="
        mt-6
        flex
        items-center
        justify-between
        "
      >
        <JobPriorityBadge
          priority={job.priority}
        />

        <span
          className="
          text-xs
          text-slate-400
          "
        >
          {job.employmentType}
        </span>
      </div>
    </button>
  );
}