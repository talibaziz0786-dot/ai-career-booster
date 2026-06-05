const jobs = [
  {
    company: "Google",
    status: "Interview",
  },
  {
    company: "Amazon",
    status: "Applied",
  },
  {
    company: "Microsoft",
    status: "Review",
  },
];

export default function JobTrackerWidget() {
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
      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
        Job Tracker
      </h3>

      <div className="mt-6 space-y-4">
        {jobs.map((job) => (
          <div
            key={job.company}
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
            <span>{job.company}</span>

            <span className="text-cyan-500">
              {job.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}