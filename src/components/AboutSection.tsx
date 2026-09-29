"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Flame } from "lucide-react";
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
    caption: string;
  } | null>(null);

  const galleryItems = [
    {
      src: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=1000&q=80",
      title: "The 920°F Stone Blaze",
      caption: "Applewood embers licking the handcrafted stone hearth to seal in airy blistered crusts in 70 seconds flat.",
      rotate: "md:rotate-[5deg] max-md:-rotate-6",
    },
    {
      src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=80",
      title: "The Molten Fior di Latte Pull",
      caption: "Hand-torn fresh buffalo mozzarella stretched to legendary heights over sweet crushed San Marzano sugo.",
      rotate: "md:rotate-[-5deg] max-md:translate-y-[-2vw] md:z-10",
    },
    {
      src: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=1000&q=80",
      title: "The 72H Sourdough Cornicione",
      caption: "Airy honeycomb crumb structure born from a 14-year-old wild mother starter fermented in chilled mountain rooms.",
      rotate: "md:rotate-[7deg] max-md:rotate-6",
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
        <AnimatedParagraph className="text-[#21110B] text40 font-mouse-memoirs uppercase tracking-wide w-[55%] max-md:w-[90%] mt-[2vw] leading-normal mx-auto">
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
      <div className="relative w-full px-[8vw] max-md:px-[4vw] pb-[6vw] max-md:pb-[14vw] flex justify-center">
        {/* Peelable Vinyl Sticker floating over cards */}
        <div className="absolute top-[-4vw] left-[6vw] max-md:top-[-10vw] max-md:left-[2vw] z-40">
          <PeelableSticker
            label="CRUSTORA"
            sublabel="72H SOURDOUGH"
            badge="D.O.P. HEARTH"
            rotateDeg={-12}
          />
        </div>

        {/* 3 Cards Container */}
        <div className="grid grid-cols-3 gap-[2vw] justify-center items-center max-w-[75vw] max-md:max-w-full max-md:gap-[3vw]">
          {galleryItems.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{
                scale: 1.08,
                rotate: 0,
                zIndex: 30,
                transition: { duration: 0.25 },
              }}
              onClick={() => {
                sounds.playPop(500 + idx * 50);
                setSelectedPhoto(item);
              }}
              className={`h-[28vw] w-full max-md:h-[46vw] rounded-3xl overflow-hidden border-4 border-[#21110B] shadow-[0_15px_30px_rgba(33,17,11,0.3)] bg-white cursor-pointer group relative ${item.rotate}`}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#21110B]/90 via-[#21110B]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-left">
                <span className="font-modak text-lg md:text-xl text-[#FCD34D] leading-none mb-1">
                  {item.title}
                </span>
                <span className="font-mouse-memoirs text-xs md:text-sm text-white/90 uppercase tracking-wider line-clamp-2">
                  {item.caption}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Photo Modal Preview */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <motion.div
              className="fixed inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
            />

            <motion.div
              className="relative max-w-2xl w-full bg-[#FFFBF5] rounded-3xl border-4 border-[#21110B] overflow-hidden shadow-2xl z-10"
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#21110B] text-white flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
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

              <div className="p-6 bg-[#F6EADB]">
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="w-6 h-6 text-[#D9251D]" />
                  <h3 className="font-modak text-3xl text-[#21110B]">
                    {selectedPhoto.title}
                  </h3>
                </div>
                <p className="font-mouse-memoirs text-lg uppercase tracking-wide text-[#21110B]/80">
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
