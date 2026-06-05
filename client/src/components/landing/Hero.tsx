import HeroMockup from "./HeroMockup";
import { motion } from "framer-motion";


export default function Hero() {
  return (
            <section
className="
relative
overflow-hidden
pt-44

bg-gradient-to-b
from-slate-50
via-white
to-slate-100

dark:from-slate-950
dark:via-slate-950
dark:to-slate-900
"
>
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[150px]" />

        
      </div>

      <div className="mx-auto max-w-7xl px-6 text-center">
        <div className="inline-flex rounded-full border border-slate-200 bg-slate-100 px-5 py-2 text-sm text-slate-700 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
          🚀 AI Career Growth Platform
        </div>

                       <motion.h1
  initial={{
    opacity: 0,
    y: 50,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    duration: 0.8,
  }}
  className="
  text-5xl
  md:text-7xl
  font-black
  text-slate-900
  dark:text-white
  pt-8
"
>

          Land More Interviews
          <span className="block bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
            With AI
          </span>
        </motion.h1>

       <p
  className="
  mt-8
  max-w-3xl
  mx-auto

  text-lg

  text-slate-600
  dark:text-slate-400
  "
>
          AI Resume Builder, ATS Checker,
          Cover Letter Generator, LinkedIn Optimizer,
          Interview Prep and Job Tracker.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <button className="rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-white">
            Build Resume Free
          </button>

          <button className="
rounded-2xl
border
border-slate-300
bg-white
px-8
py-4
text-slate-900
shadow-lg
dark:border-white/10
dark:bg-white/5
dark:text-white
">
            Watch Demo
          </button>
        </div>

        <HeroMockup />
      </div>
    </section>
  );
}