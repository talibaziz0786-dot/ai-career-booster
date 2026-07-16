import { api } from "../lib/axios";

import {
  useRecruiterStore,
} from "../store/recruiter.store";

export function useRecruiterSimulation() {

  const {

    loading,

    setLoading,

    setSimulation,

  } =
    useRecruiterStore();

  const simulateRecruiter =
    async (

      resumeAnalysis: unknown,

      interviewAnalysis: unknown,

      careerProfile: unknown

    ) => {

      try {

        setLoading(true);

        const response =
          await api.post(

            "/api/recruiter/simulate",

            {

              resumeAnalysis,

              interviewAnalysis,

              careerProfile,

            }

          );

        setSimulation(

          response.data.simulation

        );

        return response.data.simulation;

      } catch (error) {

        console.error(

          "Recruiter Simulation Error:",

          error

        );

        throw error;

      } finally {

        setLoading(false);

      }

    };

  return {

    loading,

    simulateRecruiter,

  };

}