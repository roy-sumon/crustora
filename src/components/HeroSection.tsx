"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { sounds } from "./AudioEffects";

interface HeroSectionProps {
  onOrderClick: () => void;
  isLoaded?: boolean;
}

export default function HeroSection({ onOrderClick, isLoaded = false }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [readyToAnimate, setReadyToAnimate] = useState(false);

  // Trigger animations once preloader lifts, or after fallback delay
  useEffect(() => {
    if (isLoaded) {
      setReadyToAnimate(true);
    } else {
      const timer = setTimeout(() => setReadyToAnimate(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

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

  const word1 = ["T", "H", "E"];
  const word2 = ["C", "R", "U", "S", "T"];
  const brandLetters = ["C", "R", "U", "S", "T", "O", "R", "A"];

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
        {/* Main Background Text "THE CRUST" with Letter-by-Letter Bouncy Wave Animation */}
        <h1 className="text-[26vw] leading-[0.78] text-center text-[#D9251D] text-stroke-180 font-mouse-memoirs max-md:text-[17vw] max-md:leading-[0.88] tracking-tight">
          <span className="sr-only">THE CRUST</span>
          <span aria-hidden="true" className="inline-flex gap-3 md:gap-6 justify-center items-center">
            {/* Word: THE */}
            <span className="inline-flex gap-1 md:gap-2">
              {word1.map((char, idx) => (
                <motion.span
                  key={`the-${idx}`}
                  className="inline-block will-change-transform cursor-pointer"
                  initial={{ y: 90, opacity: 0, scale: 0.3 }}
                  animate={
                    readyToAnimate
                      ? {
                          y: [-5, 5, -5],
                          opacity: 1,
                          scale: 1,
                        }
                      : { y: 90, opacity: 0, scale: 0.3 }
                  }
                  transition={
                    readyToAnimate
                      ? {
                          opacity: { duration: 0.4, delay: 0.15 + idx * 0.08 },
                          scale: {
                            type: "spring",
                            stiffness: 300,
                            damping: 15,
                            delay: 0.15 + idx * 0.08,
                          },
                          y: {
                            repeat: Infinity,
                            duration: 3.2,
                            ease: "easeInOut",
                            delay: 0.6 + idx * 0.14,
                          },
                        }
                      : {}
                  }
                  whileHover={{
                    scale: 1.22,
                    y: -18,
                    rotate: idx % 2 === 0 ? 8 : -8,
                    color: "#F59E0B",
                    transition: { type: "spring", stiffness: 450, damping: 14 },
                  }}
                  onMouseEnter={() => sounds.playPop(460 + idx * 30)}
                >
                  {char}
                </motion.span>
              ))}
            </span>

            {/* Word: CRUST */}
            <span className="inline-flex gap-1 md:gap-2">
              {word2.map((char, idx) => {
                const globalIdx = idx + word1.length;
                return (
                  <motion.span
                    key={`crust-${idx}`}
                    className="inline-block will-change-transform cursor-pointer"
                    initial={{ y: 90, opacity: 0, scale: 0.3 }}
                    animate={
                      readyToAnimate
                        ? {
                            y: [5, -5, 5],
                            opacity: 1,
                            scale: 1,
                          }
                        : { y: 90, opacity: 0, scale: 0.3 }
                    }
                    transition={
                      readyToAnimate
                        ? {
                            opacity: { duration: 0.4, delay: 0.15 + globalIdx * 0.08 },
                            scale: {
                              type: "spring",
                              stiffness: 300,
                              damping: 15,
                              delay: 0.15 + globalIdx * 0.08,
                            },
                            y: {
                              repeat: Infinity,
                              duration: 3.4,
                              ease: "easeInOut",
                              delay: 0.6 + globalIdx * 0.14,
                            },
                          }
                        : {}
                    }
                    whileHover={{
                      scale: 1.22,
                      y: -18,
                      rotate: idx % 2 === 0 ? -8 : 8,
                      color: "#F59E0B",
                      transition: { type: "spring", stiffness: 450, damping: 14 },
                    }}
                    onMouseEnter={() => sounds.playPop(460 + globalIdx * 30)}
                  >
                    {char}
                  </motion.span>
                );
              })}
            </span>
          </span>
        </h1>

        {/* Top-Left Angled Badge: WOOD-FIRED CRISPY with Continuous Floating Wobble */}
        <motion.div
          className="absolute top-[8%] left-[6%] text-[#F59E0B] z-10 max-md:top-[-10vw] max-md:left-3 text-stroke-180 text-center text-[2.8vw] font-modak leading-[0.9] max-md:text-[4.5vw] cursor-pointer drop-shadow-md select-none"
          initial={{ scale: 0, opacity: 0, rotate: -30 }}
          animate={
            readyToAnimate
              ? {
                  scale: 1,
                  opacity: 1,
                  rotate: [12, 18, 12],
                  y: [-6, 6, -6],
                }
              : { scale: 0, opacity: 0 }
          }
          transition={
            readyToAnimate
              ? {
                  scale: { type: "spring", stiffness: 300, damping: 16, delay: 0.4 },
                  opacity: { duration: 0.35, delay: 0.4 },
                  rotate: { repeat: Infinity, duration: 4.2, ease: "easeInOut", delay: 0.8 },
                  y: { repeat: Infinity, duration: 3.8, ease: "easeInOut", delay: 0.8 },
                }
              : {}
          }
          whileHover={{ scale: 1.2, rotate: 22 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => sounds.playCrunch()}
        >
          <span className="inline-block">WOOD-FIRED</span>
          <br />
          <span className="inline-block text-[#FFFBF5]">CRISPY</span>
        </motion.div>

        {/* Bottom-Right Angled Badge: BOLD FLAVOR with Continuous Floating Wobble */}
        <motion.div
          className="absolute bottom-[8%] right-[6%] text-[#F59E0B] z-10 max-md:bottom-[-8vw] max-md:right-3 text-stroke-180 text-center text-[2.8vw] font-modak leading-[0.9] max-md:text-[4.5vw] cursor-pointer drop-shadow-md select-none"
          initial={{ scale: 0, opacity: 0, rotate: 30 }}
          animate={
            readyToAnimate
              ? {
                  scale: 1,
                  opacity: 1,
                  rotate: [-18, -12, -18],
                  y: [6, -6, 6],
                }
              : { scale: 0, opacity: 0 }
          }
          transition={
            readyToAnimate
              ? {
                  scale: { type: "spring", stiffness: 300, damping: 16, delay: 0.5 },
                  opacity: { duration: 0.35, delay: 0.5 },
                  rotate: { repeat: Infinity, duration: 4.6, ease: "easeInOut", delay: 0.9 },
                  y: { repeat: Infinity, duration: 4.2, ease: "easeInOut", delay: 0.9 },
                }
              : {}
          }
          whileHover={{ scale: 1.2, rotate: -22 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => sounds.playSizzle()}
        >
          <span className="inline-block">BOLD</span>
          <br />
          <span className="inline-block text-[#FFFBF5]">FLAVOR</span>
        </motion.div>
      </div>

      {/* Floating Centerpiece: High-Def Isolated Artisan Pizza with 3D Mouse Parallax */}
      <div className="size-[38vw] z-20 absolute top-[56%] -translate-y-[56%] left-1/2 -translate-x-1/2 max-md:size-[72vw] max-md:top-[88vw] max-md:-translate-y-[50%] perspective-[1000px]">
        {/* Soft Ground Contact Shadow */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-14 bg-[#21110B]/30 rounded-full blur-2xl pointer-events-none" />

        {/* 3D Tilted Floating Pizza Container */}
        <motion.div
          style={{ rotateX, rotateY }}
          initial={{ scale: 0.3, opacity: 0 }}
          animate={
            readyToAnimate
              ? {
                  scale: 1,
                  opacity: 1,
                  y: [-8, 8, -8],
                }
              : { scale: 0.3, opacity: 0 }
          }
          transition={
            readyToAnimate
              ? {
                  scale: { type: "spring", stiffness: 240, damping: 16, delay: 0.35 },
                  opacity: { duration: 0.4, delay: 0.35 },
                  y: { repeat: Infinity, duration: 4.2, ease: "easeInOut", delay: 0.8 },
                }
              : {}
          }
          whileHover={{ scale: 1.08 }}
          onClick={() => {
            sounds.playCrunch();
            onOrderClick();
          }}
          className="w-full h-full relative cursor-pointer group"
        >
          {/* Real Cut-Out High-Res Pizza with Drop Shadow */}
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
            animate={{ y: [-6, 6, -6], rotate: [-10, 15, -10] }}
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

      {/* Massive Brand Name "CRUSTORA" with Continuous Bouncy Letter Wave Animation */}
      <div className="text-center text-[15vw] max-md:text-[16vw] font-modak uppercase mt-[16vw] relative z-20 max-md:z-20 text-stroke-180 text-[#F59E0B] translate-y-[-9vw] max-md:mt-0 max-md:absolute max-md:top-[116vw] max-md:-translate-y-1/2 tracking-wider drop-shadow-xl w-full px-2 flex justify-center items-center gap-[0.4vw]">
        <span className="sr-only">CRUSTORA</span>
        <span aria-hidden="true" className="inline-flex justify-center items-center gap-[0.4vw]">
          {brandLetters.map((char, idx) => (
            <motion.span
              key={`crustora-${idx}`}
              className="inline-block will-change-transform cursor-pointer"
              initial={{ y: 70, opacity: 0, scale: 0.4 }}
              animate={
                readyToAnimate
                  ? {
                      y: [-7, 7, -7],
                      opacity: 1,
                      scale: 1,
                    }
                  : { y: 70, opacity: 0, scale: 0.4 }
              }
              transition={
                readyToAnimate
                  ? {
                      opacity: { duration: 0.4, delay: 0.35 + idx * 0.06 },
                      scale: {
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                        delay: 0.35 + idx * 0.06,
                      },
                      y: {
                        repeat: Infinity,
                        duration: 3,
                        ease: "easeInOut",
                        delay: 0.7 + idx * 0.12,
                      },
                    }
                  : {}
              }
              whileHover={{
                scale: 1.28,
                y: -22,
                rotate: idx % 2 === 0 ? 10 : -10,
                color: "#FFFBF5",
                transition: { type: "spring", stiffness: 450, damping: 12 },
              }}
              onMouseEnter={() => sounds.playPop(520 + idx * 28)}
            >
              {char}
            </motion.span>
          ))}
        </span>
      </div>

      {/* Bottom Editorial Callouts */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={readyToAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
        className="w-full absolute bottom-0 left-0 flex justify-between px-[2.8vw] py-[2vw] max-md:static max-md:mt-[132vw] max-md:flex-col max-md:gap-[3vw] max-md:items-center max-md:px-[5vw] max-md:py-4 z-20"
      >
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
      </motion.div>
    </section>
  );
}
