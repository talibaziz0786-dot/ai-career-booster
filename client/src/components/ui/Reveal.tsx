import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  className?: string;
}

const variants: Variants = {
  hidden: (distance: number) => ({
    opacity: 0,
    y: distance,
  }),

  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function Reveal({
  children,
  delay = 0,
  duration = 0.7,
  distance = 32,
  once = true,
  className,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={variants}
      custom={distance}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once,
        amount: 0.2,
      }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}