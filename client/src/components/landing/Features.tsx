import {
  FileText,
  ScanSearch,
  Briefcase,
  Network,
  MessageSquare,
  Sparkles,
} from "lucide-react";

import FadeIn from "../animations/FadeIn";

const features = [
  {
    icon: FileText,
    title: "AI Resume Builder",
    description: "Create professional ATS-friendly resumes in minutes.",
  },
  {
    icon: ScanSearch,
    title: "ATS Score Checker",
    description: "Analyze resumes and improve ATS compatibility.",
  },
  {
    icon: Sparkles,
    title: "AI Cover Letters",
    description: "Generate personalized cover letters instantly.",
  },

  {
    icon: Network,
    title: "LinkedIn Optimizer",
    description: "Improve your profile visibility and reach.",
  },
  {
    icon: MessageSquare,
    title: "Interview Prep",
    description: "Practice AI-powered interview questions.",
  },
  {
    icon: Briefcase,
    title: "Job Tracker",
    description: "Manage applications from one dashboard.",
  },
];

export default function Features() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2
            className="
  text-5xl
  font-black
  text-slate-900
  dark:text-white
  "
          >
            Everything You Need
          </h2>

          <p
            className="
  
  text-slate-600
  dark:text-slate-400
  mt-8
  "
          >
            One platform for your entire job search.
          </p>
        </div>

        <div className="mt-15 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <FadeIn>
  <div
    key={feature.title}
    className="
    group
    rounded-3xl
    border
    border-slate-200
    bg-white

    dark:border-white/10
    dark:bg-white/5

    p-8
    backdrop-blur-xl
    transition-all
    duration-300

    hover:-translate-y-2
    hover:shadow-2xl
    hover:shadow-cyan-500/10
"
  >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10">
                  <Icon className="h-7 w-7 text-cyan-400" />
                </div>

                <h3
                  className="
                          text-xl
                          font-bold
                          text-slate-900
                          dark:text-white
                          "
                >
                  {feature.title}
                </h3>

                <p
                  className="
                              mt-4
                              text-slate-600
                              dark:text-slate-400
                              "
                >
                  {feature.description}
                </p>
                </div>
</FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
