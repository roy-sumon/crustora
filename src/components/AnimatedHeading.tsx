"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimatedHeadingProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  delay?: number;
}

export default function AnimatedHeading({
  children,
  className = "",
  as = "h2",
  delay = 0,
}: AnimatedHeadingProps) {
  const words = children.split(" ");
  const Tag = as;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      y: 40,
      rotate: -8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 340,
        damping: 18,
      },
    },
  };

  return (
    <Tag className={className}>
      <span className="sr-only">{children}</span>
      <motion.span
        aria-hidden="true"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="inline-flex flex-wrap justify-center gap-x-[0.3em] gap-y-[0.1em]"
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={wordVariants}
            data-pop="true"
            className="inline-block will-change-transform origin-bottom"
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
