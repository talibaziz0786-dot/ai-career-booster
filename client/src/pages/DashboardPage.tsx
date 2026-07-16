import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardHeader from "../components/dashboard/DashboardHeader";

import AnalyticsCards from "../components/dashboard/AnalyticsCards";
import ATSScoreCard from "../components/dashboard/ATSScoreCard";
import ResumeStatsChart from "../components/dashboard/ResumeStatsChart";
import RecentActivity from "../components/dashboard/RecentActivity";
import JobTrackerWidget from "../components/dashboard/JobTrackerWidget";
import ProfileCompletion from "../components/dashboard/ProfileCompletion";
import { useDashboardStore, } from "../store/dashboard-store";
import { useAuthStore } from "../store/auth-store";
import JobStatsCard from "../components/dashboard/JobStatsCard";
import SubscriptionCard
from "../components/dashboard/SubscriptionCard";
import UsageInitializer from "../components/dashboard/UsageInitializer";
import UsageCard from "../components/dashboard/UsageCard";


export default function DashboardPage() {
  const user =
    useAuthStore(
      (state) => state.user
    );

    const sidebarOpen =
  useDashboardStore(
    (state) => state.sidebarOpen
  );

const closeSidebar =
  useDashboardStore(
    (state) => state.closeSidebar
  );

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      
      <DashboardSidebar />

      {
  sidebarOpen && (
    <div
      onClick={closeSidebar}
      className="
      fixed
      inset-0
      z-40
      bg-black/40

      lg:hidden
      "
    />
  )
}

      <main className="flex-1 p-6">

        <UsageInitializer />
        <DashboardHeader name={user?.name} />

        <div className="mt-8">
          <AnalyticsCards />

<div className="mt-8">
  <UsageCard />
</div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <ResumeStatsChart />
          <ATSScoreCard />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <ProfileCompletion />

<SubscriptionCard />

<JobStatsCard />
        </div>
      </main>
    </div>
  );
}