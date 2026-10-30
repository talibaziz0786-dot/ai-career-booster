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
import UserWelcomeCard from "../components/dashboard/UserWelcomeCard";


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

      <main
  className="
    flex-1
    overflow-y-auto
    bg-slate-100
    dark:bg-slate-950
  "
>

    <div className="mx-auto max-w-[1700px] space-y-8 px-6 py-8 lg:px-8 xl:px-10">

  <UsageInitializer />

  <DashboardHeader name={user?.name} />

  <UserWelcomeCard />

  <AnalyticsCards />

  <UsageCard />

  <div className="grid gap-8 xl:grid-cols-2">
    <ResumeStatsChart />
    <ATSScoreCard />
  </div>

  <div className="grid gap-8 xl:grid-cols-3">
    <ProfileCompletion />
    <SubscriptionCard />
    <JobStatsCard />
  </div>

  <div className="grid gap-8 xl:grid-cols-2">
    <RecentActivity />
    <JobTrackerWidget />
  </div>

</div>

       
      </main>
    </div>
  );
}