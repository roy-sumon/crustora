"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimatedParagraphProps {
  children: string;
  className?: string;
  delay?: number;
}

export default function AnimatedParagraph({
  children,
  className = "",
  delay = 0.15,
}: AnimatedParagraphProps) {
  return (
    <motion.p
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 1, 0.5, 1] }}
    >
      {children}
    </motion.p>
  );
}
