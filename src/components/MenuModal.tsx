"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Flame, Plus, Sparkles } from "lucide-react";
import Image from "next/image";
import { PIZZA_MENU, PizzaItem } from "@/data/pizzaData";
import { sounds } from "./AudioEffects";

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (pizza: PizzaItem) => void;
}

export default function MenuModal({
  isOpen,
  onClose,
  onAddToCart,
}: MenuModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-[#21110B]/80 backdrop-blur-md cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-5xl bg-[#F6EADB] rounded-[2.5rem] border-6 border-[#21110B] shadow-[0_25px_60px_rgba(0,0,0,0.6)] overflow-hidden z-10 flex flex-col max-h-[90vh]"
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
          >
            {/* Header */}
            <div className="p-6 md:p-8 border-b-4 border-[#21110B] bg-[#FFFBF5] flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-[#D9251D] text-xs md:text-sm font-bold uppercase tracking-widest mb-1">
                  <Flame className="w-4 h-4 animate-pulse" />
                  <span>WOOD-FIRED ARTISAN SELECTION</span>
                </div>
                <h3 className="font-modak text-3xl md:text-5xl text-[#21110B] leading-none">
                  THE CRUSTORA MENU
                </h3>
              </div>

              <button
                onClick={() => {
                  sounds.playPop(350);
                  onClose();
                }}
                className="w-12 h-12 rounded-full bg-[#21110B] text-[#FFFBF5] flex items-center justify-center hover:scale-110 hover:bg-[#D9251D] transition-all cursor-pointer shadow-md"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Pizza Cards Grid */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {PIZZA_MENU.map((pizza) => (
                <div
                  key={pizza.id}
                  className="bg-white rounded-3xl border-3 border-[#21110B] p-5 shadow-[0_8px_20px_rgba(33,17,11,0.15)] flex flex-col justify-between hover:shadow-xl transition-shadow"
                >
                  <div>
                    {/* Image Header with Badge */}
                    <div className="relative h-48 rounded-2xl overflow-hidden border-2 border-[#21110B]/10 mb-4 group">
                      <Image
                        src={pizza.image}
                        alt={pizza.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-[#D9251D] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                        {pizza.badge}
                      </div>
                      <div className="absolute bottom-3 right-3 bg-[#21110B] text-[#FCD34D] font-modak text-xl px-3 py-1 rounded-full border border-white/20">
                        ${pizza.price}
                      </div>
                    </div>

                    <h4 className="font-modak text-2xl text-[#21110B] leading-tight mb-1">
                      {pizza.name}
                    </h4>

                    <p className="font-mouse-memoirs text-xs md:text-sm text-[#D9251D] uppercase font-bold tracking-wider mb-2">
                      {pizza.tagline}
                    </p>

                    <p className="text-xs md:text-sm text-[#21110B]/80 leading-relaxed mb-4">
                      {pizza.description}
                    </p>

                    {/* Ingredients chips */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {pizza.ingredients.map((ing, i) => (
                        <span
                          key={i}
                          className="text-[11px] bg-[#F6EADB] text-[#21110B] px-2 py-0.5 rounded-full font-medium"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Add to Box Button */}
                  <button
                    onClick={() => {
                      sounds.playPop(520);
                      onAddToCart(pizza);
                    }}
                    className="w-full py-3 bg-[#21110B] hover:bg-[#D9251D] text-[#FFFBF5] font-mouse-memoirs text-xl uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Plus className="w-5 h-5 text-[#FCD34D]" />
                    <span>ADD TO PIZZA BOX · ${pizza.price}</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Footer Notice */}
            <div className="p-4 bg-[#FCD34D]/50 border-t-2 border-[#21110B]/20 text-center font-mouse-memoirs text-sm md:text-base uppercase tracking-wider text-[#21110B]">
              🌾 ALL DOUGHS NATURALLY FERMENTED FOR 72 HOURS · 100% NON-GMO FLOUR · STONE BAKED
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
