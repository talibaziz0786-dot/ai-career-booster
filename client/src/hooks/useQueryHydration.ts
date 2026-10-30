import {
  useEffect,
  useState,
} from "react";

import {
  useIsRestoring,
} from "@tanstack/react-query";

/* ==========================================================
   Hook
========================================================== */

export function useQueryHydration() {
  const isRestoring =
    useIsRestoring();

  const [
    hydrationComplete,
    setHydrationComplete,
  ] = useState(false);

  useEffect(() => {
    if (!isRestoring) {
      setHydrationComplete(
        true
      );
    }
  }, [
    isRestoring,
  ]);

  return {
    isHydrating:
      !hydrationComplete,

    hydrationComplete,
  };
}