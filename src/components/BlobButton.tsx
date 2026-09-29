"use client";

import React from "react";
import { motion } from "framer-motion";
import { sounds } from "./AudioEffects";

interface BlobButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "mustard";
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function BlobButton({
  children,
  onClick,
  variant = "primary",
  className = "",
  size = "md",
}: BlobButtonProps) {
  const getColors = () => {
    switch (variant) {
      case "secondary":
        return { fill: "#21110B", stroke: "#F6EADB", text: "#FFFBF5" };
      case "mustard":
        return { fill: "#F59E0B", stroke: "#21110B", text: "#21110B" };
      case "primary":
      default:
        return { fill: "#D9251D", stroke: "#FFFBF5", text: "#FFFBF5" };
    }
  };

  const colors = getColors();

  const sizeClasses = {
    sm: "px-6 py-2.5 text-sm md:text-base",
    md: "px-9 py-3.5 text-lg md:text-2xl",
    lg: "px-12 py-5 text-xl md:text-3xl",
  }[size];

  return (
    <motion.button
      type="button"
      onClick={() => {
        sounds.playPop(520);
        onClick?.();
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative inline-flex items-center justify-center cursor-pointer select-none group border-none bg-transparent outline-none ${className}`}
    >
      {/* SVG Organic Blob background */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_8px_16px_rgba(33,17,11,0.22)] transition-transform duration-300 group-hover:scale-105"
        viewBox="-10 -10 602 475"
        preserveAspectRatio="none"
      >
        <path
          d="M310.777 0.20434C424.154 2.91791 540.733 50.9739 574.176 159.34C606.479 264.014 533.962 365.999 442.064 425.623C364.995 475.626 270.863 455.893 193.524 406.309C93.8313 342.395 -27.3608 259.503 5.48889 145.729C40.0621 25.9857 186.179 -2.77783 310.777 0.20434Z"
          fill={colors.fill}
          stroke={colors.stroke}
          strokeWidth="12"
          className="transition-colors duration-200"
        />
      </svg>

      {/* Sliding text label */}
      <span
        className={`relative z-10 font-bold font-mouse-memoirs uppercase tracking-wider overflow-hidden inline-block ${sizeClasses}`}
        style={{ color: colors.text }}
      >
        <span className="block transform transition-transform duration-300 group-hover:-translate-y-full">
          {children}
        </span>
        <span
          className="block absolute inset-0 flex items-center justify-center transform translate-y-full transition-transform duration-300 group-hover:translate-y-0"
          aria-hidden="true"
        >
          {children}
        </span>
      </span>
    </motion.button>
  );
}
