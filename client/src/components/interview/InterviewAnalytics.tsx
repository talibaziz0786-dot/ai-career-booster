import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function InterviewAnalytics({
  data,
}: any) {

  return (

    <div
      className="
      h-[400px]
      rounded-3xl
      border
      p-6
    "
    >

      <ResponsiveContainer>

        <LineChart
          data={data}
        >

          <XAxis
            dataKey="date"
          />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="overallScore"
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  );
}