import { motion, AnimatePresence } from "framer-motion";

interface InterviewLoadingOverlayProps {
  open: boolean;

  title?: string;

  description?: string;
}

export default function InterviewLoadingOverlay({
  open,

  title = "AI is thinking...",

  description =
    "Generating your next interview question.",
}: InterviewLoadingOverlayProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="
          fixed
          inset-0
          z-[999]
          flex
          items-center
          justify-center
          bg-black/50
          backdrop-blur-sm
          "
        >
          <motion.div
            initial={{
              scale: 0.92,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0.92,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
            w-full
            max-w-md
            rounded-3xl
            border
            border-slate-700
            bg-slate-900
            p-8
            text-center
            shadow-2xl
            "
          >
            <div
              className="
              mx-auto
              mb-6
              h-14
              w-14
              animate-spin
              rounded-full
              border-4
              border-cyan-500
              border-t-transparent
              "
            />

            <h2
              className="
              text-xl
              font-bold
              text-white
              "
            >
              {title}
            </h2>

            <p
              className="
              mt-3
              text-sm
              text-slate-300
              "
            >
              {description}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}