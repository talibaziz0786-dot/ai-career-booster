import { useMemo } from "react";
import {
  ArrowRight,
  FileText,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";

import { Link } from "react-router-dom";

import { useAuthStore } from "../../store/auth-store";

export default function UserWelcomeCard() {
  const user = useAuthStore((state) => state.user);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning ☀️";
    if (hour < 18) return "Good Afternoon 🌤️";

    return "Good Evening 🌙";
  }, []);

  const today = useMemo(() => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  }, []);

  const stats = [
    {
      title: "Career Score",
      value: "92%",
    },
    {
      title: "ATS Score",
      value: "89%",
    },
    {
      title: "Resume Quality",
      value: "94%",
    },
    {
      title: "Hiring Chance",
      value: "87%",
    },
  ];

  return (
    <section
      className="
      relative
      overflow-hidden
      rounded-[32px]

      border
      border-cyan-400/20

      bg-gradient-to-br
      from-slate-950
      via-slate-900
      to-cyan-950

      p-8
      shadow-2xl
      "
    >
      <div
        className="
        absolute
        -left-24
        -top-24
        h-72
        w-72
        rounded-full
        bg-cyan-500/20
        blur-[120px]
        "
      />

      <div
        className="
        absolute
        -bottom-24
        -right-24
        h-80
        w-80
        rounded-full
        bg-blue-600/20
        blur-[140px]
        "
      />

      <div className="relative z-10">

        <div
          className="
          flex
          flex-col
          gap-10

          lg:flex-row
          lg:items-center
          lg:justify-between
          "
        >
          <div className="max-w-2xl">

            <span
              className="
              inline-flex
              items-center
              gap-2

              rounded-full

              border
              border-cyan-400/20

              bg-cyan-500/10

              px-4
              py-2

              text-sm
              font-medium

              text-cyan-300
              "
            >
              <Sparkles size={16} />

              {greeting}
            </span>

            <h1
              className="
              mt-6

              text-5xl
              font-black
              leading-tight

              text-white
              "
            >
              Welcome back,
              <br />

              <span className="text-cyan-400">
                {user?.name || "Professional"}
              </span>
            </h1>

            <p
              className="
              mt-5
              max-w-xl

              text-lg
              leading-8

              text-slate-300
              "
            >
              Build a recruiter-ready resume, practice AI interviews,
              improve ATS score and accelerate your career using AI.
            </p>

            <div
              className="
              mt-7

              flex
              flex-wrap
              items-center
              gap-4
              "
            >
              <Link
                to="/resume-builder"
                className="
                inline-flex
                items-center
                gap-2

                rounded-2xl

                bg-cyan-500

                px-6
                py-4

                font-semibold

                text-white

                transition

                hover:scale-105
                hover:bg-cyan-600
                "
              >
                Resume Builder

                <ArrowRight size={18} />
              </Link>

              <Link
                to="/interview-prep"
                className="
                inline-flex
                items-center
                gap-2

                rounded-2xl

                border
                border-white/10

                bg-white/5

                px-6
                py-4

                font-semibold

                text-white

                transition

                hover:bg-white/10
                "
              >
                AI Interview
              </Link>
            </div>

            <p
              className="
              mt-8

              text-sm

              text-slate-400
              "
            >
              {today}
            </p>

          </div>

          <div
            className="
            grid
            w-full
            max-w-xl

            grid-cols-2

            gap-5
            "
          >
            {stats.map((item) => (
              <div
                key={item.title}
                className="
                rounded-3xl

                border
                border-white/10

                bg-white/5

                p-6

                backdrop-blur-xl
                "
              >
                <p
                  className="
                  text-sm
                  text-slate-400
                  "
                >
                  {item.title}
                </p>

                <h2
                  className="
                  mt-3

                  text-4xl
                  font-black

                  text-white
                  "
                >
                  {item.value}
                </h2>
              </div>
            ))}
          </div>
        </div>

        <div
          className="
          mt-10

          grid

          gap-4

          md:grid-cols-3
          "
        >
          <div
            className="
            flex
            items-center
            gap-4

            rounded-2xl

            border
            border-white/10

            bg-white/5

            p-5
            "
          >
            <Target className="text-cyan-400" />

            <div>
              <h3 className="font-semibold text-white">
                AI Career Goal
              </h3>

              <p className="text-sm text-slate-400">
                Become a Full Stack AI Engineer
              </p>
            </div>
          </div>

          <div
            className="
            flex
            items-center
            gap-4

            rounded-2xl

            border
            border-white/10

            bg-white/5

            p-5
            "
          >
            <FileText className="text-cyan-400" />

            <div>
              <h3 className="font-semibold text-white">
                Resume
              </h3>

              <p className="text-sm text-slate-400">
                Last updated today
              </p>
            </div>
          </div>

          <div
            className="
            flex
            items-center
            gap-4

            rounded-2xl

            border
            border-white/10

            bg-white/5

            p-5
            "
          >
            <Trophy className="text-cyan-400" />

            <div>
              <h3 className="font-semibold text-white">
                AI Tip
              </h3>

              <p className="text-sm text-slate-400">
                Add measurable achievements in every project.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}