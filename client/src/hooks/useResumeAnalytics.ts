import { useQuery } from "@tanstack/react-query";

import {
  getResumeAnalytics,
} from "../services/dashboard/dashboard.service";

export function useResumeAnalytics() {
  return useQuery({
    queryKey: ["resume-analytics"],

    queryFn: getResumeAnalytics,

    staleTime: 1000 * 60 * 5,
  });
}