"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Flame, Compass, Star } from "lucide-react";
import { sounds } from "./AudioEffects";
import AnimatedHeading from "./AnimatedHeading";

interface PizzaLayer {
  id: number;
  name: string;
  source: string;
  profile: string;
  notes: string;
  color: string;
  borderColor: string;
  icon: string;
}

const PIZZA_LAYERS: PizzaLayer[] = [
  {
    id: 5,
    name: "Hot Honey & Fresh Genovese Basil",
    source: "Calabria & Liguria, Italy",
    profile: "Spicy Wildflower Sweetness & Peppery Herbaceous Lift",
    notes: "Drizzled straight out of the 920°F stone oven to release aromatic essential oils and crackle against hot cheese.",
    color: "bg-[#EA580C]/25 text-[#EA580C]",
    borderColor: "border-[#EA580C]",
    icon: "🍯",
  },
  {
    id: 4,
    name: "Artisan Cup & Char Pepperoni",
    source: "Hand-crafted Heritage Pork",
    profile: "Crispy Smoky Grease Chalices with Fennel & Paprika",
    notes: "Natural casing shrinks rapidly under extreme flame heat, curling into deep cups that capture savory chili oils.",
    color: "bg-[#D9251D]/25 text-[#D9251D]",
    borderColor: "border-[#D9251D]",
    icon: "🍕",
  },
  {
    id: 3,
    name: "Buffalo Fior di Latte d'Agerola",
    source: "Campania, Italy",
    profile: "Silky, Milky Sweetness with Gentle Smoke Notes",
    notes: "Hand-torn curds with high moisture content to prevent browning and ensure a buttery, endless cheese pull.",
    color: "bg-[#FCD34D]/25 text-[#FCD34D]",
    borderColor: "border-[#FCD34D]",
    icon: "🧀",
  },
  {
    id: 2,
    name: "San Marzano D.O.P. Hand-Crushed Sugo",
    source: "Agro Sarnese-Nocerino Volcanic Plains",
    profile: "Intense Natural Sweetness & Balanced Mineral Acidity",
    notes: "Never cooked beforehand. Crushed cold with Mediterranean sea salt flakes and cold-pressed extra virgin olive oil.",
    color: "bg-[#DC2626]/25 text-[#DC2626]",
    borderColor: "border-[#DC2626]",
    icon: "🍅",
  },
  {
    id: 1,
    name: "72-Hour Wild Sourdough Foundation",
    source: "14-Year-Old Mother Starter · Chilled Mountain Rooms",
    profile: "Airy Honeycomb Alveoli with Crisp Leopard Spotting",
    notes: "80% hydration flour blend cold-fermented for 3 full days to naturally convert starches, producing zero bloat.",
    color: "bg-[#F59E0B]/25 text-[#F59E0B]",
    borderColor: "border-[#F59E0B]",
    icon: "🌾",
  },
];

export default function IngredientsSection() {
  const [selectedLayerId, setSelectedLayerId] = useState<number>(1);
  const [isExploded, setIsExploded] = useState<boolean>(true);

  const activeLayer = PIZZA_LAYERS.find((l) => l.id === selectedLayerId) || PIZZA_LAYERS[0];

  return (
    <section
      id="ingredients"
      className="min-h-fit w-full py-[8vw] max-md:py-[14vw] px-[4vw] bg-[#21110B] text-[#FFFBF5] relative overflow-hidden select-none"
    >
      {/* Background Ember Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[70vw] h-[40vw] bg-[#D9251D]/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center relative z-10 max-w-4xl mx-auto space-y-3">
        <p className="text-[#F59E0B] -rotate-6 text-stroke-180 w-fit mx-auto text-[3vw] max-md:text-[8vw] font-modak leading-[0.9]">
          PURE CRAFT
        </p>

        <AnimatedHeading
          className="heading300 font-modak uppercase text-[#FFFBF5] text-stroke-180 leading-[0.8] tracking-tight"
          as="h2"
        >
          EVERY LAYER PACKED WITH SIGNATURE FLAVOR
        </AnimatedHeading>

        <p className="font-mouse-memoirs text-xl md:text-3xl uppercase tracking-wider text-[#FCD34D]">
          ZERO FILLERS · 100% UNCOMPROMISED ARTISAN INTEGRITY
        </p>
      </div>

      {/* Controls: Stacked vs Exploded 3D view */}
      <div className="flex justify-center items-center gap-4 mt-8 mb-12 relative z-10">
        <button
          onClick={() => {
            sounds.playPop(420);
            setIsExploded(!isExploded);
          }}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#D9251D] hover:bg-[#F59E0B] text-[#FFFBF5] hover:text-[#21110B] font-mouse-memoirs text-xl uppercase tracking-wider transition-all shadow-[0_5px_0_#991B1B] cursor-pointer"
        >
          <Layers className="w-5 h-5" />
          <span>{isExploded ? "COLLAPSE TO STACK" : "EXPLODE 3D LAYERS"}</span>
        </button>
      </div>

      {/* Main Exploded Visualizer Layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Column: Interactive 3D Exploded Layer Stack */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-4">
          <div className="relative w-full max-w-md flex flex-col items-center gap-3">
            {PIZZA_LAYERS.map((layer, index) => {
              const isSelected = selectedLayerId === layer.id;
              return (
                <motion.div
                  key={layer.id}
                  onClick={() => {
                    sounds.playPop(450 + index * 40);
                    setSelectedLayerId(layer.id);
                  }}
                  animate={{
                    y: isExploded ? 0 : index * -20,
                    scale: isSelected ? 1.05 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 220, damping: 20 }}
                  whileHover={{ scale: 1.08 }}
                  className={`w-full p-4 rounded-2xl border-3 cursor-pointer transition-all duration-300 flex items-center justify-between ${
                    isSelected
                      ? "bg-[#FFFBF5] text-[#21110B] border-[#F59E0B] shadow-[0_10px_30px_rgba(245,158,11,0.4)]"
                      : "bg-[#2E1911] text-[#FFFBF5] border-white/20 hover:border-white/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl md:text-3xl">{layer.icon}</span>
                    <div>
                      <div className="text-xs uppercase font-bold tracking-widest opacity-60">
                        LAYER 0{layer.id}
                      </div>
                      <div className="font-modak text-lg md:text-xl leading-tight">
                        {layer.name}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                      isSelected
                        ? "bg-[#D9251D] text-white"
                        : "bg-white/10 text-white/70"
                    }`}
                  >
                    {isSelected ? "ACTIVE" : "INSPECT"}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Layer Micro-Details Panel */}
        <div className="lg:col-span-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLayer.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-[#2E1911] border-4 border-[#F59E0B] rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden"
            >
              {/* Corner Watermark */}
              <div className="absolute top-2 right-4 font-modak text-8xl text-white/5 pointer-events-none select-none">
                0{activeLayer.id}
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span className="text-3xl">{activeLayer.icon}</span>
                <span className="font-mouse-memoirs text-lg uppercase tracking-widest text-[#FCD34D]">
                  LAYER 0{activeLayer.id} SPECIFICATION
                </span>
              </div>

              <h3 className="font-modak text-3xl md:text-4xl text-[#FFFBF5] mb-4 leading-tight">
                {activeLayer.name}
              </h3>

              <div className="space-y-4 font-mouse-memoirs text-xl tracking-wide uppercase">
                {/* Provenance */}
                <div className="p-3 bg-black/30 rounded-xl border border-white/10 flex items-start gap-3">
                  <Compass className="w-5 h-5 text-[#4D9E2E] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-white/60">PROVENANCE & ORIGIN</div>
                    <div className="text-[#FFFBF5] text-lg">{activeLayer.source}</div>
                  </div>
                </div>

                {/* Flavor Profile */}
                <div className="p-3 bg-black/30 rounded-xl border border-white/10 flex items-start gap-3">
                  <Flame className="w-5 h-5 text-[#EA580C] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-white/60">TASTING DYNAMICS</div>
                    <div className="text-[#FCD34D] text-lg">{activeLayer.profile}</div>
                  </div>
                </div>

                {/* Artisan Notes */}
                <div className="p-4 bg-[#21110B] rounded-xl border border-[#F59E0B]/30">
                  <div className="flex items-center gap-1.5 text-xs text-[#F59E0B] font-bold mb-1">
                    <Star className="w-4 h-4" />
                    <span>CRAFT TECHNIQUE:</span>
                  </div>
                  <p className="text-base font-sans normal-case text-white/80 leading-relaxed">
                    {activeLayer.notes}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
