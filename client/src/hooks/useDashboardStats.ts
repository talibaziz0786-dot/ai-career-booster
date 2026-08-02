import { useFetchOnMount } from "./useFetchOnMount";

interface DashboardStats {
  totalInterviews: number;
  averageScore: number;
  strongestArea: string;
  weakestArea: string;
}

interface DashboardStatsResponse {
  stats: DashboardStats;
}

export function useDashboardStats() {
  const { data } = useFetchOnMount<
    DashboardStats,
    DashboardStatsResponse
  >(
    "/api/dashboard/stats",
    {
      totalInterviews: 0,
      averageScore: 0,
      strongestArea: "N/A",
      weakestArea: "N/A",
    },
    (payload) => payload.stats
  );

  return data;
}
