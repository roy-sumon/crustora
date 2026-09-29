"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import BlobButton from "./BlobButton";
import JellyWave from "./JellyWave";
import { sounds } from "./AudioEffects";
import AnimatedHeading from "./AnimatedHeading";
import AnimatedParagraph from "./AnimatedParagraph";

interface CtaSectionProps {
  onOrderClick: () => void;
}

export default function CtaSection({ onOrderClick }: CtaSectionProps) {
  return (
    <div className="relative w-full bg-[#F6EADB]">
      {/* Top Mustard Jelly Wave connecting from Map section */}
      <JellyWave fillColor="#F59E0B" className="-mt-1" />

      <section
        id="cta"
        className="h-fit w-full pt-[4vw] pb-[12vw] max-md:pt-[8vw] max-md:pb-[20vw] px-[4vw] relative overflow-hidden select-none"
      >
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
          {/* Left Text & CTA Block */}
          <div className="w-full lg:w-1/2 flex flex-col items-start gap-4 max-md:items-center text-left max-md:text-center">
            {/* Angled Badge */}
            <motion.p
              className="text-[#D9251D] -rotate-7 uppercase text-stroke-180 font-modak leading-[0.9] text-3xl md:text-5xl drop-shadow-sm"
              whileHover={{ scale: 1.1, rotate: -12 }}
              onClick={() => sounds.playPop(580)}
            >
              FEEL IT
            </motion.p>

            {/* Headline with word-by-word spring pop */}
            <AnimatedHeading
              className="text-[#D9251D] text-stroke-180 heading300 uppercase leading-[0.78] tracking-tight"
              as="h2"
            >
              FEEL THE CRUST
            </AnimatedHeading>

            {/* Subtext with smooth reveal */}
            <AnimatedParagraph className="font-mouse-memoirs text-2xl md:text-3xl uppercase tracking-wider text-[#21110B] max-w-lg leading-snug">
              Fermented for the purists, fired for the late-night hungry. Dive into a legendary sourdough craft where every blistered honeycomb edge rules.
            </AnimatedParagraph>

            {/* Action Blob Button */}
            <div className="mt-4">
              <BlobButton onClick={onOrderClick} size="lg" variant="primary">
                ORDER YOUR PIE NOW
              </BlobButton>
            </div>
          </div>

          {/* Right Featured Card with Floating Retro Mascot */}
          <div className="w-full lg:w-1/2 relative flex items-center justify-center">
            {/* Retro Mascot Badge (Pizza Boy with Sunglasses) */}
            <motion.div
              className="absolute -top-10 -left-6 z-30 w-28 h-28 md:w-36 md:h-36 pointer-events-none drop-shadow-2xl"
              animate={{
                y: [-8, 8, -8],
                rotate: [-12, 4, -12],
              }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-full h-full rounded-full bg-[#F59E0B] border-4 border-[#21110B] p-2 flex flex-col items-center justify-center text-center shadow-xl">
                <span className="text-3xl md:text-4xl">🍕😎</span>
                <span className="font-modak text-[11px] md:text-xs text-[#21110B] uppercase mt-1">
                  CRUST BOY
                </span>
                <span className="font-mouse-memoirs text-[10px] text-[#D9251D] font-bold">
                  EST. 2026
                </span>
              </div>
            </motion.div>

            {/* Featured Artisan Pizza Card */}
            <motion.div
              whileHover={{ scale: 1.04, rotate: 1 }}
              className="relative w-full max-w-md h-80 md:h-[450px] rounded-3xl overflow-hidden border-6 border-[#21110B] shadow-[0_25px_50px_rgba(33,17,11,0.3)] bg-white group cursor-pointer"
              onClick={onOrderClick}
            >
              <Image
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80"
                alt="CRUSTORA Signature Wood Fired Pizza Experience"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#21110B]/90 via-[#21110B]/20 to-transparent flex flex-col justify-end p-6 text-left">
                <div className="bg-[#D9251D] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full w-fit mb-2">
                  LIMITED BATCH FERMENTATION
                </div>
                <h4 className="font-modak text-3xl text-[#FCD34D] leading-none mb-1">
                  THE HOLY PEPPERONI
                </h4>
                <p className="font-mouse-memoirs text-base text-white/90 uppercase tracking-wider">
                  Blistered at 920°F · Cup & Char chalices · Calabrian hot honey
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
