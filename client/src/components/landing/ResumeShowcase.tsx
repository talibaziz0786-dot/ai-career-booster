export default function ResumeShowcase() {
  return (
    <section className="py-20 -mt-5">
      <div className="mx-auto max-w-7xl px-6 ">
        <div className="grid items-center gap-16 lg:grid-cols-2 ">
          <div >
            <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-6 py-2  text-sm text-cyan-400">
              AI Resume Builder
            </span>

            <h2
            className="
            mt-9
            ml-5
            text-5xl
            font-black
            text-slate-900
            dark:text-white
            "
          >
              Build Professional
              Resumes Faster
            </h2>

            <p
                  className="
                  mt-6
                  text-lg
                  text-slate-600
                  dark:text-slate-400
                  "
                >

              Generate recruiter-ready resumes,
              optimize ATS score and export instantly.
            </p>
          </div>

          <div className="rounded-3xl border border-black dark:border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <div className="space-y-4">
              <div className="h-6 w-40 rounded bg-cyan-700/30" />

              <div className="h-4 rounded bg-slate-400
dark:bg-slate-700" />

              <div className="h-4 rounded bg-slate-400
dark:bg-slate-700" />

              <div className="h-4 w-3/4 rounded bg-slate-400
dark:bg-slate-700" />

              <div className="mt-8 h-32 rounded bg-cyan-500/25" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}