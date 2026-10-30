import {
  useEffect,
  useState,
} from "react";

import {
  onlineManager,
} from "@tanstack/react-query";

/* ==========================================================
   Hook
========================================================== */

export function useOnlineStatus() {
  const [
    isOnline,
    setIsOnline,
  ] = useState(
    onlineManager.isOnline()
  );

  useEffect(() => {
    return onlineManager.subscribe(
      (online) => {
        setIsOnline(online);
      }
    );
  }, []);

  return isOnline;
}