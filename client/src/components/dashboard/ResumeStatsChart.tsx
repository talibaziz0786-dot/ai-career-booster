import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", score: 72 },
  { month: "Feb", score: 78 },
  { month: "Mar", score: 85 },
  { month: "Apr", score: 92 },
];

export default function ResumeStatsChart() {
  return (
    <div
      className="
      rounded-3xl
      border
      border-slate-200
      bg-white
      p-8
      shadow-lg

      dark:border-white/10
      dark:bg-white/5
    "
    >
      <h3 className="mb-8 text-xl font-bold text-slate-900 dark:text-white">
        Resume Growth
      </h3>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#06b6d4"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}