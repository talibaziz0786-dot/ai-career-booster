import { CheckCircle2 } from "lucide-react";

const scores = [
  "Keyword Optimization",
  "ATS Formatting",
  "Job Match Analysis",
  "Resume Recommendations",
];

export default function ATSShowcase() {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between">
              <h3
                    className="
                    text-2xl
                    font-bold
                    text-slate-900
                    dark:text-white
                    "
                  >
                ATS Score Report
              </h3>

              <span className="rounded-full bg-emerald-500/20 px-4 py-2 text-emerald-400">
                96%
              </span>
            </div>

            <div className="space-y-4">
              {scores.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  
                  <span className="text-slate-700 dark:text-slate-300"
>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
              ATS Checker
            </span>

            <h2
  className="
  mt-9
  text-5xl
  font-black
  text-slate-900
  dark:text-white
  "
>
              Beat Applicant Tracking Systems
            </h2>

            <p className="mt-7 text-lg text-slate-600">
              Analyze your resume instantly and discover
              what recruiters and ATS software actually see.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}