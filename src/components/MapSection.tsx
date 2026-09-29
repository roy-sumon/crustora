"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import JellyWave from "./JellyWave";
import AnimatedHeading from "./AnimatedHeading";
import AnimatedParagraph from "./AnimatedParagraph";
import { sounds } from "./AudioEffects";

interface CityInfo {
  name: string;
  country: string;
  tag: string;
  desc: string;
  img: string;
  rotate: string;
  threshold: number; // calibrated scroll progress threshold (0 to 1)
  posClass: string; // Tailwind positioning for desktop
}

const CITIES: CityInfo[] = [
  {
    name: "NAPOLI",
    country: "Italy",
    tag: "HEARTH ZERO",
    desc: "Origin stone hearth. High-heat blistered corniciones with sweet volcanic tomatoes.",
    img: "/img/cities/napoli.jpg",
    rotate: "rotate-7",
    threshold: 0.12,
    posClass: "right-[6vw] top-[46vw] items-end",
  },
  {
    name: "LONDON",
    country: "UK",
    tag: "SOHO HEARTH",
    desc: "Shoreditch craft sourdough room. Truffled wild mushrooms and smoked scamorza.",
    img: "/img/cities/london.jpg",
    rotate: "-rotate-7",
    threshold: 0.28,
    posClass: "left-[32vw] top-[64vw] items-start",
  },
  {
    name: "NEW YORK",
    country: "USA",
    tag: "BROOKLYN SLICE LAB",
    desc: "Double cup & char pepperoni chalices with raw Calabrian chili hot honey.",
    img: "/img/cities/newyork.jpg",
    rotate: "rotate-12",
    threshold: 0.48,
    posClass: "right-[18vw] top-[82vw] items-end",
  },
  {
    name: "SYDNEY",
    country: "Australia",
    tag: "BONDI OVEN",
    desc: "Beachside wood-fired sourdough pies. Smoked scamorza and garlic herb crusts.",
    img: "/img/cities/sydney.jpg",
    rotate: "-rotate-12",
    threshold: 0.68,
    posClass: "left-[15vw] top-[106vw] items-start",
  },
  {
    name: "TOKYO",
    country: "Japan",
    tag: "SHIBUYA HEARTH",
    desc: "Precision sourdough fermentation. Wagyu pepperoni and fresh yuzu blossom honey.",
    img: "/img/cities/tokyo.jpg",
    rotate: "rotate-6",
    threshold: 0.88,
    posClass: "right-[14vw] top-[132vw] items-end",
  },
];

export default function MapSection() {
  const desktopSectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);

  // Mobile refs
  const mobileSectionRef = useRef<HTMLDivElement>(null);
  const mobilePlaneRef = useRef<HTMLDivElement>(null);

  const [activeCityIndices, setActiveCityIndices] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);

  // DESKTOP: Native SVG getScreenCTM() transformation for 100% pixel-perfect line adherence!
  useEffect(() => {
    let animFrame = 0;

    const onScroll = () => {
      cancelAnimationFrame(animFrame);
      animFrame = requestAnimationFrame(() => {
        const svg = svgRef.current;
        const path = pathRef.current;
        const plane = planeRef.current;
        const desktopSection = desktopSectionRef.current;

        if (!svg || !path || !plane || !desktopSection) return;

        const rect = desktopSection.getBoundingClientRect();
        const sectionHeight = rect.height;
        const windowHeight = window.innerHeight;

        // Start flight smoothly as user enters section
        const startPoint = windowHeight * 0.25;
        const totalTravelDistance = sectionHeight - windowHeight * 0.65;
        const currentScrolled = -rect.top + startPoint;

        // Progress strictly clamped between 0 and 1
        const progress = Math.max(0, Math.min(1, currentScrolled / totalTravelDistance));

        const totalLength = path.getTotalLength();
        const pathPoint = path.getPointAtLength(progress * totalLength);

        // Transform SVG point via browser native SVG Matrix for exact screen alignment
        const ctm = path.getScreenCTM();
        if (ctm) {
          const pt = svg.createSVGPoint();
          pt.x = pathPoint.x;
          pt.y = pathPoint.y;
          const screenPt = pt.matrixTransform(ctm);

          const posX = screenPt.x - rect.left;
          const posY = screenPt.y - rect.top;

          // Next point along curve for tangent auto-rotation
          const deltaLength = 5;
          const nextPoint = path.getPointAtLength(Math.min(totalLength, progress * totalLength + deltaLength));
          const ptNext = svg.createSVGPoint();
          ptNext.x = nextPoint.x;
          ptNext.y = nextPoint.y;
          const screenPtNext = ptNext.matrixTransform(ctm);

          const dx = screenPtNext.x - screenPt.x;
          const dy = screenPtNext.y - screenPt.y;
          // Nose of plane.png points DOWN (+90deg offset from standard Cartesian 0deg)
          const angle = Math.atan2(dy, dx) * (180 / Math.PI) - 90;

          // Apply exact coordinates and tangent rotation
          plane.style.transform = `translate3d(${posX}px, ${posY}px, 0) rotate(${angle}deg) translate(-50%, -50%)`;
        }

        // Update City visibility based on calibrated thresholds
        setActiveCityIndices((prev) => {
          return CITIES.map((c, idx) => {
            if (progress >= c.threshold) {
              if (!prev[idx]) sounds.playPop(520 + idx * 30);
              return true;
            }
            return false;
          });
        });
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  // MOBILE: Vertical Plane Tracking on scroll (straight down: rotate-0)
  useEffect(() => {
    const onMobileScroll = () => {
      if (!mobileSectionRef.current || !mobilePlaneRef.current) return;
      const rect = mobileSectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalDist = rect.height - windowHeight * 0.4;
      const currentScroll = -rect.top + windowHeight * 0.3;
      const progress = Math.max(0, Math.min(1, currentScroll / totalDist));

      const planeY = progress * (rect.height - 180);
      mobilePlaneRef.current.style.transform = `translate3d(-50%, ${planeY}px, 0)`;
    };

    window.addEventListener("scroll", onMobileScroll, { passive: true });
    return () => window.removeEventListener("scroll", onMobileScroll);
  }, []);

  return (
    <>
      {/* ============================================================ */}
      {/* 1. DESKTOP MAP (Hidden on mobile: max-md:hidden)            */}
      {/* ============================================================ */}
      <section
        id="map-desktop"
        className="h-fit max-md:hidden overflow-hidden w-full bg-[#F59E0B] relative select-none"
      >
        {/* Top Jelly Wave */}
        <div className="z-[99] w-full absolute left-0 right-0 top-0 overflow-x-clip pointer-events-none">
          <JellyWave fillColor="#F6EADB" />
        </div>

        {/* Scrolling Airplane Element - Flies underneath headline text and city image cards */}
        <div
          ref={planeRef}
          className="pointer-events-none absolute left-0 top-0 w-[14vw] will-change-transform"
          style={{
            zIndex: 6,
            WebkitBackfaceVisibility: "hidden",
            backfaceVisibility: "hidden",
          }}
        >
          <img
            src="/img/plane.png"
            alt="Crustora Delivery Plane"
            draggable={false}
            className="h-full w-full object-contain drop-shadow-[0_15px_30px_rgba(33,17,11,0.5)]"
          />
        </div>

        {/* Container for SVG Flight Path and City Cards */}
        <div ref={desktopSectionRef} className="relative h-[163vw] w-full">
          {/* SVG Flight Trail matching Crav Burgers curve */}
          <div className="absolute top-0 left-0 h-full w-full pointer-events-none z-[1]">
            <svg
              ref={svgRef}
              className="h-full w-full object-cover"
              width="1728"
              height="2176"
              viewBox="0 0 1728 2176"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                ref={pathRef}
                d="M500 -139C557 -139 1550.43 364.378 1610.6 653.93C1745.6 1303.59 -160.566 551.165 -11.7069 1197.36C117.259 1757.21 1470.1 925.826 1474.12 1502.33C1478.15 2080.14 63.7084 1375.34 -11.707 1896.78C-107.419 2558.55 1928.5 2042.5 1928.5 2042.5"
                stroke="#21110B"
                strokeOpacity="0.45"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="42 42"
              />
            </svg>
          </div>

          {/* Section Headline: Sits above airplane so plane flies underneath */}
          <div className="space-y-[1.5vw] pt-[20vw] px-[4.5vw] relative z-20">
            {/* Crisp Badge */}
            <div className="inline-block bg-[#D9251D] text-[#FFFBF5] font-modak text-[2vw] px-6 py-1.5 rounded-full shadow-md -rotate-6 border-3 border-[#21110B] tracking-wide mb-1">
              TAKE AWAY & POP-UPS
            </div>

            {/* Sharp High-Contrast Animated Heading */}
            <AnimatedHeading
              className="text-[#FFFBF5] text-stroke-180 heading300 w-[80vw] leading-[0.82] tracking-tight drop-shadow-md"
              as="h2"
            >
              QUALITY THAT TRAVELS WITH YOU
            </AnimatedHeading>

            {/* Clear, Legible Paragraph */}
            <AnimatedParagraph className="text40 w-[32vw] text-[#21110B] font-mouse-memoirs leading-[1.15] uppercase tracking-wider font-semibold">
              Freshly boxed artisan pies, engineered to travel hot and stay blisteringly crisp. From our stone hearth to any corner of the globe.
            </AnimatedParagraph>
          </div>

          {/* 5 City Cards with Real Artisan Pizza Eating / Slice Photos */}
          {CITIES.map((city, idx) => {
            const isVisible = activeCityIndices[idx];
            return (
              <div
                key={city.name}
                className={`absolute ${city.posClass} space-y-[1vw] z-20 flex flex-col transition-all duration-500 cursor-pointer group`}
                style={{
                  opacity: isVisible ? 1 : 0.25,
                  transform: isVisible
                    ? "scale(1) translateY(0)"
                    : "scale(0.85) translateY(20px)",
                }}
                onClick={() => sounds.playPop(500 + idx * 40)}
              >
                {/* City Name with Bold Color */}
                <p
                  className={`text-[#D9251D] ${city.rotate} uppercase text-stroke-small text40 font-modak leading-[0.9] drop-shadow-md group-hover:scale-110 transition-transform`}
                >
                  {city.name}˝
                </p>

                {/* City Pizza Box / Card Image (100% Real Artisan Pizza!) */}
                <div className="w-[15vw] h-[19vw] rounded-[1.5vw] overflow-hidden border-4 border-[#21110B] bg-white shadow-[0_15px_30px_rgba(33,17,11,0.35)] group-hover:shadow-2xl transition-all duration-300 relative">
                  <Image
                    src={city.img}
                    alt={`${city.name} Artisan Pizza`}
                    fill
                    className="object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#21110B]/90 via-[#21110B]/20 to-transparent flex flex-col justify-end p-3 text-left">
                    <span className="font-mouse-memoirs text-xs md:text-sm text-[#FCD34D] uppercase font-bold tracking-wider">
                      {city.tag}
                    </span>
                    <span className="font-mouse-memoirs text-[11px] md:text-xs text-white/90 leading-tight">
                      {city.desc}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. MOBILE MAP (Visible on mobile: md:hidden)               */}
      {/* ============================================================ */}
      <section
        id="map-mobile"
        ref={mobileSectionRef}
        className="md:hidden overflow-hidden w-full bg-[#F59E0B] relative select-none pt-[12vw] pb-[20vw] px-[5vw]"
      >
        {/* Top Jelly Wave */}
        <div className="z-[99] w-full absolute left-0 right-0 top-0 overflow-x-clip pointer-events-none">
          <JellyWave fillColor="#F6EADB" />
        </div>

        {/* Section Headline */}
        <div className="space-y-[3vw] mt-[15vw] relative z-20 text-center">
          <div className="inline-block bg-[#D9251D] text-[#FFFBF5] font-modak text-[5vw] px-5 py-1 rounded-full shadow-md border-2 border-[#21110B] tracking-wide mb-2">
            TAKE AWAY
          </div>
          <AnimatedHeading
            className="text-[#FFFBF5] text-center w-full text-stroke-180 heading300 uppercase leading-[0.85]"
            as="h2"
          >
            QUALITY THAT TRAVELS WITH YOU
          </AnimatedHeading>
          <AnimatedParagraph className="text40 mx-auto text-center w-[85%] text-[#21110B] font-mouse-memoirs leading-[1.1] uppercase font-semibold">
            From our 920°F stone oven to your hands — engineered micro-vented boxes preserve maximum cornicione crunch.
          </AnimatedParagraph>
        </div>

        {/* Vertical Road / Dotted Trail with Traveling Plane */}
        <div className="flex flex-col relative gap-[36vw] items-center mt-[18vw] pb-[10vw]">
          {/* Vertical Dotted Line down center */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[4px] pointer-events-none z-0">
            <svg
              width="6"
              height="100%"
              viewBox="0 0 6 1000"
              className="h-full w-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M3 0 L3 1000"
                stroke="#21110B"
                strokeOpacity="0.45"
                strokeWidth="4"
                strokeDasharray="10 14"
              />
            </svg>
          </div>

          {/* Scrolling Mobile Airplane: Pointing Straight Down (rotate-0), travels underneath cards */}
          <div
            ref={mobilePlaneRef}
            className="pointer-events-none absolute left-1/2 top-0 w-[22vw] z-[5] will-change-transform"
          >
            <img
              src="/img/plane.png"
              alt="Plane"
              draggable={false}
              className="h-full w-full object-contain drop-shadow-xl"
            />
          </div>

          {/* Mobile City Cards with Real Pizza Photos */}
          {CITIES.map((city, idx) => (
            <div
              key={city.name}
              className="flex flex-col items-center space-y-[2.5vw] w-fit relative z-10 cursor-pointer"
              onClick={() => sounds.playPop(520 + idx * 30)}
            >
              <p className="uppercase text-stroke-small text-[8vw] font-modak leading-snug text-[#D9251D]">
                {city.name}
              </p>
              <div className="w-[68vw] rounded-[4vw] overflow-hidden h-[44vw] mx-auto bg-white border-4 border-[#21110B] shadow-xl relative">
                <Image
                  src={city.img}
                  alt={`${city.name} Pizza`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#21110B]/90 via-transparent to-transparent flex flex-col justify-end p-4 text-center">
                  <span className="font-mouse-memoirs text-base text-[#FCD34D] uppercase font-bold tracking-wider">
                    {city.tag}
                  </span>
                </div>
              </div>
              <p className="text-[4.2vw] w-[82%] text-[#21110B] uppercase font-mouse-memoirs leading-[1.1] text-center px-4 font-semibold">
                {city.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
