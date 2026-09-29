"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { sounds } from "./AudioEffects";

interface HeroSectionProps {
  onOrderClick: () => void;
}

export default function HeroSection({ onOrderClick }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse Parallax for 3D Pizza Tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [16, -16]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-16, 16]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-screen max-md:min-h-[175vw] w-full relative flex flex-col justify-between items-center pt-[7vw] max-md:pt-[34vw] pb-[2.5vw] max-md:pb-[6vw] overflow-hidden select-none bg-[#F6EADB]"
    >
      {/* Subtle Retro Halftone Grain */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#21110B 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Top Banner Structure: Huge Background Title + Angled Pop Badges */}
      <div className="w-full max-w-full relative px-2 flex justify-center items-center">
        {/* Main Background Text "THE CRUST" calibrated for full responsiveness */}
        <h1 className="text-[26vw] leading-[0.78] text-center text-[#D9251D] text-stroke-180 font-mouse-memoirs max-md:text-[17vw] max-md:leading-[0.88] tracking-tight">
          <span className="sr-only">THE CRUST</span>
          <span aria-hidden="true" className="inline-flex gap-2 md:gap-4 justify-center items-center">
            <motion.span
              initial={{ scale: 0, opacity: 0, y: 35 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 260,
                damping: 15,
              }}
              className="inline-block will-change-transform"
            >
              THE
            </motion.span>
            <motion.span
              initial={{ scale: 0, opacity: 0, y: 35 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{
                delay: 0.1,
                duration: 0.5,
                type: "spring",
                stiffness: 260,
                damping: 15,
              }}
              className="inline-block will-change-transform"
            >
              CRUST
            </motion.span>
          </span>
        </h1>

        {/* Top-Left Angled Badge: WOOD-FIRED CRISPY (Calibrated for mobile) */}
        <motion.p
          className="absolute top-[8%] left-[6%] text-[#F59E0B] z-10 rotate-15 max-md:rotate-[-6deg] max-md:top-[-11vw] max-md:left-3 text-stroke-180 text-center text-[2.8vw] font-modak leading-[0.9] max-md:text-[4.5vw] cursor-pointer drop-shadow-sm"
          whileHover={{ scale: 1.15, rotate: 20 }}
          onClick={() => sounds.playCrunch()}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.25, type: "spring", stiffness: 280, damping: 15 }}
        >
          <span className="inline-block">WOOD-FIRED</span>
          <br />
          <span className="inline-block text-[#FFFBF5]">CRISPY</span>
        </motion.p>

        {/* Bottom-Right Angled Badge: BOLD FLAVOR (Calibrated for mobile) */}
        <motion.p
          className="absolute bottom-[8%] right-[6%] text-[#F59E0B] z-10 -rotate-15 max-md:rotate-[6deg] max-md:bottom-[-8vw] max-md:right-3 text-stroke-180 text-center text-[2.8vw] font-modak leading-[0.9] max-md:text-[4.5vw] cursor-pointer drop-shadow-sm"
          whileHover={{ scale: 1.15, rotate: -20 }}
          onClick={() => sounds.playSizzle()}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.35, type: "spring", stiffness: 280, damping: 15 }}
        >
          <span className="inline-block">BOLD</span>
          <br />
          <span className="inline-block text-[#FFFBF5]">FLAVOR</span>
        </motion.p>
      </div>

      {/* Floating Centerpiece: High-Def Isolated Artisan Pizza matching Crav Burger's position */}
      <div className="size-[38vw] z-20 absolute top-[56%] -translate-y-[56%] left-1/2 -translate-x-1/2 max-md:size-[72vw] max-md:top-[88vw] max-md:-translate-y-[50%] perspective-[1000px]">
        {/* Soft Ground Contact Shadow */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-14 bg-[#21110B]/30 rounded-full blur-2xl pointer-events-none" />

        {/* 3D Tilted Floating Pizza Container */}
        <motion.div
          style={{ rotateX, rotateY }}
          animate={{
            y: [-8, 8, -8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{ scale: 1.08 }}
          onClick={() => {
            sounds.playCrunch();
            onOrderClick();
          }}
          className="w-full h-full relative cursor-pointer group"
        >
          {/* Real Cut-Out High-Res Pizza with Gloss & Drop Shadow */}
          <div className="w-full h-full relative drop-shadow-[0_30px_50px_rgba(33,17,11,0.55)]">
            <Image
              src="/img/hero_pizza.png"
              alt="CRUSTORA Sizzling Artisan Pepperoni Pizza with Crispy Charred Cornicione"
              fill
              priority
              className="object-contain filter contrast-[1.08] saturate-[1.15] group-hover:rotate-3 transition-transform duration-500 ease-out"
            />
          </div>

          {/* Floating Fresh Basil Leaf */}
          <motion.div
            className="absolute -top-6 -left-4 z-30 w-14 h-14 md:w-20 md:h-20 pointer-events-none drop-shadow-xl"
            animate={{ y: [-5, 5, -5], rotate: [-10, 15, -10] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                d="M50 8 C78 26 92 64 50 94 C8 64 22 26 50 8 Z"
                fill="#4D9E2E"
                stroke="#21110B"
                strokeWidth="4"
              />
              <path d="M50 18 L50 84 M50 36 L72 50 M50 56 L28 70" stroke="#367220" strokeWidth="3" />
            </svg>
          </motion.div>

          {/* Floating Hot Chili */}
          <motion.div
            className="absolute -bottom-4 -right-4 z-30 w-12 h-12 md:w-16 md:h-16 pointer-events-none drop-shadow-xl"
            animate={{ y: [6, -6, 6], rotate: [12, -8, 12] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                d="M32 16 Q52 6 66 16 Q80 42 62 86 Q42 96 36 72 Q32 42 32 16 Z"
                fill="#D9251D"
                stroke="#21110B"
                strokeWidth="4"
              />
              <path d="M52 10 Q56 0 46 -6" stroke="#4D9E2E" strokeWidth="5" strokeLinecap="round" fill="none" />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Massive Brand Name "CRUSTORA" below pizza matching Crav Burger's "CRAV" */}
      <motion.p
        className="text-center text-[15vw] max-md:text-[16vw] font-modak uppercase mt-[16vw] relative z-20 max-md:z-20 text-stroke-180 text-[#F59E0B] translate-y-[-9vw] max-md:mt-0 max-md:absolute max-md:top-[116vw] max-md:-translate-y-1/2 tracking-wider drop-shadow-xl w-full px-2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 220, damping: 14 }}
      >
        <span className="sr-only">CRUSTORA</span>
        <span aria-hidden="true" className="inline-block will-change-transform">
          CRUSTORA
        </span>
      </motion.p>

      {/* Bottom Editorial Callouts matching Crav Burgers exactly */}
      <div className="w-full absolute bottom-0 left-0 flex justify-between px-[2.8vw] py-[2vw] max-md:static max-md:mt-[132vw] max-md:flex-col max-md:gap-[3vw] max-md:items-center max-md:px-[5vw] max-md:py-4 z-20">
        <div className="w-[24vw] max-md:w-full">
          <p className="text40 max-md:text-sm leading-none max-md:leading-snug max-md:text-center font-mouse-memoirs uppercase tracking-wide text-[#21110B]">
            Cold-fermented for 72 hours with wild sourdough mother, blasted at 920°F in stone ovens to lock in airy, blistered leopard crusts.
          </p>
        </div>

        <div className="w-[24vw] max-md:w-full">
          <p className="text40 max-md:text-sm leading-none text-right max-md:leading-snug max-md:text-center font-mouse-memoirs uppercase tracking-wide text-[#21110B]">
            Topped with crushed San Marzano D.O.P. sugo, melted fiore di latte, and our signature hot chili honey crafted for true cravings.
          </p>
        </div>
      </div>
    </section>
  );
}
