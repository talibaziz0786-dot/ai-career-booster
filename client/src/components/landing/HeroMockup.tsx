
import { motion } from "framer-motion";

export default function HeroMockup() {
  return (
    <motion.div
  initial={{
    opacity: 0,
    scale: 0.9,
  }}
  animate={{
    opacity: 1,
    scale: 1,
  }}
  transition={{
    duration: 0.8,
    delay: 0.4,
  }}
  className="mx-auto mt-16 max-w-5xl"
>
      <div
        className="
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-2xl
            mb-18
         
        dark:border-white/10
        dark:bg-slate-900/80
        "
      >
        <div className="flex items-center gap-2 border-b border-slate-200 px-6 py-4 dark:border-white/10">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>

        <div className="grid gap-6 p-8 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-100 p-6 dark:bg-slate-100
dark:bg-slate-800">
            <h3 className="text-sm text-slate-500 dark:text-slate-400">
              Resume Score
            </h3>

            <p className="mt-3 text-4xl font-bold text-emerald-500">
              92%
            </p>
          </div>

          <div className="rounded-2xl bg-slate-100 p-6 dark:bg-slate-100
dark:bg-slate-800">
            <h3 className="text-sm text-slate-500 dark:text-slate-400">
              ATS Compatibility
            </h3>

            <p className="mt-3 text-4xl font-bold text-cyan-500">
              98%
            </p>
          </div>

          <div className="rounded-2xl bg-slate-100 p-6 dark:bg-slate-100
dark:bg-slate-800">
            <h3 className="text-sm text-slate-500 dark:text-slate-400">
              Cover Letter
            </h3>

            <p className="mt-3 text-lg font-semibold text-violet-500">
              Generated
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}