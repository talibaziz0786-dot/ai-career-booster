import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { X, ExternalLink, Play } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

const DEMO_VIDEO_URL = "https://www.youtube.com/embed/dQw4w9WgXcQ";

export default function DemoVideoModal({
  open,
  onClose,
}: Props) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  /*
   * Lock background scrolling while the modal is open
   * and support Escape-to-close.
   */
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="demo-video-title"
        >
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Close demo video"
            className="absolute inset-0 cursor-default bg-slate-950/80 backdrop-blur-xl"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="
              relative z-10 w-full max-w-6xl overflow-hidden
              rounded-2xl border border-white/10
              bg-slate-950/95
              shadow-[0_30px_100px_rgba(0,0,0,0.65)]
              backdrop-blur-2xl
            "
            initial={{
              opacity: 0,
              scale: 0.94,
              y: 24,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.96,
              y: 12,
            }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 28,
              mass: 0.7,
            }}
            onClick={(event) => event.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-4 sm:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-400/10">
                  <Play
                    size={17}
                    strokeWidth={2.5}
                    className="ml-0.5 text-cyan-300"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
                    Product Demo
                  </p>

                  <h2
                    id="demo-video-title"
                    className="truncate text-base font-semibold text-white sm:text-lg"
                  >
                    CareerBoost AI
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Open video externally */}
                <a
                  href={DEMO_VIDEO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open demo video in a new tab"
                  className="
                    hidden items-center gap-2 rounded-xl
                    border border-white/10 bg-white/[0.04]
                    px-3 py-2 text-xs font-medium text-slate-300
                    transition-colors duration-200
                    hover:border-white/20
                    hover:bg-white/[0.08]
                    hover:text-white
                    sm:flex
                  "
                >
                  <ExternalLink size={14} />
                  Open
                </a>

                {/* Close */}
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close demo video"
                  className="
                    flex h-10 w-10 items-center justify-center
                    rounded-xl border border-white/10
                    bg-white/[0.04]
                    text-slate-400
                    transition-all duration-200
                    hover:border-red-400/30
                    hover:bg-red-400/10
                    hover:text-red-300
                    focus:outline-none
                    focus:ring-2
                    focus:ring-cyan-400/50
                  "
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Video */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={DEMO_VIDEO_URL}
                title="CareerBoost AI product demonstration"
                loading="lazy"
                allow="
                  accelerometer;
                  autoplay;
                  clipboard-write;
                  encrypted-media;
                  gyroscope;
                  picture-in-picture;
                  web-share
                "
                allowFullScreen
              />
            </div>

            {/* Footer */}
            <div className="flex flex-col gap-2 border-t border-white/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <p className="text-xs text-slate-500">
                Explore how CareerBoost AI simplifies the job-search workflow.
              </p>

              <button
                type="button"
                onClick={onClose}
                className="
                  text-left text-xs font-medium
                  text-slate-400 transition-colors
                  hover:text-white
                  sm:text-right
                "
              >
                Press Esc to close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}