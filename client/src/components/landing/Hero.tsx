import HeroMockup from "./HeroMockup";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DemoVideoModal from "../ui/DemoVideoModal";
import { useAuthStore } from "../../store/auth-store";


export default function Hero() {
  const navigate = useNavigate();

const isAuthenticated =
  useAuthStore(
    (state) => state.isAuthenticated
  );
const [openDemo, setOpenDemo] =
  useState(false);

  return (
    <section className="relative overflow-hidden pt-44 bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[150px]" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="mx-auto max-w-7xl px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex rounded-full border border-slate-200 bg-slate-100 px-5 py-2 text-sm text-slate-700 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
        >
          🚀 AI Career Growth Platform
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white pt-8"
        >
          Land More Interviews
          <span className="block bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
            With AI
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 max-w-3xl mx-auto text-lg text-slate-600 dark:text-slate-400"
        >
          AI Resume Builder, ATS Checker, Cover Letter Generator, LinkedIn
          Optimizer, Interview Prep and Job Tracker.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-10 flex flex-col justify-center gap-4 sm:flex-row"
        >
          <button
            onClick={() => {
              if (isAuthenticated) {
                navigate("/resume-builder");
              } else {
                navigate("/register");
              }
            }}
            className="rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-white transition-all hover:scale-105 hover:bg-blue-700 active:scale-95"
          >
            Build Resume Free
          </button>

          <button
            onClick={() => setOpenDemo(true)}
            className="rounded-2xl border border-slate-300 bg-white px-8 py-4 text-slate-900 shadow-lg dark:border-white/10 dark:bg-white/5 dark:text-white transition-all hover:bg-slate-50 dark:hover:bg-white/10 hover:scale-105 active:scale-95"
          >
            Watch Demo
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
        >
          <HeroMockup />
        </motion.div>
      </motion.div>

      <DemoVideoModal open={openDemo} onClose={() => setOpenDemo(false)} />
    </section>
  );
}