import {
  useEffect,
  useState,
} from "react";

import { api }
from "../lib/axios";

export function useJobs() {

  const [jobs,setJobs] =
    useState([]);

  const [loading,setLoading] =
    useState(true);

  useEffect(() => {

    const fetchJobs =
      async () => {

        try {

          const response =
            await api.get(
              "/api/jobs/all"
            );

          setJobs(
            response.data.jobs
          );

        } catch(error) {

          console.error(error);

        } finally {

          setLoading(false);

        }

      };

    fetchJobs();

  }, []);

  return {
    jobs,
    loading,
  };
}