import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import { api }
from "../lib/axios";

import { getErrorMessage }
from "../utils/getErrorMessage";

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

          toast.error(
            getErrorMessage(
              error,
              "Failed to load dashboard stats"
            )
          );

        }

      };

    load();

  }, []);

  return stats;
}