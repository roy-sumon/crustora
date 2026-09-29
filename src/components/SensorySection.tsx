"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Sparkles, Info, ShieldCheck } from "lucide-react";
import JellyWave from "./JellyWave";
import { sounds } from "./AudioEffects";
import AnimatedHeading from "./AnimatedHeading";

interface Hotspot {
  id: string;
  name: string;
  category: string;
  desc: string;
  x: number; // percentage
  y: number; // percentage
}

const PIZZA_HOTSPOTS: Hotspot[] = [
  {
    id: "crust",
    name: "72H Fermented Cornicione",
    category: "THE FOUNDATION",
    desc: "Naturally aerated with wild yeast mother. 80% hydration produces an impossibly light honeycomb crumb with blistered leopard char.",
    x: 18,
    y: 28,
  },
  {
    id: "sauce",
    name: "San Marzano D.O.P. Sugo",
    category: "VOLCANIC SWEETNESS",
    desc: "Grown in volcanic ash soil at the base of Mount Vesuvius. Crushed by hand with sea salt and fresh basil — zero added sugar.",
    x: 38,
    y: 54,
  },
  {
    id: "cheese",
    name: "Campania Fior Di Latte",
    category: "MOLTEN CHEESE",
    desc: "Whole milk buffalo curd hand-torn daily. Blasted at 920°F to form creamy, bubbling lakes of cheese that stretch for feet.",
    x: 68,
    y: 42,
  },
  {
    id: "pepperoni",
    name: "Crispy Cup & Char",
    category: "CRISPY CHALICES",
    desc: "Natural casing pepperoni that curls into crispy chalices under extreme hearth heat, collecting spicy rendered chili oil.",
    x: 52,
    y: 72,
  },
  {
    id: "honey",
    name: "Calabrian Hot Honey",
    category: "SWEET HEAT",
    desc: "Wildflower honey infused with smoky Calabrian chili flakes and aged cider vinegar. The ultimate drizzle over salty crusts.",
    x: 75,
    y: 22,
  },
];

export default function SensorySection() {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot>(PIZZA_HOTSPOTS[0]);

  return (
    <div className="relative w-full bg-[#D9251D] text-[#FFFBF5]">
      {/* Top Inverted Jelly Wave connecting from Cream Section */}
      <JellyWave fillColor="#F6EADB" className="-mt-1" />

      <section
        id="sensory"
        className="relative z-10 w-full pt-[6vw] pb-[10vw] px-[4vw] max-md:pt-[10vw] max-md:pb-[16vw] flex flex-col items-center overflow-hidden"
      >
        {/* Floating Decorative Retro Stickers */}
        {/* Sticker 1: Hot Honey Bottle */}
        <motion.div
          className="absolute top-[8vw] left-[4vw] max-md:top-[4vw] max-md:-left-[2vw] z-20 w-20 h-28 md:w-28 md:h-36 pointer-events-none drop-shadow-2xl"
          animate={{ y: [-8, 8, -8], rotate: [-8, 8, -8] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-full h-full bg-[#F59E0B] rounded-2xl border-4 border-[#21110B] p-2 flex flex-col items-center justify-between shadow-xl">
            <span className="font-modak text-xs md:text-sm text-[#21110B]">HOT HONEY</span>
            <div className="w-8 h-10 md:w-12 md:h-14 rounded-full bg-[#D9251D] flex items-center justify-center text-white font-bold text-xs">
              🌶️
            </div>
            <span className="font-mouse-memoirs text-[10px] text-[#21110B] uppercase">CALABRIA</span>
          </div>
        </motion.div>

        {/* Sticker 2: Pecorino Shaker */}
        <motion.div
          className="absolute top-[16vw] right-[5vw] max-md:top-[6vw] max-md:-right-[2vw] z-20 w-20 h-24 md:w-28 md:h-32 pointer-events-none drop-shadow-2xl"
          animate={{ y: [8, -8, 8], rotate: [6, -6, 6] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
        >
          <div className="w-full h-full bg-[#FFFBF5] rounded-2xl border-4 border-[#21110B] p-2 flex flex-col items-center justify-between shadow-xl">
            <span className="font-modak text-xs md:text-sm text-[#21110B]">PECORINO</span>
            <div className="text-xl">🧀</div>
            <span className="font-mouse-memoirs text-[10px] text-[#21110B] uppercase">AGED 24MO</span>
          </div>
        </motion.div>

        {/* Angled Badge */}
        <p className="text-[#21110B] -rotate-8 text-stroke-white text-center text-[3vw] max-md:text-[8vw] font-modak leading-[0.9] drop-shadow-md">
          EXPERIENCE
        </p>

        {/* Massive Headline with word-by-word spring pop */}
        <AnimatedHeading
          className="text-center heading300 uppercase leading-[0.78] w-full text-[#FFFBF5] text-stroke-180 relative z-20 mt-[2vw] max-md:mt-[4vw] tracking-tight"
          as="h2"
        >
          FOOD THAT FEELS GOOD
        </AnimatedHeading>

        {/* Subtitle */}
        <p className="font-mouse-memoirs text-xl md:text-3xl uppercase tracking-wider text-center text-[#FCD34D] mt-3 max-w-xl">
          TOUCH THE PIZZA HOTSPOTS BELOW TO UNLOCK ARTISAN ANATOMY
        </p>

        {/* Interactive Pizza Hotspot Explorer */}
        <div className="relative mt-[5vw] max-md:mt-[10vw] w-[88vw] max-w-4xl bg-[#21110B] border-6 border-[#FFFBF5] rounded-[3rem] p-6 md:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row items-center gap-8">
          {/* Pizza Visual with Interactive Pulse Nodes */}
          <div className="relative w-[65vw] h-[65vw] max-w-[360px] max-h-[360px] md:max-w-[420px] md:max-h-[420px] rounded-full overflow-hidden border-4 border-[#F59E0B] shadow-2xl shrink-0 group">
            <Image
              src="https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=1000&q=80"
              alt="CRUSTORA Interactive Anatomical Pizza Explorer"
              fill
              className="object-cover"
            />

            {/* Clickable Hotspot Pins */}
            {PIZZA_HOTSPOTS.map((spot) => {
              const isSelected = activeHotspot.id === spot.id;
              return (
                <button
                  key={spot.id}
                  onClick={() => {
                    sounds.playPop(560);
                    setActiveHotspot(spot);
                  }}
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer z-30 ${
                    isSelected
                      ? "bg-[#D9251D] border-3 border-white scale-125 shadow-[0_0_20px_#D9251D]"
                      : "bg-[#F59E0B] border-2 border-[#21110B] hover:scale-115"
                  }`}
                  aria-label={spot.name}
                >
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Hotspot Detail Panel */}
          <div className="flex-1 flex flex-col justify-center text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9251D] text-[#FFFBF5] text-xs font-bold uppercase tracking-widest w-fit mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>{activeHotspot.category}</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeHotspot.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="font-modak text-3xl md:text-5xl text-[#FCD34D] leading-tight mb-3">
                  {activeHotspot.name}
                </h3>
                <p className="font-mouse-memoirs text-lg md:text-2xl uppercase tracking-wide text-[#FFFBF5]/90 leading-relaxed mb-6">
                  {activeHotspot.desc}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Quick Switch Pills */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/15">
              {PIZZA_HOTSPOTS.map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => {
                    sounds.playPop(480);
                    setActiveHotspot(spot);
                  }}
                  className={`px-3 py-1.5 rounded-full font-mouse-memoirs text-sm uppercase tracking-wider transition-all cursor-pointer ${
                    activeHotspot.id === spot.id
                      ? "bg-[#FCD34D] text-[#21110B] font-bold scale-105"
                      : "bg-white/10 text-white/70 hover:bg-white/20"
                  }`}
                >
                  {spot.name.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Inverted Jelly Wave connecting into Charcoal / Dough Section */}
      <JellyWave fillColor="#21110B" flip className="-mb-1" />
    </div>
  );
}
