"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  position?: "top" | "bottom" | "left" | "right";
  isInteractive?: boolean;
  arrowClassNames?: string
}

export default function Tooltip({
  content,
  children,
  className = "",
  contentClassName = "",
  position = "top",
  isInteractive = false,
  arrowClassNames
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-[0.6rem]",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-[0.6rem]",
    left: "right-full top-1/2 -translate-y-1/2 mr-[0.6rem]",
    right: "left-full top-1/2 -translate-y-1/2 ml-[0.6rem]",
  };

  const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 border-t-white",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-white",
    left: "left-full top-1/2 -translate-y-1/2 border-l-white",
    right: "right-full top-1/2 -translate-y-1/2 border-r-white",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: position === "top" ? 5 : -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: position === "top" ? 5 : -5 }}
            className={cn(
              "absolute z-50",
              !isInteractive && "pointer-events-none",
              positionClasses[position],
              className,
            )}
          >
            <div
              className={cn(
                "bg-primary text-text-primary p-[0.6rem] rounded-[0.8rem] shadow-xl text-[1.2rem] font-medium border border-border/10",
                contentClassName,
              )}
            >
              {content}
              <div
                className={cn(
                  "absolute w-0 h-0 border-[.6rem] border-transparent max-w-[2rem]",
                  arrowClasses[position],
                  arrowClassNames
                )}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
