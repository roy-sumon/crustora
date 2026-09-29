"use client";

import React, { useState } from "react";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SensorySection from "@/components/SensorySection";
import IngredientsSection from "@/components/IngredientsSection";
import MapSection from "@/components/MapSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import CartDrawer, { CartItem } from "@/components/CartDrawer";
import MenuModal from "@/components/MenuModal";
import { PIZZA_MENU, PizzaItem } from "@/data/pizzaData";
import { sounds } from "@/components/AudioEffects";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([
    // Start with 1 bestselling Holy Pepperoni pizza in the box for instant delight
    { pizza: PIZZA_MENU[0], quantity: 1 },
  ]);

  // Crust Dips State
  const [dips, setDips] = useState<{ name: string; price: number; quantity: number }[]>([
    { name: "Calabrian Hot Honey Pipette", price: 2.0, quantity: 1 },
  ]);

  const totalCartCount =
    cart.reduce((sum, item) => sum + item.quantity, 0) +
    dips.reduce((sum, d) => sum + d.quantity, 0);

  const handleAddToCart = (pizza: PizzaItem) => {
    sounds.playPop(520);
    setCart((prev) => {
      const existing = prev.find((item) => item.pizza.id === pizza.id);
      if (existing) {
        return prev.map((item) =>
          item.pizza.id === pizza.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { pizza, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.pizza.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleAddDip = (name: string, price: number) => {
    setDips((prev) => {
      const existing = prev.find((d) => d.name === name);
      if (existing) {
        return prev.map((d) =>
          d.name === name ? { ...d, quantity: d.quantity + 1 } : d
        );
      }
      return [...prev, { name, price, quantity: 1 }];
    });
  };

  const handleClearCart = () => {
    setCart([]);
    setDips([]);
  };

  return (
    <>
      {/* Intro Preloader Curtain Animation */}
      <Preloader onComplete={() => setIsLoaded(true)} />

      {/* Retro Smooth Desktop Cursor */}
      <CustomCursor />

      {/* Smooth Inertia Scrolling Wrapper */}
      <SmoothScroll>
        {/* Main App Container */}
        <main className="min-h-screen flex flex-col relative w-full overflow-x-hidden">
          {/* Fixed Navbar */}
          <Navbar
            cartCount={totalCartCount}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenMenuModal={() => setIsMenuOpen(true)}
          />

          {/* 1. Hero Section: "THE CRUST" + 3D Artisan Pizza */}
          <HeroSection onOrderClick={() => setIsMenuOpen(true)} />

          {/* 2. About Section: "TOP ARTISAN" + 3 Tilted Cards + Peelable Sticker */}
          <AboutSection onOrderClick={() => setIsMenuOpen(true)} />

          {/* 3. Sensory Showcase: "FOOD THAT FEELS GOOD" + Hotspot Explorer */}
          <SensorySection />

          {/* 4. Ingredients Exploded 3D Visualizer: "EVERY LAYER" */}
          <IngredientsSection />

          {/* 5. World Slice Hubs Tour: "QUALITY THAT TRAVELS WITH YOU" + Traveling Plane */}
          <MapSection />

          {/* 6. CTA Section: "FEEL THE CRUST" + Mascot Badge */}
          <CtaSection onOrderClick={() => setIsMenuOpen(true)} />

          {/* 7. Mega Footer: Bouncy "C R U S T O R A" Letters */}
          <Footer onOrderClick={() => setIsMenuOpen(true)} />

          {/* Interactive Slide-Out Cart & Order Drawer */}
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onClearCart={handleClearCart}
            onAddDip={handleAddDip}
            dips={dips}
          />

          {/* Full Pizza Menu Modal */}
          <MenuModal
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            onAddToCart={handleAddToCart}
          />
        </main>
      </SmoothScroll>
    </>
  );
}
