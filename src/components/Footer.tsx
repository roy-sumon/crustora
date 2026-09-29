"use client";

import React from "react";
import { motion } from "framer-motion";
import { Flame, Heart, ArrowUp } from "lucide-react";
import JellyWave from "./JellyWave";
import { sounds } from "./AudioEffects";

interface FooterProps {
  onOrderClick: () => void;
}

export default function Footer({ onOrderClick }: FooterProps) {
  const letters = ["C", "R", "U", "S", "T", "O", "R", "A"];

  const scrollToTop = () => {
    sounds.playPop(520);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-[#21110B] text-[#FFFBF5] overflow-hidden select-none">
      {/* Top Inverted Jelly Wave connecting from Dough Beige */}
      <JellyWave fillColor="#F6EADB" className="-mt-1" />

      <div className="max-w-7xl mx-auto px-6 pt-12 pb-16 relative z-10">
        {/* Live Hearth Ticker Pill */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-2.5 px-6 py-2 rounded-full bg-[#2E1911] border-2 border-[#F59E0B] text-xs md:text-sm font-bold uppercase tracking-widest text-[#FCD34D] shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4D9E2E] animate-ping" />
            <Flame className="w-4 h-4 text-[#EA580C]" />
            <span>STONE HEARTHS FIRED TO 920°F · WILD MOTHER AGE: 14 YEARS</span>
          </div>
        </div>

        {/* Massive Interactive Bouncy Letters: C R U S T O R A (calibrated so 8 letters never clip) */}
        <div className="w-full flex justify-center items-center gap-[0.8vw] md:gap-[1.5vw] py-4 my-2 px-2 overflow-visible">
          {letters.map((char, index) => (
            <motion.span
              key={index}
              whileHover={{
                scale: [1, 1.25, 0.9, 1.15, 1],
                y: -15,
                color: index % 2 === 0 ? "#FCD34D" : "#D9251D",
                transition: { duration: 0.5, ease: "easeInOut" },
              }}
              onMouseEnter={() => sounds.playPop(300 + index * 45)}
              className="font-modak text-[9.2vw] md:text-[10vw] leading-none text-[#FFFBF5] text-stroke-small cursor-pointer transition-colors duration-200 select-none inline-block drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] shrink-0"
            >
              {char}
            </motion.span>
          ))}
        </div>

        <p className="text-center font-mouse-memoirs text-xl md:text-3xl uppercase tracking-[0.25em] text-[#F59E0B] mb-12">
          BLISTERED CRUSTS · WILD SOURDOUGH · EST. 2026
        </p>

        {/* 4 Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-t border-b border-white/10 text-left font-mouse-memoirs text-lg uppercase tracking-wider">
          {/* Col 1 */}
          <div className="space-y-2">
            <div className="text-xs text-[#F59E0B] font-bold tracking-widest mb-3">
              THE PIZZAS
            </div>
            <div>
              <button
                onClick={onOrderClick}
                className="hover:text-[#FCD34D] hover:translate-x-1 transition-all cursor-pointer block"
              >
                The Holy Pepperoni
              </button>
            </div>
            <div>
              <button
                onClick={onOrderClick}
                className="hover:text-[#FCD34D] hover:translate-x-1 transition-all cursor-pointer block"
              >
                Margherita D.O.P. Oro
              </button>
            </div>
            <div>
              <button
                onClick={onOrderClick}
                className="hover:text-[#FCD34D] hover:translate-x-1 transition-all cursor-pointer block"
              >
                Truffle Mushroom Cloud
              </button>
            </div>
            <div>
              <button
                onClick={onOrderClick}
                className="hover:text-[#FCD34D] hover:translate-x-1 transition-all cursor-pointer block"
              >
                Spicy Vodka Stracciatella
              </button>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-2">
            <div className="text-xs text-[#F59E0B] font-bold tracking-widest mb-3">
              THE SOURDOUGH LAB
            </div>
            <a href="#about" className="hover:text-[#FCD34D] block hover:translate-x-1 transition-all">
              72H Cold Fermentation
            </a>
            <a href="#sensory" className="hover:text-[#FCD34D] block hover:translate-x-1 transition-all">
              80% Hydration Recipe
            </a>
            <a href="#ingredients" className="hover:text-[#FCD34D] block hover:translate-x-1 transition-all">
              Airy Honeycomb Cornicione
            </a>
            <a href="#about" className="hover:text-[#FCD34D] block hover:translate-x-1 transition-all">
              920°F Applewood Flame
            </a>
          </div>

          {/* Col 3 */}
          <div className="space-y-2">
            <div className="text-xs text-[#F59E0B] font-bold tracking-widest mb-3">
              SLICE HUBS
            </div>
            <a href="#map-desktop" className="hover:text-[#FCD34D] block hover:translate-x-1 transition-all">
              Napoli — Hearth Zero
            </a>
            <a href="#map-desktop" className="hover:text-[#FCD34D] block hover:translate-x-1 transition-all">
              New York — Williamsburg Lab
            </a>
            <a href="#map-desktop" className="hover:text-[#FCD34D] block hover:translate-x-1 transition-all">
              Tokyo — Shibuya Neon
            </a>
            <a href="#map-desktop" className="hover:text-[#FCD34D] block hover:translate-x-1 transition-all">
              London — Shoreditch Hearth
            </a>
          </div>

          {/* Col 4 */}
          <div className="space-y-2">
            <div className="text-xs text-[#F59E0B] font-bold tracking-widest mb-3">
              CRUST CLUB
            </div>
            <a href="#cta" className="hover:text-[#FCD34D] block hover:translate-x-1 transition-all">
              Private Event Catering
            </a>
            <a href="#cta" className="hover:text-[#FCD34D] block hover:translate-x-1 transition-all">
              Franchise Opportunities
            </a>
            <a href="#cta" className="hover:text-[#FCD34D] block hover:translate-x-1 transition-all">
              Hot Honey Bottles
            </a>
            <a href="#hero" className="hover:text-[#FCD34D] block hover:translate-x-1 transition-all">
              Careers & Pizzaiolos
            </a>
          </div>
        </div>

        {/* Bottom Bar with Scroll-to-top */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-white/60 font-sans gap-4 border-t border-white/10 mt-6">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
            <span>© 2026 <strong className="text-[#FFFBF5] font-semibold">CRUSTORA</strong>. All rights reserved.</span>
            <span className="hidden md:inline text-white/20">|</span>
            <span className="text-white/80 font-medium tracking-wide">
              Developed by <strong className="text-[#FCD34D] font-bold">Sumon</strong>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-white/50 text-xs tracking-wider uppercase font-mono">
              <span className="w-2 h-2 rounded-full bg-[#4D9E2E] animate-pulse" />
              Ovens Live & Fired
            </span>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#2E1911] hover:bg-[#D9251D] text-white transition-all cursor-pointer border border-white/20 font-mouse-memoirs text-base shadow-sm hover:scale-105 active:scale-95"
            >
              <span>TOP</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
