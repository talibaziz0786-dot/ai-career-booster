import {
  WifiOff,
  Wifi,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  useOnlineStatus,
} from "../../hooks/useOnlineStatus";

/* ==========================================================
   Component
========================================================== */

export default function NetworkStatus() {
  const isOnline =
    useOnlineStatus();

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{
            y: 80,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          exit={{
            y: 80,
            opacity: 0,
          }}
          transition={{
            duration: 0.25,
          }}
          className="
            fixed
            bottom-5
            left-1/2
            z-[9999]
            flex
            -translate-x-1/2
            items-center
            gap-3
            rounded-2xl
            border
            border-amber-300
            bg-amber-50
            px-5
            py-3
            text-sm
            font-medium
            text-amber-900
            shadow-xl
            backdrop-blur-xl

            dark:border-amber-800
            dark:bg-amber-950/95
            dark:text-amber-200
          "
          role="status"
          aria-live="polite"
        >
          <WifiOff
            className="
              h-5
              w-5
              shrink-0
            "
          />

          <div>
            <p className="font-semibold">
              You're offline
            </p>

            <p className="text-xs opacity-80">
              Cached data is still available.
            </p>
          </div>
        </motion.div>
      )}

      {isOnline && (
        <motion.div
          initial={{
            y: 80,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          exit={{
            y: 80,
            opacity: 0,
          }}
          transition={{
            duration: 0.25,
          }}
          className="
            pointer-events-none
            fixed
            bottom-5
            left-1/2
            z-[9998]
            flex
            -translate-x-1/2
            items-center
            gap-2
            rounded-2xl
            border
            border-emerald-300
            bg-emerald-50
            px-4
            py-2
            text-xs
            font-medium
            text-emerald-800
            shadow-lg

            dark:border-emerald-800
            dark:bg-emerald-950/95
            dark:text-emerald-200
          "
        >
          <Wifi
            className="
              h-4
              w-4
            "
          />

          Back online
        </motion.div>
      )}
    </AnimatePresence>
  );
}