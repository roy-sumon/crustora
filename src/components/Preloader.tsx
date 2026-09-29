"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("WAKING UP 14-YEAR WILD MOTHER...");
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 2.5;
        if (next >= 100) {
          clearInterval(interval);
          setStatusText("CRUSTORA OVEN READY · 920°F!");
          setTimeout(() => {
            setIsFinished(true);
            setTimeout(onComplete, 750);
          }, 350);
          return 100;
        }

        if (next < 25) {
          setStatusText("72-HOUR SOURDOUGH FERMENTATION ACTIVE...");
        } else if (next < 50) {
          setStatusText("CRUSHING SWEET D.O.P. SAN MARZANO TOMATOES...");
        } else if (next < 75) {
          setStatusText("FIRING NAPOLI STONE DOME TO 920°F...");
        } else {
          setStatusText("BLISTERING THE LEOPARD CORNICIONE...");
        }
        return next;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          className="fixed inset-0 h-dvh w-full flex flex-col items-center justify-center overflow-hidden z-[99999]"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Loading Crustora"
        >
          {/* Layered Curtains (Espresso Charcoal, Fire Ember, San Marzano Red) */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path fill="#21110B" d="M -1 -1 L 101 -1 L 101 101 Q 50 101 -1 101 Z" />
            </svg>
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path fill="#EA580C" d="M -1 -1 L 101 -1 L 101 101 Q 50 101 -1 101 Z" />
            </svg>
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path fill="#D9251D" d="M -1 -1 L 101 -1 L 101 101 Q 50 101 -1 101 Z" />
            </svg>
          </div>

          {/* Skip Button */}
          <button
            onClick={() => {
              setIsFinished(true);
              setTimeout(onComplete, 200);
            }}
            className="absolute top-6 right-6 z-30 font-mouse-memoirs text-sm md:text-base uppercase tracking-widest text-[#FFFBF5]/70 hover:text-[#FCD34D] transition-colors border border-white/20 px-3 py-1 rounded-full cursor-pointer"
          >
            SKIP INTRO →
          </button>

          {/* Central Animated Pizza Assembly & Dropping Layers */}
          <div className="relative w-[75vw] h-[80vw] max-w-[340px] max-h-[360px] md:max-w-[440px] md:max-h-[460px] flex items-center justify-center z-20 origin-bottom">
            {/* Sparkles / Flour Dust Particles */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    backgroundColor: i % 3 === 0 ? "#FCD34D" : i % 3 === 1 ? "#FFFBF5" : "#4D9E2E",
                    width: (i % 3) * 3 + 4,
                    height: (i % 3) * 3 + 4,
                  }}
                  animate={{
                    x: [0, (Math.cos((i * 30 * Math.PI) / 180) * 140)],
                    y: [0, (Math.sin((i * 30 * Math.PI) / 180) * 140)],
                    opacity: [0, 1, 0],
                    scale: [0.2, 1.2, 0.5],
                  }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    delay: i * 0.12,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>

            {/* Pizza Layer 1: Sourdough Crust Base */}
            <motion.div
              className="absolute w-[82%] h-[82%] rounded-full bg-[#E5A95A] border-8 border-[#99521C] shadow-2xl flex items-center justify-center"
              initial={{ scale: 0, rotate: -45 }}
              animate={{
                scale: progress > 10 ? 1 : progress / 10,
                rotate: 0,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              {/* Charred blister spots on crust */}
              <div className="absolute -top-2 left-1/4 w-4 h-3 bg-[#421D0E] rounded-full blur-[0.5px]" />
              <div className="absolute top-4 -right-1 w-5 h-4 bg-[#3E1B0D] rounded-full blur-[0.5px]" />
              <div className="absolute -bottom-1 left-1/3 w-6 h-3 bg-[#421D0E] rounded-full blur-[0.5px]" />
              <div className="absolute bottom-6 -left-1 w-4 h-3 bg-[#38160B] rounded-full blur-[0.5px]" />

              {/* Pizza Layer 2: San Marzano Sauce Pool */}
              <motion.div
                className="w-[84%] h-[84%] rounded-full bg-[#B91C1C] border-2 border-[#991B1B] shadow-inner relative overflow-hidden"
                initial={{ scale: 0 }}
                animate={{ scale: progress > 25 ? 1 : 0 }}
                transition={{ type: "spring", stiffness: 180, damping: 14 }}
              >
                {/* Sauce swirl detail */}
                <div className="absolute inset-2 rounded-full border-4 border-[#991B1B]/40 border-dashed animate-spin [animation-duration:15s]" />

                {/* Pizza Layer 3: Melted Mozzarella Islands */}
                {progress > 45 && (
                  <>
                    <motion.div
                      className="absolute top-4 left-6 w-12 h-10 bg-[#FFFBEB] rounded-full blur-[1px] shadow-sm"
                      initial={{ scale: 0, y: -20 }}
                      animate={{ scale: 1, y: 0 }}
                    />
                    <motion.div
                      className="absolute bottom-6 right-5 w-14 h-12 bg-[#FFFBEB] rounded-full blur-[1px] shadow-sm"
                      initial={{ scale: 0, y: -20 }}
                      animate={{ scale: 1, y: 0 }}
                    />
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-14 bg-[#FFFBEB] rounded-full blur-[1px] shadow-sm"
                      initial={{ scale: 0, y: -30 }}
                      animate={{ scale: 1, y: "-50%" }}
                    />
                    <motion.div
                      className="absolute bottom-4 left-8 w-10 h-8 bg-[#FFFBEB] rounded-full blur-[1px] shadow-sm"
                      initial={{ scale: 0, y: -20 }}
                      animate={{ scale: 1, y: 0 }}
                    />
                  </>
                )}

                {/* Pizza Layer 4: Sizzling Cup & Char Pepperoni */}
                {progress > 65 && (
                  <>
                    <motion.div
                      className="absolute top-6 left-12 w-8 h-8 rounded-full bg-[#991B1B] border-2 border-[#7F1D1D] shadow-md flex items-center justify-center"
                      initial={{ scale: 0, y: -30 }}
                      animate={{ scale: 1, y: 0 }}
                    >
                      <div className="w-3 h-3 rounded-full bg-[#EA580C]/80" />
                    </motion.div>
                    <motion.div
                      className="absolute bottom-8 left-16 w-8 h-8 rounded-full bg-[#991B1B] border-2 border-[#7F1D1D] shadow-md flex items-center justify-center"
                      initial={{ scale: 0, y: -30 }}
                      animate={{ scale: 1, y: 0 }}
                    >
                      <div className="w-3 h-3 rounded-full bg-[#EA580C]/80" />
                    </motion.div>
                    <motion.div
                      className="absolute top-12 right-10 w-9 h-9 rounded-full bg-[#991B1B] border-2 border-[#7F1D1D] shadow-md flex items-center justify-center"
                      initial={{ scale: 0, y: -30 }}
                      animate={{ scale: 1, y: 0 }}
                    >
                      <div className="w-3.5 h-3.5 rounded-full bg-[#EA580C]/80" />
                    </motion.div>
                    <motion.div
                      className="absolute bottom-12 right-14 w-8 h-8 rounded-full bg-[#991B1B] border-2 border-[#7F1D1D] shadow-md flex items-center justify-center"
                      initial={{ scale: 0, y: -30 }}
                      animate={{ scale: 1, y: 0 }}
                    >
                      <div className="w-3 h-3 rounded-full bg-[#EA580C]/80" />
                    </motion.div>
                  </>
                )}

                {/* Pizza Layer 5: Fresh Basil Leaves */}
                {progress > 80 && (
                  <>
                    <motion.div
                      className="absolute top-1/3 left-1/3 w-6 h-4 bg-[#4D9E2E] rounded-full rotate-45 shadow-sm border border-[#367220]"
                      initial={{ scale: 0, rotate: 180 }}
                      animate={{ scale: 1, rotate: 45 }}
                    />
                    <motion.div
                      className="absolute bottom-1/3 right-1/3 w-7 h-5 bg-[#4D9E2E] rounded-full -rotate-12 shadow-sm border border-[#367220]"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: -12 }}
                    />
                  </>
                )}
              </motion.div>
            </motion.div>
          </div>

          {/* Status Message */}
          <div className="flex absolute bottom-[6vw] max-md:bottom-[24vw] flex-col items-center z-20 w-full px-6 text-center">
            <p className="font-mouse-memoirs text-xl md:text-3xl text-white/90 tracking-wider uppercase min-h-[1.5em] drop-shadow-md">
              {statusText}
            </p>
          </div>

          {/* Loading Progress Bar */}
          <div
            className="w-full absolute bottom-0 left-0 h-2 md:h-3 bg-white/20 overflow-hidden"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
          >
            <motion.div
              className="h-full bg-[#F59E0B] shadow-[0_0_15px_#F59E0B]"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
