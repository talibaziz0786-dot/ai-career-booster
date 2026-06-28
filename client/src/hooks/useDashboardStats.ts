import {
  useEffect,
  useState,
} from "react";

import { api }
from "../lib/axios";

export function useDashboardStats() {

  const [stats, setStats] =
    useState({
      totalInterviews: 0,
      averageScore: 0,
      strongestArea: "N/A",
      weakestArea: "N/A",
    });

  useEffect(() => {

    const load =
      async () => {

        try {

          const res =
            await api.get(
              "/api/dashboard/stats"
            );

          setStats(
            res.data.stats
          );

        } catch (error) {

          console.error(error);

        }

      };

    load();

  }, []);

  return stats;
}