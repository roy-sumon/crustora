"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Flame, Sparkles, Award, Clock, Wheat } from "lucide-react";
import BlobButton from "./BlobButton";
import PeelableSticker from "./PeelableSticker";
import { sounds } from "./AudioEffects";
import AnimatedHeading from "./AnimatedHeading";
import AnimatedParagraph from "./AnimatedParagraph";

interface AboutSectionProps {
  onOrderClick: () => void;
}

export default function AboutSection({ onOrderClick }: AboutSectionProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<{
    src: string;
    title: string;
    badge: string;
    caption: string;
  } | null>(null);

  const galleryItems = [
    {
      src: "/img/cities/napoli.jpg",
      badge: "STONE HEARTH 920°F",
      title: "The 920°F Stone Blaze",
      caption: "Handcrafted stone hearth blazing at 920°F with dried applewood logs to lock in an airy, blistered crust in 70 seconds flat.",
      rotate: "md:rotate-[3deg]",
      tagColor: "bg-[#D9251D]",
    },
    {
      src: "/img/cities/newyork.jpg",
      badge: "BUFFALO MOZZARELLA",
      title: "Molten Fior Di Latte",
      caption: "Hand-torn fresh whole milk mozzarella stretching to creamy molten lakes over sweet crushed San Marzano volcanic tomatoes.",
      rotate: "md:rotate-[-3deg] md:z-10",
      tagColor: "bg-[#F59E0B]",
    },
    {
      src: "/img/cities/london.jpg",
      badge: "14YR WILD MOTHER",
      title: "72H Leopard Cornicione",
      caption: "Natural honeycomb crumb structure born from 72-hour slow cold fermentation with wild mountain sourdough starter.",
      rotate: "md:rotate-[4deg]",
      tagColor: "bg-[#21110B]",
    },
  ];

  return (
    <section
      id="about"
      className="min-h-fit overflow-clip relative z-20 text-center w-full py-[6vw] max-md:py-[12vw] bg-[#F6EADB]"
    >
      {/* Top Header Block */}
      <div className="space-y-[1vw] relative max-md:space-y-[4vw]">
        {/* Angled Badge */}
        <p className="text-[#D9251D] -rotate-6 relative top-[-1vw] text-stroke-180 w-fit mx-auto text-[3vw] max-md:text-[8vw] font-modak leading-[0.9]">
          TOP ARTISAN
        </p>

        {/* Big Heading with word-by-word spring pop */}
        <AnimatedHeading
          className="text-stroke-180 w-[85%] max-md:w-[94%] text-center mx-auto leading-[0.8] text-[#D9251D] heading300 font-modak uppercase tracking-tight"
          as="h2"
        >
          CRISPY CHEESY BLISTERED
        </AnimatedHeading>

        {/* Description text */}
        <AnimatedParagraph className="text-[#21110B] text40 font-mouse-memoirs uppercase tracking-wide w-[55%] max-md:w-[90%] mt-[2vw] leading-normal mx-auto font-semibold">
          CRUSTORA rewrites craft pizza. Honoring ancient Neapolitan roots, we bring you blistered leopard corniciones, molten artisan cheeses, and cold-fermented wild sourdough fired hot at 920°F.
        </AnimatedParagraph>
      </div>

      {/* Organic Blob Action Button */}
      <div className="mx-auto mt-[3vw] mb-[4vw] w-full max-md:mt-[8vw] max-md:mb-[10vw]">
        <BlobButton onClick={onOrderClick} size="md" variant="primary">
          EXPLORE THE PIES
        </BlobButton>
      </div>

      {/* 3 Tilted Media Cards & Peelable Vinyl Sticker */}
      <div className="relative w-full px-[5vw] max-md:px-[4vw] pb-[4vw] max-md:pb-[10vw]">
        {/* Peelable Vinyl Sticker floating over cards */}
        <div className="absolute -top-10 left-[4vw] md:left-[6vw] z-30">
          <PeelableSticker
            label="CRUSTORA"
            sublabel="72H SOURDOUGH"
            badge="D.O.P. HEARTH"
            rotateDeg={-10}
          />
        </div>

        {/* Floating Decorative Artisan Badges for Extra Personality ("kichu kichu show korao") */}
        {/* Badge Right: 100% Wood-Fired Stamp */}
        <motion.div
          animate={{ y: [-5, 5, -5], rotate: [8, 12, 8] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="hidden lg:flex absolute -top-8 right-[7vw] z-30 flex-col items-center bg-[#D9251D] text-[#FFFBF5] border-3 border-[#21110B] px-4 py-2 rounded-2xl shadow-xl -rotate-6 pointer-events-none"
        >
          <div className="flex items-center gap-1.5 font-modak text-base text-[#FCD34D]">
            <Flame className="w-4 h-4 fill-[#FCD34D]" />
            <span>920°F BLAZE</span>
          </div>
          <span className="font-mouse-memoirs text-xs tracking-wider uppercase text-white/90">
            NAPOLI CERTIFIED
          </span>
        </motion.div>

        {/* Badge Left Lower: Slow Cold Ferment Pill */}
        <motion.div
          animate={{ y: [6, -6, 6], rotate: [-6, -2, -6] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="hidden xl:flex absolute bottom-[6vw] -left-[1vw] z-30 items-center gap-2 bg-[#21110B] text-[#FFFBF5] border-3 border-[#F59E0B] px-4 py-2.5 rounded-full shadow-2xl pointer-events-none"
        >
          <Clock className="w-5 h-5 text-[#FCD34D]" />
          <div className="text-left leading-tight">
            <p className="font-modak text-xs text-[#FCD34D]">72-HOUR REST</p>
            <p className="font-mouse-memoirs text-[11px] text-white/80 uppercase">ZERO ADDED SUGAR</p>
          </div>
        </motion.div>

        {/* 3 Cards Container with Guaranteed Full Width and High Contrast */}
        <div className="w-full max-w-[85vw] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-[2.5vw] items-stretch">
          {galleryItems.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{
                scale: 1.04,
                rotate: 0,
                zIndex: 35,
                transition: { duration: 0.25 },
              }}
              onClick={() => {
                sounds.playPop(500 + idx * 50);
                setSelectedPhoto(item);
              }}
              className={`relative w-full h-[460px] md:h-[28vw] min-h-[380px] rounded-3xl overflow-hidden border-4 border-[#21110B] shadow-[0_20px_40px_rgba(33,17,11,0.35)] bg-[#21110B] cursor-pointer group flex flex-col justify-between ${item.rotate} transition-shadow duration-300 hover:shadow-[0_25px_50px_rgba(217,37,29,0.4)]`}
            >
              {/* Background Real Wood-Fired Pizza Image */}
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
              />

              {/* Gradient Scrim for Permanent Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#21110B] via-[#21110B]/30 to-transparent pointer-events-none" />

              {/* Top Pill Tag */}
              <div className="relative z-10 p-4 flex justify-between items-start">
                <span className={`${item.tagColor} text-white font-modak text-xs md:text-sm px-3 py-1 rounded-full uppercase tracking-wider border-2 border-[#21110B] shadow-md`}>
                  {item.badge}
                </span>
                <span className="w-8 h-8 rounded-full bg-[#FFFBF5] border-2 border-[#21110B] flex items-center justify-center text-xs group-hover:rotate-45 transition-transform duration-300 shadow">
                  ↗
                </span>
              </div>

              {/* Bottom Info Block: Always Visible & High Contrast */}
              <div className="relative z-10 p-5 text-left flex flex-col gap-1.5">
                <h3 className="font-modak text-2xl md:text-3xl text-[#FCD34D] leading-none drop-shadow-sm group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <p className="font-mouse-memoirs text-sm md:text-base text-white/95 uppercase tracking-wide leading-tight line-clamp-2">
                  {item.caption}
                </p>
                <div className="mt-1 flex items-center gap-1.5 text-[#FCD34D] font-mouse-memoirs text-xs uppercase tracking-widest font-bold">
                  <span>TAP FOR DETAILS</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Live Craft Stats Strip ("kichu kichu show korao") */}
        <div className="w-full max-w-[85vw] mx-auto mt-8 md:mt-[4vw] bg-[#FFFBF5] border-4 border-[#21110B] rounded-3xl p-4 md:p-6 shadow-[0_12px_28px_rgba(33,17,11,0.2)] grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-[#21110B]/15">
          <div className="flex flex-col items-center justify-center p-2">
            <span className="font-modak text-3xl md:text-4xl text-[#D9251D] leading-none">72H</span>
            <span className="font-mouse-memoirs text-xs md:text-sm text-[#21110B] uppercase font-bold tracking-wider mt-1">Cold Fermentation</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2">
            <span className="font-modak text-3xl md:text-4xl text-[#F59E0B] leading-none">920°F</span>
            <span className="font-mouse-memoirs text-xs md:text-sm text-[#21110B] uppercase font-bold tracking-wider mt-1">Stone Oven Blaze</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2">
            <span className="font-modak text-3xl md:text-4xl text-[#21110B] leading-none">70 SEC</span>
            <span className="font-mouse-memoirs text-xs md:text-sm text-[#21110B] uppercase font-bold tracking-wider mt-1">Flash Leopard Bake</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2">
            <span className="font-modak text-3xl md:text-4xl text-[#16A34A] leading-none">100%</span>
            <span className="font-mouse-memoirs text-xs md:text-sm text-[#21110B] uppercase font-bold tracking-wider mt-1">Organic Sourdough</span>
          </div>
        </div>
      </div>

      {/* Photo Modal Preview */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
            />

            <motion.div
              className="relative max-w-2xl w-full bg-[#FFFBF5] rounded-3xl border-4 border-[#21110B] overflow-hidden shadow-2xl z-10"
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#21110B] text-white flex items-center justify-center hover:scale-110 transition-transform cursor-pointer shadow-lg"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative w-full h-80 md:h-96">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6 bg-[#F6EADB] text-left">
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="w-6 h-6 text-[#D9251D]" />
                  <h3 className="font-modak text-3xl text-[#21110B]">
                    {selectedPhoto.title}
                  </h3>
                </div>
                <p className="font-mouse-memoirs text-lg uppercase tracking-wide text-[#21110B]/85 font-semibold leading-relaxed">
                  {selectedPhoto.caption}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
