import { Link } from "react-router-dom";

import {
  useJobs,
} from "../../hooks/useJobs";

export default function JobStatsCard() {
  const { jobs, loading } = useJobs();

  const applied = jobs.filter((job) =>
    ["applied", "screening"].includes(job.status)
  ).length;

  const interview = jobs.filter((job) =>
    ["interview", "technical", "hr"].includes(
      job.status
    )
  ).length;

  const selected = jobs.filter((job) =>
    ["offer", "accepted"].includes(job.status)
  ).length;

  return (
    <div className="rounded-3xl border p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">
          Job Statistics
        </h2>

        <Link
          to="/jobs"
          className="text-sm font-medium text-cyan-500"
        >
          Open tracker
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-slate-500">
          Loading...
        </p>
      ) : (
        <div className="space-y-2">
          <p>Total: {jobs.length}</p>
          <p>Applied: {applied}</p>
          <p>Interview: {interview}</p>
          <p>Offers / Accepted: {selected}</p>
        </div>
      )}
    </div>
  );
}
