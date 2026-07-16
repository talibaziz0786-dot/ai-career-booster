import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

export default function FormSection({
  title,
  defaultOpen = false,
  children,
}: FormSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className="
      overflow-hidden
      rounded-2xl
      border
      border-slate-200
      bg-white
      shadow-sm

      dark:border-white/10
      dark:bg-slate-900
      "
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="
        flex
        w-full
        items-center
        justify-between
        px-6
        py-5
        text-left
        "
      >
        <h3
          className="
          text-lg
          font-bold
          text-slate-900

          dark:text-white
          "
        >
          {title}
        </h3>

        <motion.div
          animate={{
            rotate: open ? 180 : 0,
          }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
            }}
          >
            <div className="space-y-5 p-6">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}