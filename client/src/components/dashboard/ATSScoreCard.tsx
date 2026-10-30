import {
  CheckCircle2,
  Sparkles,
  Target,
} from "lucide-react";

const metrics = [
  {
    title: "Keyword Match",
    value: 94,
    color: "bg-cyan-500",
  },
  {
    title: "Formatting",
    value: 97,
    color: "bg-emerald-500",
  },
  {
    title: "Readability",
    value: 91,
    color: "bg-violet-500",
  },
  {
    title: "Recruiter Friendly",
    value: 96,
    color: "bg-orange-500",
  },
];

export default function ATSScoreCard() {
  const score = 92;

  return (
    <section
      className="
      group
      relative
      overflow-hidden

      rounded-[30px]

      border
      border-slate-200

      bg-white

      p-8

      shadow-sm

      transition-all
      duration-500

      hover:-translate-y-1
      hover:shadow-2xl

      dark:border-white/10
      dark:bg-white/[0.04]
      "
    >
      {/* Background Glow */}

      <div
        className="
        absolute
        -right-16
        -top-16

        h-52
        w-52

        rounded-full

        bg-cyan-500/20

        blur-3xl

        transition

        group-hover:scale-125
        "
      />

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-medium text-cyan-500">
            AI Resume Analysis
          </p>

          <h2
            className="
            mt-2

            text-2xl
            font-black

            text-slate-900

            dark:text-white
            "
          >
            ATS Score
          </h2>

        </div>

        <div
          className="
          rounded-2xl

          bg-cyan-500/10

          p-3

          text-cyan-500
          "
        >
          <Target size={24} />
        </div>

      </div>

      {/* Score */}

      <div
        className="
        mt-8

        flex

        items-center

        gap-8
        "
      >
        <div className="relative">

          <div
            className="
            flex
            h-32
            w-32

            items-center
            justify-center

            rounded-full

            border-[10px]
            border-cyan-500

            bg-slate-50

            dark:bg-slate-900
            "
          >
            <div>

              <h3
                className="
                text-center

                text-4xl
                font-black

                text-cyan-500
                "
              >
                {score}%
              </h3>

              <p
                className="
                text-center
                text-xs

                text-slate-500
                "
              >
                ATS
              </p>

            </div>

          </div>

        </div>

        <div className="flex-1">

          <div className="flex items-center gap-2">

            <CheckCircle2
              size={20}
              className="text-emerald-500"
            />

            <span
              className="
              font-bold

              text-emerald-500
              "
            >
              Excellent Resume
            </span>

          </div>

          <p
            className="
            mt-3

            leading-7

            text-slate-600

            dark:text-slate-400
            "
          >
            Your resume is highly optimized
            for modern Applicant Tracking
            Systems and is recruiter-ready.
          </p>

        </div>

      </div>

      {/* Metrics */}

      <div className="mt-10 space-y-5">

        {metrics.map((item) => (

          <div key={item.title}>

            <div
              className="
              mb-2

              flex

              justify-between

              text-sm
              "
            >
              <span
                className="
                font-medium

                text-slate-700

                dark:text-slate-300
                "
              >
                {item.title}
              </span>

              <span
                className="
                font-bold

                text-slate-900

                dark:text-white
                "
              >
                {item.value}%
              </span>

            </div>

            <div
              className="
              h-3

              overflow-hidden

              rounded-full

              bg-slate-200

              dark:bg-white/10
              "
            >
              <div
                className={`${item.color} h-full rounded-full`}
                style={{
                  width: `${item.value}%`,
                }}
              />

            </div>

          </div>

        ))}

      </div>

      {/* Footer */}

      <div
        className="
        mt-10

        rounded-2xl

        border
        border-cyan-500/20

        bg-cyan-500/10

        p-5
        "
      >
        <div className="flex gap-3">

          <Sparkles
            className="mt-1 text-cyan-500"
            size={20}
          />

          <div>

            <h4
              className="
              font-bold

              text-slate-900

              dark:text-white
              "
            >
              AI Recommendation
            </h4>

            <p
              className="
              mt-2

              text-sm

              leading-6

              text-slate-600

              dark:text-slate-400
              "
            >
              Add 2–3 quantified achievements
              and role-specific keywords to
              increase your ATS score above
              96%.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}