import {
  Search,
} from "lucide-react";

import type {
  JobStatus,
} from "../../types/job/job.types";

interface Props {
  search: string;

  status: JobStatus | "all";

  onSearchChange(
    value: string
  ): void;

  onStatusChange(
    value: JobStatus | "all"
  ): void;
}

export default function JobFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: Props) {
  return (
    <div
      className="
      mb-8
      grid
      gap-4

      md:grid-cols-2
      "
    >
      <div className="relative">
        <Search
          size={18}
          className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-slate-400
          "
        />

        <input
          value={search}
          onChange={(e) =>
            onSearchChange(
              e.target.value
            )
          }
          placeholder="Search company or role..."
          className="
          w-full
          rounded-2xl
          border
          border-slate-300
          bg-white
          py-3
          pl-11
          pr-4

          dark:border-slate-700
          dark:bg-slate-900
          "
        />
      </div>

      <select
        aria-label="Job Status Filter"
        value={status}
        onChange={(e) =>
          onStatusChange(
            e.target
              .value as JobStatus | "all"
          )
        }
        className="
        rounded-2xl
        border
        border-slate-300
        bg-white
        px-4
        py-3

        dark:border-slate-700
        dark:bg-slate-900
        "
      >
        <option value="all">
          All Status
        </option>

        <option value="wishlist">
          Wishlist
        </option>

        <option value="applied">
          Applied
        </option>

        <option value="screening">
          Screening
        </option>

        <option value="interview">
          Interview
        </option>

        <option value="technical">
          Technical
        </option>

        <option value="hr">
          HR
        </option>

        <option value="offer">
          Offer
        </option>

        <option value="accepted">
          Accepted
        </option>

        <option value="rejected">
          Rejected
        </option>
      </select>
    </div>
  );
}