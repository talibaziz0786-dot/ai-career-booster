import { Link } from "react-router-dom";

import {
  useJobs,
} from "../../hooks/useJobs";

export default function JobTrackerWidget() {
  const { jobs, loading } = useJobs();

  const previewJobs = jobs.slice(0, 5);

  return (
    <div
      className="
      rounded-3xl
      border
      border-slate-200
      bg-white
      p-8
      shadow-lg

      dark:border-white/10
      dark:bg-white/5
    "
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          Job Tracker
        </h3>

        <Link
          to="/jobs"
          className="text-sm font-medium text-cyan-500"
        >
          View all
        </Link>
      </div>

      <div className="mt-6 space-y-4">
        {loading ? (
          <p className="text-sm text-slate-500">
            Loading jobs...
          </p>
        ) : previewJobs.length === 0 ? (
          <p className="text-sm text-slate-500">
            No jobs yet.{" "}
            <Link
              to="/jobs"
              className="text-cyan-500"
            >
              Add your first application
            </Link>
          </p>
        ) : (
          previewJobs.map((job) => (
            <div
              key={job.id}
              className="
              flex
              items-center
              justify-between
              rounded-xl
              bg-slate-100
              p-4

              dark:bg-slate-900
            "
            >
              <div>
                <span className="font-medium">
                  {job.company}
                </span>
                <p className="text-sm text-slate-500">
                  {job.position}
                </p>
              </div>

              <span className="capitalize text-cyan-500">
                {job.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
