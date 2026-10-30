import {
  FileText,
  Target,
  Briefcase,
  Mic,
  ArrowUpRight,
} from "lucide-react";

const cards = [
  {
    title: "Resumes",
    value: "12",
    change: "+24%",
    subtitle: "Generated this month",
    icon: FileText,
    color:
      "from-cyan-500 to-blue-600",
  },

  {
    title: "ATS Score",
    value: "92%",
    change: "+8%",
    subtitle: "Excellent Resume",
    icon: Target,
    color:
      "from-emerald-500 to-green-600",
  },

  {
    title: "Applications",
    value: "38",
    change: "+16%",
    subtitle: "Jobs Applied",
    icon: Briefcase,
    color:
      "from-orange-500 to-amber-500",
  },

  {
    title: "Interviews",
    value: "8",
    change: "+42%",
    subtitle: "Interview Calls",
    icon: Mic,
    color:
      "from-violet-500 to-fuchsia-600",
  },
];

export default function AnalyticsCards() {
  return (
    <section
      className="
      grid
      gap-6
      md:grid-cols-2
      xl:grid-cols-4
    "
    >
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="
            group
            relative
            overflow-hidden

            rounded-3xl

            border
            border-slate-200

            bg-white

            p-6

            shadow-sm

            transition-all
            duration-500

            hover:-translate-y-2
            hover:shadow-2xl

            dark:border-white/10
            dark:bg-white/[0.04]
            "
          >
            {/* Glow */}

            <div
              className={`
              absolute

              -right-10
              -top-10

              h-36
              w-36

              rounded-full

              bg-gradient-to-r

              ${card.color}

              opacity-10

              blur-3xl

              transition

              group-hover:opacity-30
            `}
            />

            <div className="flex items-start justify-between">

              <div>

                <p
                  className="
                  text-sm
                  font-medium

                  text-slate-500

                  dark:text-slate-400
                  "
                >
                  {card.title}
                </p>

                <h2
                  className="
                  mt-3

                  text-5xl
                  font-black

                  tracking-tight

                  text-slate-900

                  dark:text-white
                  "
                >
                  {card.value}
                </h2>

              </div>

              <div
                className={`
                flex

                h-14
                w-14

                items-center
                justify-center

                rounded-2xl

                bg-gradient-to-r

                ${card.color}

                text-white

                shadow-xl
                `}
              >
                <Icon size={26} />
              </div>

            </div>

            <div
              className="
              mt-8

              flex

              items-center

              justify-between
              "
            >
              <div>

                <div
                  className="
                  flex
                  items-center
                  gap-1

                  font-semibold

                  text-emerald-500
                  "
                >
                  <ArrowUpRight
                    size={16}
                  />

                  {card.change}
                </div>

                <p
                  className="
                  mt-1

                  text-sm

                  text-slate-500

                  dark:text-slate-400
                  "
                >
                  {card.subtitle}
                </p>

              </div>

              <div
                className="
                h-12
                w-12

                rounded-full

                border-4
                border-cyan-500
                "
              />

            </div>

          </div>
        );
      })}
    </section>
  );
}