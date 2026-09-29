"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { sounds } from "./AudioEffects";

interface PeelableStickerProps {
  label?: string;
  sublabel?: string;
  badge?: string;
  className?: string;
  rotateDeg?: number;
}

export default function PeelableSticker({
  label = "CRUSTORA",
  sublabel = "72H SOURDOUGH",
  badge = "D.O.P. HEARTH",
  className = "",
  rotateDeg = 12,
}: PeelableStickerProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative select-none cursor-pointer z-30 ${className}`}
      initial={{ rotate: rotateDeg }}
      whileHover={{ scale: 1.08, rotate: rotateDeg - 3 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => {
        setIsHovered(true);
        sounds.playPop(580);
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Sticker Body with rich contrast and artisan gold cheese gradient */}
      <div className="relative rounded-3xl px-6 py-4 bg-gradient-to-br from-[#FBBF24] via-[#F59E0B] to-[#D97706] border-4 border-[#21110B] shadow-[0_15px_30px_rgba(33,17,11,0.35)] transition-all duration-300 overflow-hidden">
        {/* Holographic / Gloss shimmer stripe on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none -skew-x-12"
          animate={{ x: isHovered ? ["-100%", "200%"] : "-100%" }}
          transition={{ duration: 0.75, ease: "easeInOut" }}
        />

        {/* Peel corner fold effect */}
        <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none">
          <div className="w-full h-full bg-[#EA580C] shadow-[-2px_2px_6px_rgba(33,17,11,0.4)] transform origin-top-right rotate-45 translate-x-4 -translate-y-4 border-b-2 border-l-2 border-[#21110B]" />
        </div>

        <div className="flex flex-col items-center justify-center text-center">
          {/* High-contrast Red Pill Badge */}
          <span className="bg-[#D9251D] text-[#FFFBF5] text-xs font-modak px-3 py-1 rounded-full uppercase tracking-wider mb-2 shadow-sm border border-[#21110B] leading-none">
            {badge}
          </span>

          {/* Super Clear High-Contrast CRUSTORA Text */}
          <div className="font-modak text-3xl md:text-4xl text-[#21110B] leading-none tracking-wider drop-shadow-sm select-none">
            {label}
          </div>

          {/* High-Contrast Bold Subtitle */}
          <p className="font-mouse-memoirs text-sm md:text-base font-bold uppercase text-[#21110B] tracking-[0.25em] mt-1.5 select-none">
            {sublabel}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
