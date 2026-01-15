"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface InfiniteScrollProps {
  children: ReactNode;
  direction?: "left" | "right";
  speed?: number;
  className?: string;
  gap?: number;
}

export default function InfiniteScroll({
  children,
  direction = "left",
  speed = 20,
  className,
  gap = 22,
}: InfiniteScrollProps) {
  const initialX = direction === "left" ? 0 : "-50%";
  const targetX = direction === "left" ? "-50%" : 0;

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-flex"
        style={{ gap: `${gap}px` }}
        animate={{
          x: [initialX, targetX],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        <div className="flex shrink-0 items-center justify-around" style={{ gap: `${gap}px` }}>
          {children}
        </div>
        <div className="flex shrink-0 items-center justify-around" style={{ gap: `${gap}px` }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
