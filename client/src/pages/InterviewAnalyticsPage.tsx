import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import InterviewAnalytics from "../components/interview/InterviewAnalytics";

export default function InterviewAnalyticsPage() {

  const [sessions, setSessions] =
    useState([]);

  useEffect(() => {

    const fetchData = async () => {

      const response =
        await api.get(
          "/api/interview-session/my-history"
        );

      setSessions(
        response.data.sessions
      );
    };

    fetchData();

  }, []);

  const chartData =
    sessions.map(
      (session: any) => ({
        date:
          new Date(
            session.createdAt
          ).toLocaleDateString(),

        overallScore:
          session.overallScore,
      })
    );

  return (
    <div className="max-w-7xl mx-auto p-8">

      <h1
        className="
        text-5xl
        font-black
        mb-8
      "
      >
        Analytics Dashboard
      </h1>

      <InterviewAnalytics
        data={chartData}
      />

    </div>
  );
}