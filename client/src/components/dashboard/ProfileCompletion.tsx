export default function ProfileCompletion() {
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
      <h3 className="font-bold text-slate-900 dark:text-white">
        Profile Completion
      </h3>

      <div className="mt-6 h-3 rounded-full bg-slate-200 dark:bg-slate-800">
        <div className="h-full w-[75%] rounded-full bg-cyan-500" />
      </div>

      <p className="mt-4 text-slate-500 dark:text-slate-400">
        75% Completed
      </p>
    </div>
  );
}