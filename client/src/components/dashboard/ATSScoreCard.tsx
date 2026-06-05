export default function ATSScoreCard() {
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
        ATS Score
      </h3>

      <div className="mt-8 flex items-center gap-6">
        <div
          className="
          flex
          h-24
          w-24
          items-center
          justify-center
          rounded-full
          border-8
          border-emerald-500
        "
        >
          <span className="text-2xl font-bold text-emerald-500">
            92%
          </span>
        </div>

        <div>
          <p className="font-semibold text-slate-900 dark:text-white">
            Excellent Resume
          </p>

          <p className="text-slate-500 dark:text-slate-400">
            Ready for applications
          </p>
        </div>
      </div>
    </div>
  );
}