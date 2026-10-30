import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = { damping: 20, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener("mousemove", moveCursor);
    
    const handleHover = () => setIsHovering(true);
    const handleLeave = () => setIsHovering(false);

    document.querySelectorAll("button, a").forEach((el) => {
        el.addEventListener("mouseenter", handleHover);
        el.addEventListener("mouseleave", handleLeave);
    });

    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-cyan-400 mix-blend-difference"
      style={{
        width: isHovering ? 48 : 32,
        height: isHovering ? 48 : 32,
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    />
  );
}
