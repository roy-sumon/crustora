"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { sounds } from "./AudioEffects";

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenMenuModal: () => void;
}

export default function Navbar({
  cartCount,
  onOpenCart,
  onOpenMenuModal,
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "The Craft", href: "#sensory" },
    { label: "Ingredients", href: "#ingredients" },
    { label: "World Tour", href: "#map-desktop" },
    { label: "Order Pie", href: "#cta" },
  ];

  return (
    <>
      {/* Background Dimmer when Menu is open */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[990] bg-[#D9251D]/25 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <nav className="fixed top-0 left-0 w-full z-[999] flex items-center justify-between px-[2.5vw] py-[1.2vw] max-md:px-4 max-md:py-3 transition-all">
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={() => sounds.playPop(520)}
          className="font-modak hover:scale-105 transition-all duration-300 text-[#D9251D] text-stroke-small text-[4.5vw] max-md:text-2xl xs:max-md:text-3xl leading-none drop-shadow-sm select-none tracking-tight whitespace-nowrap"
        >
          CRUSTORA
        </a>

        {/* Action Controls */}
        <div className="flex items-center gap-[1vw] max-md:gap-2">

          {/* Desktop Cart Pill (Hidden on mobile to keep top header clean & spacious) */}
          <button
            onClick={() => {
              sounds.playPop(480);
              onOpenCart();
            }}
            data-cursor-hide="true"
            className="hidden md:flex relative font-mouse-memoirs hover:scale-105 transition-all duration-300 items-center gap-1.5 text-[1.3vw] uppercase tracking-wide text-[#FFFBF5] bg-[#21110B] px-[1.4vw] py-[.5vw] rounded-full hover:bg-[#D9251D] shadow-md cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 text-[#FCD34D]" />
            <span>BOX</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 md:w-6 md:h-6 bg-[#D9251D] text-white rounded-full text-xs flex items-center justify-center font-bold border-2 border-[#FFFBF5] animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* "Pizzas" Pill with twin sliding text */}
          <button
            onClick={() => {
              sounds.playPop(460);
              onOpenMenuModal();
            }}
            data-cursor-hide="true"
            className="font-mouse-memoirs hover:scale-105 transition-all duration-300 flex items-center justify-center text-[1.3vw] max-md:text-sm uppercase tracking-wide text-[#FFFBF5] bg-[#D9251D] px-[1.6vw] py-[.5vw] max-md:px-3.5 max-md:py-1.5 group rounded-full hover:bg-[#21110B] shadow-md cursor-pointer"
          >
            <span className="overflow-hidden relative inline-block">
              <span className="block group-hover:-translate-y-full translate-y-0 transition-transform duration-300">
                Pizzas
              </span>
              <span
                className="block absolute inset-0 w-full h-full group-hover:translate-y-0 translate-y-full transition-transform duration-300"
                aria-hidden="true"
              >
                Pizzas
              </span>
            </span>
          </button>

          {/* Hamburger Menu Toggle Pill */}
          <div className="relative">
            <button
              onClick={() => {
                sounds.playPop(520);
                setIsMenuOpen(!isMenuOpen);
              }}
              data-cursor-hide="true"
              className="hover:scale-105 flex items-center gap-[.6vw] max-md:gap-1.5 px-[1.4vw] py-[.5vw] max-md:px-3 max-md:py-1.5 group rounded-full cursor-pointer transition-all duration-300 border-2 border-[#21110B]/20 bg-[#FFFBF5]/90 backdrop-blur hover:border-[#21110B]"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <span className="font-mouse-memoirs flex items-center justify-center uppercase text-[1.3vw] max-md:text-sm tracking-wide text-[#21110B]">
                <span className="overflow-hidden relative inline-block">
                  <span className="block group-hover:-translate-y-full translate-y-0 transition-transform duration-300">
                    Menu
                  </span>
                  <span
                    className="block absolute inset-0 w-full h-full group-hover:translate-y-0 translate-y-full transition-transform duration-300"
                    aria-hidden="true"
                  >
                    Menu
                  </span>
                </span>
              </span>

              {/* 3-Bar Hamburger Morph */}
              <div
                className="relative shrink-0 w-[1.2vw] h-[1.2vw] max-md:w-3.5 max-md:h-3.5 flex flex-col justify-between py-[1.5px]"
                aria-hidden="true"
              >
                <span
                  className={`bg-[#21110B] block w-full h-[2px] rounded-full transition-all duration-300 origin-center ${
                    isMenuOpen ? "rotate-45 translate-y-[4.5px]" : ""
                  }`}
                />
                <span
                  className={`bg-[#21110B] block w-[70%] h-[2px] rounded-full transition-all duration-300 ${
                    isMenuOpen ? "opacity-0 translate-x-2" : ""
                  }`}
                />
                <span
                  className={`bg-[#21110B] block w-full h-[2px] rounded-full transition-all duration-300 origin-center ${
                    isMenuOpen ? "-rotate-45 -translate-y-[4.5px]" : ""
                  }`}
                />
              </div>
            </button>

            {/* Dropdown Menu Box */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  id="main-menu"
                  role="menu"
                  className="max-md:fixed max-md:top-[64px] max-md:left-3 max-md:right-3 max-md:w-auto md:absolute md:top-[calc(100%+1vw)] md:right-0 md:w-[20vw] bg-[#D9251D] border-4 border-[#21110B] rounded-3xl p-[2vw] max-md:p-5 shadow-[0_20px_40px_rgba(33,17,11,0.35)] origin-top-right z-50"
                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <div className="flex flex-col gap-[.8vw] max-md:gap-2">
                    {menuItems.map((item, idx) => (
                      <a
                        key={idx}
                        role="menuitem"
                        href={item.href}
                        onClick={() => {
                          sounds.playPop(440 + idx * 30);
                          setIsMenuOpen(false);
                        }}
                        className="font-modak text-[2.6vw] max-md:text-2xl text-[#FFFBF5] leading-[1.1] uppercase hover:text-[#FCD34D] hover:translate-x-2 transition-all duration-200 inline-block drop-shadow-sm"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>

                  {/* Mobile Quick Action for Box & Artisan Stamp */}
                  <div className="mt-[1.5vw] max-md:mt-4 pt-[1vw] max-md:pt-3 border-t border-[#FFFBF5]/25 flex flex-col gap-2.5">
                    <button
                      onClick={() => {
                        sounds.playPop(480);
                        setIsMenuOpen(false);
                        onOpenCart();
                      }}
                      className="w-full flex items-center justify-between bg-[#21110B] text-[#FFFBF5] px-3.5 py-2.5 rounded-2xl border-2 border-[#FCD34D] hover:bg-[#381D13] transition-colors cursor-pointer"
                    >
                      <span className="font-modak text-base text-[#FCD34D] flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4 text-[#FCD34D]" />
                        VIEW YOUR PIZZA BOX
                      </span>
                      <span className="bg-[#D9251D] font-mouse-memoirs text-xs px-2.5 py-0.5 rounded-full text-white font-bold border border-[#FFFBF5]">
                        {cartCount} {cartCount === 1 ? "PIE" : "PIES"}
                      </span>
                    </button>

                    <p className="font-mouse-memoirs text-[1vw] max-md:text-xs text-[#FFFBF5]/85 uppercase tracking-[.2em] text-center">
                      Est. 2026 — Napoli to Brooklyn & Beyond
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      {/* Floating Mobile Cart Pill - Convenient thumb access without cluttering the header */}
      <motion.button
        onClick={() => {
          sounds.playPop(480);
          onOpenCart();
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isMenuOpen ? 0 : 1,
          opacity: isMenuOpen ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        whileTap={{ scale: 0.92 }}
        className="md:hidden fixed bottom-6 right-5 z-[950] flex items-center gap-2.5 bg-[#21110B] text-[#FFFBF5] border-2 border-[#FCD34D] px-4 py-2.5 rounded-full shadow-[0_12px_28px_rgba(33,17,11,0.5)] cursor-pointer group active:bg-[#381D13]"
        aria-label="Open Cart Box"
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5 text-[#FCD34D] group-hover:scale-110 transition-transform" />
          {cartCount > 0 && (
            <span className="absolute -top-2.5 -right-3 min-w-[20px] h-[20px] px-1 bg-[#D9251D] text-white rounded-full text-[11px] flex items-center justify-center font-bold border-2 border-[#21110B] shadow-sm animate-pulse">
              {cartCount}
            </span>
          )}
        </div>
        <span className="font-mouse-memoirs text-lg uppercase tracking-wider text-[#FFFBF5]">
          BOX
        </span>
      </motion.button>
    </>
  );
}
