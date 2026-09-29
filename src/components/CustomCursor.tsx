"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth springs for trailing ingredients
  const spring1X = useSpring(-100, { stiffness: 280, damping: 22 });
  const spring1Y = useSpring(-100, { stiffness: 280, damping: 22 });

  const spring2X = useSpring(-100, { stiffness: 220, damping: 20 });
  const spring2Y = useSpring(-100, { stiffness: 220, damping: 20 });

  const spring3X = useSpring(-100, { stiffness: 180, damping: 18 });
  const spring3Y = useSpring(-100, { stiffness: 180, damping: 18 });

  useEffect(() => {
    // Only show on devices with mouse/pointer (not touchscreens)
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      spring1X.set(e.clientX);
      spring1Y.set(e.clientY);
      spring2X.set(e.clientX);
      spring2Y.set(e.clientY);
      spring3X.set(e.clientX);
      spring3Y.set(e.clientY);

      setIsVisible(true);

      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[role='button']") ||
        target.closest(".cursor-pointer")
      ) {
        setIsHoveringClickable(true);
      } else {
        setIsHoveringClickable(false);
      }
    };

    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [spring1X, spring1Y, spring2X, spring2Y, spring3X, spring3Y]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[999999] overflow-hidden select-none">
      {/* Outer Ring */}
      <motion.div
        className="absolute rounded-full border-2 border-[#D9251D] mix-blend-difference"
        animate={{
          x: mousePosition.x - (isHoveringClickable ? 26 : 15),
          y: mousePosition.y - (isHoveringClickable ? 26 : 15),
          width: isHoveringClickable ? 52 : 30,
          height: isHoveringClickable ? 52 : 30,
          scale: isHoveringClickable ? 1.25 : 1,
          backgroundColor: isHoveringClickable ? "rgba(245, 158, 11, 0.3)" : "transparent",
        }}
        transition={{ type: "spring", stiffness: 450, damping: 28 }}
      />

      {/* Inner Center Dot */}
      <motion.div
        className="absolute w-2.5 h-2.5 rounded-full bg-[#F59E0B]"
        animate={{
          x: mousePosition.x - 5,
          y: mousePosition.y - 5,
          scale: isHoveringClickable ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 800, damping: 35 }}
      />

      {/* Trailing Mini Pizza Ingredient 1: Basil Leaf 🌿 */}
      <motion.div
        style={{ x: spring1X, y: spring1Y }}
        className="absolute text-sm drop-shadow-sm will-change-transform"
        animate={{
          x: 18,
          y: -22,
          rotate: [0, 15, -10, 0],
          scale: isHoveringClickable ? 1.4 : 1,
        }}
        transition={{
          rotate: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 0.2 },
        }}
      >
        🌿
      </motion.div>

      {/* Trailing Mini Pizza Ingredient 2: Pepperoni Slice 🍕 */}
      <motion.div
        style={{ x: spring2X, y: spring2Y }}
        className="absolute text-xs drop-shadow-sm will-change-transform"
        animate={{
          x: 24,
          y: 16,
          rotate: [-15, 10, -15],
          scale: isHoveringClickable ? 1.3 : 0.9,
        }}
        transition={{
          rotate: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 },
          scale: { duration: 0.2 },
        }}
      >
        🍕
      </motion.div>

      {/* Trailing Mini Pizza Ingredient 3: Cherry Tomato 🍅 */}
      <motion.div
        style={{ x: spring3X, y: spring3Y }}
        className="absolute text-xs drop-shadow-sm will-change-transform"
        animate={{
          x: -24,
          y: 18,
          rotate: [10, -20, 10],
          scale: isHoveringClickable ? 1.3 : 0.9,
        }}
        transition={{
          rotate: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.4 },
          scale: { duration: 0.2 },
        }}
      >
        🍅
      </motion.div>
    </div>
  );
}
