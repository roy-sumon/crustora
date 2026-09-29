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
      {/* Outer Magnetic Circle */}
      <motion.div
        className="absolute rounded-full border-2 border-[#D9251D] pointer-events-none"
        animate={{
          x: mousePosition.x - (isHoveringClickable ? 24 : 14),
          y: mousePosition.y - (isHoveringClickable ? 24 : 14),
          width: isHoveringClickable ? 48 : 28,
          height: isHoveringClickable ? 48 : 28,
          scale: isHoveringClickable ? 1.2 : 1,
          backgroundColor: isHoveringClickable ? "rgba(217, 37, 29, 0.15)" : "transparent",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />

      {/* Center Focus Dot */}
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-[#D9251D]"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHoveringClickable ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 800, damping: 35 }}
      />

      {/* Trailing Pizza Slice 1: Primary Sourdough Slice 🍕 */}
      <motion.div
        style={{ x: spring1X, y: spring1Y }}
        className="absolute text-base drop-shadow-[0_2px_6px_rgba(33,17,11,0.25)] will-change-transform leading-none"
        animate={{
          x: 16,
          y: -20,
          rotate: [0, 18, -12, 0],
          scale: isHoveringClickable ? 1.35 : 1,
        }}
        transition={{
          rotate: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 0.2 },
        }}
      >
        🍕
      </motion.div>

      {/* Trailing Pizza Slice 2: Mini Secondary Slice 🍕 */}
      <motion.div
        style={{ x: spring2X, y: spring2Y }}
        className="absolute text-sm drop-shadow-[0_2px_4px_rgba(33,17,11,0.2)] will-change-transform leading-none"
        animate={{
          x: 24,
          y: 12,
          rotate: [-15, 12, -20, -15],
          scale: isHoveringClickable ? 1.25 : 0.88,
        }}
        transition={{
          rotate: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.15 },
          scale: { duration: 0.2 },
        }}
      >
        🍕
      </motion.div>

      {/* Trailing Pizza Slice 3: Tiny Artisan Slice 🍕 */}
      <motion.div
        style={{ x: spring3X, y: spring3Y }}
        className="absolute text-xs drop-shadow-[0_2px_4px_rgba(33,17,11,0.15)] will-change-transform leading-none opacity-85"
        animate={{
          x: -18,
          y: 16,
          rotate: [12, -18, 14, 12],
          scale: isHoveringClickable ? 1.2 : 0.78,
        }}
        transition={{
          rotate: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.3 },
          scale: { duration: 0.2 },
        }}
      >
        🍕
      </motion.div>
    </div>
  );
}
