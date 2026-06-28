import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface Props {
  result: any;
}

export default function InterviewScoreChart({
  result,
}: Props) {
  const data = [
    {
      name: "Technical",
      score: result.technicalScore,
    },
    {
      name: "Communication",
      score: result.communicationScore,
    },
    {
      name: "Confidence",
      score: result.confidenceScore,
    },
  ];

  return (
    <div className="mt-10 rounded-3xl border p-6">
      <h2 className="mb-6 text-2xl font-bold">
        Score Breakdown
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="score" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}