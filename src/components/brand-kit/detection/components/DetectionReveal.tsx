"use client";

import { motion } from "framer-motion";
import { cn } from "../../../../lib/utils";
import type { DetectionRevealProps } from "../types";

export default function DetectionReveal({ children, className }: DetectionRevealProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.985, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
