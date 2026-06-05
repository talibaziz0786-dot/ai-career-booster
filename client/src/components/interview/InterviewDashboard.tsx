import InterviewStats from "./InterviewStats";
import InterviewCategoryCard from "./InterviewCategoryCard";
import RecentInterviewCard from "./RecentInterviewCard";
import CareerInsightsCard from "./CareerInsightsCard";

export default function InterviewDashboard() {
  return (
    <div className="space-y-8">

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
          value="24"
        />

        <InterviewStats
          title="Average Score"
          value="82%"
        />

        <InterviewStats
          title="Strong Areas"
          value="React"
        />

        <InterviewStats
          title="Weak Areas"
          value="DSA"
        />
      </div>

      <div
        className="
        grid
        gap-6

        md:grid-cols-2
        xl:grid-cols-4
        "
      >
        <InterviewCategoryCard
          title="React"
          questions={120}
        />

        <InterviewCategoryCard
          title="JavaScript"
          questions={160}
        />

        <InterviewCategoryCard
          title="HR"
          questions={90}
        />

        <InterviewCategoryCard
          title="Node.js"
          questions={130}
        />
      </div>

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