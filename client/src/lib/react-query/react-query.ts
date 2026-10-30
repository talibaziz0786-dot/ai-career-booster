import {
  QueryClient,
} from "@tanstack/react-query";

/* ==========================================================
   Query Client
========================================================== */

export const queryClient =
  new QueryClient({
    defaultOptions: {
      queries: {
        /*
         * Data remains fresh for 60 seconds.
         * During this period React Query will prefer
         * cached data instead of immediately refetching.
         */
        staleTime:
          1000 * 60,

        /*
         * Keep inactive queries in memory for 30 minutes.
         */
        gcTime:
          1000 * 60 * 30,

        /*
         * Refetch when browser reconnects.
         */
        refetchOnReconnect:
          true,

        /*
         * Background refresh when user returns
         * to the browser window.
         */
        refetchOnWindowFocus:
          true,

        /*
         * Retry failed requests.
         */
        retry: 2,

        /*
         * Small exponential retry delay.
         */
        retryDelay: (
          attemptIndex
        ) =>
          Math.min(
            1000 *
              2 **
                attemptIndex,
            30_000
          ),

        /*
         * Offline-aware query behaviour.
         *
         * The first request can use available cache,
         * while failed retries wait for connection.
         */
        networkMode:
          "offlineFirst",
      },

      mutations: {
        /*
         * Mutations also understand offline state.
         */
        networkMode:
          "offlineFirst",

        /*
         * Retry transient mutation failures.
         */
        retry: 1,

        retryDelay: 1000,
      },
    },
  });