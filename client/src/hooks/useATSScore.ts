import { useQuery } from "@tanstack/react-query";

import {
  getATSScore,
} from "../services/dashboard/ats.service";

export function useATSScore() {
  return useQuery({
    queryKey: ["ats-score"],
    queryFn: getATSScore,
  });
}