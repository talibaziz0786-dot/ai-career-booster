import InterviewStats from "./InterviewStats";
import RecentInterviewCard from "./RecentInterviewCard";
import CareerInsightsCard from "./CareerInsightsCard";
import ResumeSkillsCard from "./ResumeSkillsCard";

import {
  useDashboardStats,
} from "../../hooks/useDashboardStats";

export default function InterviewDashboard() {

  const stats =
    useDashboardStats();

  return (
    <div className="space-y-8">

      {/* Stats */}
      <div
        className="
        grid
        gap-6
        md:grid-cols-2
        xl:grid-cols-4
        "
      >
        <InterviewStats
          title="Total Interviews"
          value={
            stats.totalInterviews.toString()
          }
        />

        <InterviewStats
          title="Average Score"
          value={
            `${stats.averageScore}%`
          }
        />

        <InterviewStats
          title="Strong Area"
          value={
            stats.strongestArea
          }
        />

        <InterviewStats
          title="Weak Area"
          value={
            stats.weakestArea
          }
        />
      </div>

      {/* Resume Skills */}
      <ResumeSkillsCard />

      {/* Bottom Cards */}
      <div
        className="
        grid
        gap-6
        lg:grid-cols-2
        "
      >
        <RecentInterviewCard />

        <CareerInsightsCard />
      </div>

    </div>
  );
}