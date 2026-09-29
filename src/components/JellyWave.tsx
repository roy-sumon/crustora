"use client";

import React from "react";

interface JellyWaveProps {
  fillColor?: string;
  flip?: boolean;
  className?: string;
}

export default function JellyWave({
  fillColor = "#F6EADB",
  flip = false,
  className = "",
}: JellyWaveProps) {
  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none ${
        flip ? "rotate-180" : ""
      } ${className}`}
      aria-hidden="true"
    >
      <svg
        className="block w-full h-[120px] md:h-[220px]"
        viewBox="0 0 1536 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M1536,0 H-1 V135 S184.32,65 460.8,155 S860.16,105 1121.28,137 S1413.12,105 1536,105 V0"
          fill={fillColor}
        />
      </svg>
    </div>
  );
}
