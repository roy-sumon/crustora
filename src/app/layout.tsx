import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CRUSTORA | Wood-Fired Artisan Sourdough Pizza",
  description:
    "72-hour slow cold fermentation, 900°F stone hearth blazes, and unapologetic artisan craft. Est. 2026 — Napoli to Brooklyn & Beyond.",
  keywords: [
    "artisan pizza",
    "sourdough pizza",
    "wood fired pizza",
    "neapolitan pizza",
    "CRUSTORA",
    "gourmet pizza",
  ],
  openGraph: {
    title: "CRUSTORA | Wood-Fired Artisan Sourdough Pizza",
    description:
      "72-hour slow cold fermentation, 900°F stone hearth blazes, and unapologetic artisan craft.",
    siteName: "CRUSTORA Pizza",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#D9251D",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased selection:bg-[#D9251D] selection:text-[#FFFBF5]">
      <body className="min-h-full flex flex-col bg-[#F6EADB] text-[#21110B] relative">
        {children}
      </body>
    </html>
  );
}
