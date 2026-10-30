import {
  Briefcase,
  Clock3,
  Trophy,
  XCircle,
  CheckCircle2,
  Target,
} from "lucide-react";

import type {
  JobDashboardStats,
} from "../../types/job/job.types";

interface Props {
  stats: JobDashboardStats;
}

export default function JobStatsCards({
  stats,
}: Props) {
  const cards = [
    {
      title: "Total",
      value: stats.total,
      icon: Briefcase,
    },

    {
      title: "Applied",
      value: stats.applied,
      icon: Target,
    },

    {
      title: "Interviews",
      value: stats.interviews,
      icon: Clock3,
    },

    {
      title: "Offers",
      value: stats.offers,
      icon: Trophy,
    },

    {
      title: "Accepted",
      value: stats.accepted,
      icon: CheckCircle2,
    },

    {
      title: "Rejected",
      value: stats.rejected,
      icon: XCircle,
    },
  ];

  return (
    <div
      className="
      grid
      gap-6

      md:grid-cols-2

      xl:grid-cols-3
      "
    >
      {cards.map((card) => {
        const Icon =
          card.icon;

        return (
          <div
            key={card.title}
            className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-6

            transition-all

            hover:-translate-y-1
            hover:shadow-lg

            dark:border-slate-800
            dark:bg-slate-900
            "
          >
            <div
              className="
              flex
              items-center
              justify-between
              "
            >
              <div>
                <p
                  className="
                  text-sm
                  text-slate-500
                  "
                >
                  {card.title}
                </p>

                <h2
                  className="
                  mt-2
                  text-3xl
                  font-black
                  "
                >
                  {card.value}
                </h2>
              </div>

              <div
                className="
                rounded-2xl
                bg-cyan-100
                p-3

                dark:bg-cyan-900/30
                "
              >
                <Icon
                  size={28}
                  className="
                  text-cyan-500
                  "
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}