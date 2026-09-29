# Crustora

Crustora is a concept landing page for an artisan, wood-fired sourdough pizza brand. The goal of this project was to build a rich, interaction-heavy web experience inspired by modern boutique food websites, focusing on custom typography, kinetic motion, and tactile micro-interactions.

The project is built on Next.js 16 (App Router), Tailwind CSS v4, and Framer Motion, with smooth inertia scrolling powered by Lenis.

---

## Overview

Most modern food websites either feel like generic corporate templates or simple static restaurant menus. With Crustora, I wanted to treat the web page as an interactive canvas—combining 3D parallax effects, responsive SVG curves, sound synthesis, and spring animations to create a memorable, tactile brand feel.

### Key Implementation Details

- **Procedural Sound Engine (`AudioEffects.ts`)**: Instead of loading static audio files (which add network overhead and latency), all UI interaction sounds—pops, snaps, crunches, and checkout chords—are generated procedurally at runtime using the native Web Audio API oscillators and gain envelopes.
- **SVG Flight Path with Native Matrix Math (`MapSection.tsx`)**: In the World Tour section, the delivery plane tracks an SVG bezier curve using browser-native `getScreenCTM()` and `getPointAtLength()` calculations. This ensures exact pixel alignment and tangent auto-rotation on desktop viewports, with appropriate z-index layering behind foreground cards and headlines. On mobile devices, this falls back cleanly to a vertical dotted scroll track.
- **3D Interactive Visualizers**:
  - The hero centerpiece features real-time 3D parallax mouse tilt with smooth spring dampening.
  - The Craft section includes an interactive pizza hotspot explorer that highlights regional ingredients (San Marzano tomatoes, Campania fior di latte, hot honey).
  - An exploded dough-layer visualizer allows inspecting each component of the 72-hour fermentation process.
- **Kinetic Typography & Entrance Coordination**: Letter-by-letter and word-by-word spring physics for headings. Initial hero entrance animations are synchronized with the 3-curtain preloader reveal so the titles spring up dynamically right as the page becomes visible, followed by continuous subtle wave breathing motion.
- **Mobile-First Header & Floating Cart**: To prevent mobile navigation clipping on narrow screens (320px–390px), the top bar is kept lightweight with direct access to the menu and pizza selection, while a thumb-friendly floating cart pill handles live order tracking at the bottom right.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **Smooth Scroll**: Lenis
- **Audio**: Web Audio API (native procedural synthesis)
- **Icons**: Lucide React
- **Effects**: Canvas Confetti

---

## Project Structure

```text
src/
├── app/
│   ├── favicon.ico         # Custom multi-resolution pizza slice icon
│   ├── globals.css         # Typography, design tokens, text-stroke utilities
│   ├── icon.svg            # Scalable transparent pizza slice favicon
│   ├── layout.tsx          # Root layout and metadata configuration
│   └── page.tsx            # Main landing flow and cart state management
├── components/
│   ├── AboutSection.tsx    # 920°F stone hearth story, polaroid cards, and craft stats
│   ├── AnimatedHeading.tsx # Staggered word-by-word spring typography
│   ├── AudioEffects.ts     # Web Audio API sound synthesizer
│   ├── BlobButton.tsx      # SVG organic blob action buttons with sliding text
│   ├── CartDrawer.tsx      # Slide-out pizza box drawer with live checkout
│   ├── CustomCursor.tsx    # Magnetic cursor with trailing artisan pizza slices
│   ├── HeroSection.tsx     # 3D parallax hero, letter-wave animations, angled stamps
│   ├── IngredientsSection.tsx # 3D exploded sourdough layers inspection
│   ├── JellyWave.tsx       # Procedural bezier wave section dividers
│   ├── MapSection.tsx      # Flight path curve tracking and city hubs tour
│   ├── MenuModal.tsx       # Pizza catalog modal with crust dip add-ons
│   ├── Navbar.tsx          # Responsive fixed navigation and mobile floating cart pill
│   ├── PeelableSticker.tsx # High-contrast 3D vinyl peelable badge
│   ├── Preloader.tsx       # 3-color curtain reveal with SVG pizza assembly
│   ├── SensorySection.tsx  # Interactive pizza sensory hotspot explorer
│   └── SmoothScroll.tsx    # Lenis inertia scroll provider
└── data/
    └── pizzaData.ts        # Pizza catalog, flavor notes, and pricing
```

---

## Getting Started

### Prerequisites

You need **Node.js 18+** installed on your machine.

### Installation

```bash
# Clone the repository
git clone https://github.com/roy-sumon/crustora.git

# Move into the project directory
cd crustora

# Install dependencies
npm install

# Start the local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Build the production bundle
npm run build

# Start the production server
npm start
```

---

## Author

Developed by **Sumon Roy** ([@roy-sumon](https://github.com/roy-sumon)).

---

## License

This project is licensed under the MIT License.
