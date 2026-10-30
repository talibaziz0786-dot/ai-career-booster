import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import {
  TrendingUp,
} from "lucide-react";

import {
  useResumeAnalytics,
} from "../../hooks/useResumeAnalytics";

export default function ResumeStatsChart() {
  const {
    data = [],
    isLoading,
    isError,
  } = useResumeAnalytics();

  if (isLoading) {
    return (
      <div
        className="
        h-[420px]
        animate-pulse
        rounded-3xl
        bg-slate-200
        dark:bg-white/5
        "
      />
    );
  }

  if (isError) {
    return (
      <div
        className="
        rounded-3xl
        border
        border-red-500/20
        p-10
        text-red-500
        "
      >
        Failed to load analytics.
      </div>
    );
  }

  return (
    <section
      className="
      rounded-[32px]
      border
      border-slate-200

      bg-white

      p-8

      shadow-xl

      dark:border-white/10
      dark:bg-[#101827]
      "
    >
      <div className="mb-8 flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500">
            Resume Performance
          </p>

          <h2 className="mt-1 text-2xl font-bold dark:text-white">
            Resume Growth
          </h2>

        </div>

        <div
          className="
          flex
          h-14
          w-14
          items-center
          justify-center

          rounded-2xl

          bg-cyan-500/10

          text-cyan-500
          "
        >
          <TrendingUp />
        </div>

      </div>

      <ResponsiveContainer
        width="100%"
        height={320}
      >
        <LineChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis dataKey="month" />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="score"
            stroke="#06b6d4"
            strokeWidth={4}
            dot={{
              r: 5,
            }}
          />

        </LineChart>
      </ResponsiveContainer>

    </section>
  );
}