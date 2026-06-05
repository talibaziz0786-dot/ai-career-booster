const activities = [
  "Resume ATS Score Improved",
  "Applied to Frontend Developer",
  "Created New Resume",
  "Interview Scheduled",
];

export default function RecentActivity() {
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
        Recent Activity
      </h3>

      <div className="mt-6 space-y-4">
        {activities.map((item) => (
          <div
            key={item}
            className="
            rounded-xl
            bg-slate-100
            p-4

            dark:bg-slate-900
          "
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}