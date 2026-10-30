import { motion, useMotionValue, useSpring } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";

interface MagneticGridProps {
  children: ReactNode;
  strength?: number;
  radius?: number;
  scale?: number;
  disabled?: boolean;
  className?: string;
}

export default function MagneticGrid({
  children,
  strength = 0.25,
  radius = 120,
  scale = 1.04,
  disabled = false,
  className = "",
}: MagneticGridProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 420,
    damping: 26,
    mass: 0.35,
  });

  const springY = useSpring(y, {
    stiffness: 420,
    damping: 26,
    mass: 0.35,
  });

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (disabled) return;

    const rect = event.currentTarget.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = event.clientX - centerX;
    const distanceY = event.clientY - centerY;

    const distance = Math.sqrt(
      distanceX * distanceX + distanceY * distanceY,
    );

    if (distance > radius) {
      x.set(0);
      y.set(0);
      return;
    }

    const intensity = Math.max(0, 1 - distance / radius);

    x.set(distanceX * strength * intensity);
    y.set(distanceY * strength * intensity);
  };

  const resetPosition = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={`relative inline-block ${className}`}
      style={{
        x: springX,
        y: springY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetPosition}
      whileHover={
        disabled
          ? undefined
          : {
              scale,
            }
      }
      whileTap={
        disabled
          ? undefined
          : {
              scale: 0.97,
            }
      }
      transition={{
        scale: {
          type: "spring",
          stiffness: 500,
          damping: 24,
          mass: 0.3,
        },
      }}
    >
      {children}
    </motion.div>
  );
}