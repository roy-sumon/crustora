"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Flame, Sparkles, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { PizzaItem, CRUST_DIPS } from "@/data/pizzaData";
import { sounds } from "./AudioEffects";

export interface CartItem {
  pizza: PizzaItem;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onClearCart: () => void;
  onAddDip: (name: string, price: number) => void;
  dips: { name: string; price: number; quantity: number }[];
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onClearCart,
  onAddDip,
  dips,
}: CartDrawerProps) {
  const [isOrdered, setIsOrdered] = useState(false);

  const subtotal =
    cart.reduce((sum, item) => sum + item.pizza.price * item.quantity, 0) +
    dips.reduce((sum, d) => sum + d.price * d.quantity, 0);

  const freeDeliveryThreshold = 45;
  const progressToFree = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);

  const handleCheckout = () => {
    sounds.playSuccess();
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#D9251D", "#F59E0B", "#FCD34D", "#4D9E2E", "#21110B"],
    });
    setIsOrdered(true);
    setTimeout(() => {
      onClearCart();
      setIsOrdered(false);
      onClose();
    }, 4000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex justify-end">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-[#21110B]/60 backdrop-blur-sm cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer Body */}
          <motion.div
            className="relative w-full max-w-md bg-[#FFFBF5] text-[#21110B] h-full shadow-2xl flex flex-col z-10 border-l-4 border-[#21110B]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
          >
            {/* Header */}
            <div className="p-5 border-b-2 border-[#21110B]/10 flex items-center justify-between bg-[#F6EADB]">
              <div className="flex items-center gap-2">
                <Flame className="w-6 h-6 text-[#D9251D] animate-pulse" />
                <h3 className="font-modak text-2xl text-[#21110B] tracking-wide">
                  YOUR HEARTH CART
                </h3>
              </div>
              <button
                onClick={() => {
                  sounds.playPop(350);
                  onClose();
                }}
                className="w-9 h-9 rounded-full bg-[#21110B] text-[#FFFBF5] flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Delivery Bar */}
            <div className="px-5 py-3 bg-[#FCD34D]/40 border-b border-[#21110B]/10">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-1">
                <span>
                  {subtotal >= freeDeliveryThreshold
                    ? "🎉 FREE PRIORITY WARM DELIVERY UNLOCKED!"
                    : `ADD $${(freeDeliveryThreshold - subtotal).toFixed(2)} FOR FREE DELIVERY`}
                </span>
                <span>{Math.round(progressToFree)}%</span>
              </div>
              <div className="w-full h-2 bg-[#21110B]/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#D9251D] transition-all duration-300"
                  style={{ width: `${progressToFree}%` }}
                />
              </div>
            </div>

            {/* Content Area */}
            {isOrdered ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 bg-[#4D9E2E] rounded-full flex items-center justify-center text-[#FFFBF5] mb-4 shadow-lg animate-bounce">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h4 className="font-modak text-3xl text-[#D9251D] mb-2">
                  ORDER FIRED!
                </h4>
                <p className="font-mouse-memoirs text-xl uppercase tracking-wider text-[#21110B] mb-2">
                  THE STONE OVEN HAS CLAIMED YOUR PIE.
                </p>
                <p className="text-sm text-[#21110B]/70 max-w-xs">
                  Blistering at 920°F. Your driver has been dispatched with a micro-vented thermal box.
                </p>
              </div>
            ) : cart.length === 0 && dips.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-[#F6EADB] flex items-center justify-center text-[#21110B]/40 mb-4">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <p className="font-modak text-2xl text-[#21110B]/80 mb-2">
                  YOUR PIZZA BOX IS EMPTY
                </p>
                <p className="font-mouse-memoirs text-lg uppercase text-[#21110B]/60 max-w-xs">
                  PICK AN ARTISAN PIE TO CRUST-IFY YOUR DAY!
                </p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {/* Cart Pizza Items */}
                {cart.map((item) => (
                  <div
                    key={item.pizza.id}
                    className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#21110B]/10 shadow-sm"
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-[#21110B]/10">
                      <Image
                        src={item.pizza.image}
                        alt={item.pizza.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-modak text-base text-[#21110B] truncate">
                        {item.pizza.name}
                      </h5>
                      <p className="font-mouse-memoirs text-xs uppercase text-[#D9251D] font-bold">
                        ${item.pizza.price} each
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() => {
                            sounds.playPop(380);
                            onUpdateQuantity(item.pizza.id, -1);
                          }}
                          className="w-6 h-6 rounded bg-[#F6EADB] text-[#21110B] flex items-center justify-center hover:bg-[#D9251D] hover:text-white transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold text-sm w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => {
                            sounds.playPop(480);
                            onUpdateQuantity(item.pizza.id, 1);
                          }}
                          className="w-6 h-6 rounded bg-[#F6EADB] text-[#21110B] flex items-center justify-center hover:bg-[#D9251D] hover:text-white transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <div className="font-mouse-memoirs text-lg text-[#21110B] font-bold">
                      ${(item.pizza.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}

                {/* Dips Selected */}
                {dips.length > 0 && (
                  <div className="pt-2 border-t border-[#21110B]/10">
                    <p className="font-mouse-memoirs text-sm uppercase text-[#21110B]/60 tracking-wider mb-2">
                      Crust Dips & Add-ons
                    </p>
                    {dips.map((dip, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-xs py-1 text-[#21110B]/80 font-bold"
                      >
                        <span>
                          {dip.quantity}x {dip.name}
                        </span>
                        <span>${(dip.price * dip.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add-on Crust Dips Suggestions */}
                <div className="pt-3 border-t border-[#21110B]/10">
                  <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#D9251D] mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>RECOMMENDED CRUST DIPS:</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {CRUST_DIPS.map((dip) => (
                      <div
                        key={dip.id}
                        className="flex items-center justify-between p-2 rounded-lg bg-[#F6EADB]/60 border border-[#21110B]/10 text-xs"
                      >
                        <div>
                          <div className="font-bold text-[#21110B]">{dip.name}</div>
                          <div className="text-[10px] text-[#21110B]/60 font-semibold">
                            +${dip.price.toFixed(2)}
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            sounds.playPop(550);
                            onAddDip(dip.name, dip.price);
                          }}
                          className="px-2.5 py-1 bg-[#21110B] text-[#FFFBF5] text-[11px] rounded font-mouse-memoirs uppercase tracking-wider hover:bg-[#D9251D] transition-colors cursor-pointer"
                        >
                          + ADD DIP
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Footer Summary & Checkout Button */}
            {!isOrdered && (cart.length > 0 || dips.length > 0) && (
              <div className="p-5 border-t-2 border-[#21110B]/10 bg-[#F6EADB]">
                <div className="flex items-center justify-between mb-3 text-lg font-bold font-mouse-memoirs tracking-wide">
                  <span className="uppercase text-[#21110B]/70">Subtotal:</span>
                  <span className="text-2xl text-[#D9251D]">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full py-4 bg-[#D9251D] hover:bg-[#21110B] text-[#FFFBF5] font-mouse-memoirs text-2xl uppercase tracking-wider rounded-xl transition-all shadow-[0_6px_0_#991B1B] hover:shadow-[0_2px_0_#21110B] hover:translate-y-1 active:translate-y-1.5 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Flame className="w-6 h-6 text-[#FCD34D]" />
                  <span>FIRE HEARTH & PLACE ORDER</span>
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
