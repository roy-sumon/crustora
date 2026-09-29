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
  badge = "100% ARTISAN",
  className = "",
  rotateDeg = 12,
}: PeelableStickerProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative select-none cursor-pointer z-30 ${className}`}
      initial={{ rotate: rotateDeg }}
      whileHover={{ scale: 1.1, rotate: rotateDeg - 4 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => {
        setIsHovered(true);
        sounds.playPop(580);
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* SVG Filters for vinyl glossy lighting & specular shine */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id="vinylLighting" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
            <feSpecularLighting
              in="blur"
              surfaceScale="4"
              specularConstant="0.8"
              specularExponent="20"
              lightingColor="#ffffff"
              result="specOut"
            >
              <fePointLight x="80" y="40" z="180" />
            </feSpecularLighting>
            <feComposite in="specOut" in2="SourceAlpha" operator="in" result="spec" />
            <feComposite in="SourceGraphic" in2="spec" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
          </filter>
        </defs>
      </svg>

      {/* Drop shadow backing */}
      <div
        className="relative rounded-2xl p-4 bg-[#F59E0B] border-4 border-[#21110B] shadow-[0_15px_30px_rgba(33,17,11,0.35)] transition-all duration-300 overflow-hidden"
        style={{ filter: "url(#vinylLighting)" }}
      >
        {/* Holographic / Gloss shimmer stripe on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none -skew-x-12"
          animate={{ x: isHovered ? ["-100%", "200%"] : "-100%" }}
          transition={{ duration: 0.75, ease: "easeInOut" }}
        />

        {/* Peel corner fold effect */}
        <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none">
          <div className="w-full h-full bg-[#EA580C] shadow-[-2px_2px_5px_rgba(0,0,0,0.3)] transform origin-top-right rotate-45 translate-x-4 -translate-y-4 border-b border-l border-[#21110B]/30" />
        </div>

        <div className="flex flex-col items-center justify-center text-center px-3 py-1">
          <span className="bg-[#D9251D] text-[#FFFBF5] text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider mb-1 shadow-sm">
            {badge}
          </span>
          <div className="font-modak text-2xl md:text-3xl text-[#21110B] leading-none tracking-wide text-stroke-small text-[#FFFBF5]">
            {label}
          </div>
          <p className="font-mouse-memoirs text-xs md:text-sm uppercase text-[#21110B] tracking-widest mt-1">
            {sublabel}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
