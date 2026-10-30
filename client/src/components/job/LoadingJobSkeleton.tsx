export default function LoadingJobSkeleton() {
  return (
    <div
      className="
      animate-pulse
      rounded-3xl
      border
      border-slate-200
      bg-white
      p-6

      dark:border-slate-800
      dark:bg-slate-900
      "
    >
      <div className="h-6 w-40 rounded bg-slate-300 dark:bg-slate-700" />

      <div className="mt-4 h-4 w-64 rounded bg-slate-300 dark:bg-slate-700" />

      <div className="mt-6 flex gap-3">
        <div className="h-8 w-24 rounded-full bg-slate-300 dark:bg-slate-700" />

        <div className="h-8 w-20 rounded-full bg-slate-300 dark:bg-slate-700" />
      </div>
    </div>
  );
}