import { motion, type Variants } from "framer-motion";
import clsx from "clsx";

interface GradientOrbProps {
  className?: string;
  color?: "cyan" | "blue" | "violet" | "purple" | "indigo";
  size?: "sm" | "md" | "lg" | "xl";
  blur?: "soft" | "medium" | "strong";
  opacity?: "low" | "medium" | "high";
  animated?: boolean;
  delay?: number;
}

const colorStyles = {
  cyan: "bg-cyan-400",
  blue: "bg-blue-500",
  violet: "bg-violet-500",
  purple: "bg-purple-500",
  indigo: "bg-indigo-500",
} as const;

const sizeStyles = {
  sm: "h-48 w-48",
  md: "h-72 w-72",
  lg: "h-96 w-96",
  xl: "h-[32rem] w-[32rem]",
} as const;

const blurStyles = {
  soft: "blur-[80px]",
  medium: "blur-[110px]",
  strong: "blur-[140px]",
} as const;

const opacityStyles = {
  low: "opacity-20",
  medium: "opacity-30",
  high: "opacity-40",
} as const;

const floatingAnimation: Variants = {
  animate: {
    x: [0, 24, -18, 0],
    y: [0, -20, 18, 0],
    scale: [1, 1.05, 0.98, 1],
    transition: {
      duration: 18,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function GradientOrb({
  className,
  color = "cyan",
  size = "lg",
  blur = "strong",
  opacity = "medium",
  animated = false,
  delay = 0,
}: GradientOrbProps) {
  return (
    <motion.div
      aria-hidden="true"
      className={clsx(
        "pointer-events-none absolute select-none rounded-full",
        "transform-gpu",
        colorStyles[color],
        sizeStyles[size],
        blurStyles[blur],
        opacityStyles[opacity],
        className,
      )}
      variants={floatingAnimation}
      animate={animated ? "animate" : undefined}
      initial={false}
      transition={{
        delay,
      }}
    />
  );
}