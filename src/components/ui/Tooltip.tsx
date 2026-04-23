"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  position?: "top" | "bottom" | "left" | "right";
  isInteractive?: boolean;
  arrowClassNames?: string;
  containerClassNames?: string;
}

export default function Tooltip({
  content,
  children,
  className = "",
  contentClassName = "",
  position = "top",
  isInteractive = false,
  arrowClassNames,
  containerClassNames,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateCoords = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  };

  useEffect(() => {
    if (isVisible) {
      updateCoords();
      window.addEventListener("scroll", updateCoords, true);
      window.addEventListener("resize", updateCoords);
    }
    return () => {
      window.removeEventListener("scroll", updateCoords, true);
      window.removeEventListener("resize", updateCoords);
    };
  }, [isVisible]);

  const getPositionStyles = () => {
    if (!triggerRef.current) return {};
    const rect = triggerRef.current.getBoundingClientRect();
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    switch (position) {
      case "top":
        return {
          top: rect.top + scrollY,
          left: rect.left + scrollX + rect.width / 2,
          transform: "translate(-50%, -100%) translateY(-10px)",
        };
      case "bottom":
        return {
          top: rect.bottom + scrollY,
          left: rect.left + scrollX + rect.width / 2,
          transform: "translate(-50%, 0) translateY(10px)",
        };
      case "left":
        return {
          top: rect.top + scrollY + rect.height / 2,
          left: rect.left + scrollX,
          transform: "translate(-100%, -50%) translateX(-10px)",
        };
      case "right":
        return {
          top: rect.top + scrollY + rect.height / 2,
          left: rect.right + scrollX,
          transform: "translate(0, -50%) translateX(10px)",
        };
      default:
        return {};
    }
  };

  const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 border-t-primary",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-primary",
    left: "left-full top-1/2 -translate-y-1/2 border-l-primary",
    right: "right-full top-1/2 -translate-y-1/2 border-r-primary",
  };

  const tooltipContent = (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          style={{
            position: "absolute",
            zIndex: 9999,
            ...getPositionStyles(),
          }}
          className={cn(
            "pointer-events-none",
            isInteractive && "pointer-events-auto",
            className,
          )}
        >
          <div
            className={cn(
              "bg-primary p-[0.8rem] rounded-[0.8rem] shadow-2xl text-[1.2rem] font-medium border border-white/10",
              contentClassName,
            )}
            style={{ maxWidth: "calc(100vw - 20px)" }}
          >
            {content}
            <div
              className={cn(
                "absolute w-0 h-0 border-[.6rem] border-transparent",
                arrowClasses[position],
                arrowClassNames,
              )}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div
        ref={triggerRef}
        className={cn("relative inline-block", containerClassNames)}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {mounted && createPortal(tooltipContent, document.body)}
    </>
  );
}
