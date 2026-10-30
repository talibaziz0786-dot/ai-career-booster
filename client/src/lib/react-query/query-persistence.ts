import {
  persistQueryClient,
} from "@tanstack/react-query-persist-client";

import {
  createSyncStoragePersister,
} from "@tanstack/query-sync-storage-persister";

import {
  queryClient,
} from "./react-query";

/* ==========================================================
   Persistence Configuration
========================================================== */

const CACHE_BUSTER =
  "careerboost-ai-v1";

/*
 * Persist query cache for 24 hours.
 *
 * After 24 hours the persisted cache is considered stale
 * and will be discarded.
 */
const MAX_CACHE_AGE =
  1000 *
  60 *
  60 *
  24;

/* ==========================================================
   Storage Persister
========================================================== */

export const queryPersister =
  createSyncStoragePersister({
    storage:
      typeof window !== "undefined"
        ? window.localStorage
        : undefined,

    key:
      "careerboost-ai-query-cache",

    throttleTime:
      1000,

    serialize:
      JSON.stringify,

    deserialize:
      JSON.parse,
  });

/* ==========================================================
   Start Persistence
========================================================== */

export function setupQueryPersistence() {
  if (
    typeof window ===
    "undefined"
  ) {
    return;
  }

  persistQueryClient({
    queryClient,

    persister:
      queryPersister,

    maxAge:
      MAX_CACHE_AGE,

    buster:
      CACHE_BUSTER,
  });
}