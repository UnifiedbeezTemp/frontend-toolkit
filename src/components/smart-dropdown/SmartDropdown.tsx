"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { useDropdownPosition } from "./hooks/useDropdownPosition";
import { useDropdownInteractions } from "./hooks/useDropdownInteractions";
import { cn } from "../../lib/utils";

export type DropdownPlacement =
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end"
  | "left-start"
  | "left-end"
  | "right-start"
  | "right-end";

interface SmartDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  placement?: DropdownPlacement;
  offset?: number;
  maxHeight?: string;
  className?: string;
  closeOnClick?: boolean;
  closeOnOutsideClick?: boolean;
  children: React.ReactNode;
}

export default function SmartDropdown({
  isOpen,
  onClose,
  triggerRef,
  placement = "bottom-start",
  offset = 8,
  maxHeight = "16rem",
  className = "",
  closeOnClick = true,
  closeOnOutsideClick = true,
  children,
}: SmartDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [triggerWidth, setTriggerWidth] = useState<number | null>(null);

  const {
    calculatedPosition,
    calculatePosition,
    refinePosition,
    resetCalculation,
  } = useDropdownPosition({
    triggerRef,
    placement,
    offset,
  });

  const { handleDropdownClick } = useDropdownInteractions({
    isOpen,
    onClose,
    dropdownRef,
    triggerRef,
    closeOnOutsideClick,
    closeOnClick,
    onPositionChange: () => {
      if (dropdownRef.current) {
        const dropdownRect = dropdownRef.current.getBoundingClientRect();
        refinePosition(dropdownRect);
      }
    },
  });

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const width = triggerRef.current.getBoundingClientRect().width;
      setTriggerWidth(width);
    }
  }, [isOpen, triggerRef]);

  useEffect(() => {
    if (!isOpen) return;

    const updatePosition = () => {
      if (dropdownRef.current) {
        const dropdownRect = dropdownRef.current.getBoundingClientRect();
        refinePosition(dropdownRect);
      }
    };

    updatePosition();

    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen, refinePosition]);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      calculatePosition();

      const timeoutId = setTimeout(() => {
        if (dropdownRef.current) {
          const dropdownRect = dropdownRef.current.getBoundingClientRect();
          refinePosition(dropdownRect);
        }
      }, 16);

      return () => clearTimeout(timeoutId);
    } else {
      setIsMounted(false);
      resetCalculation();
      setTriggerWidth(null);
    }
  }, [isOpen, calculatePosition, refinePosition, resetCalculation]);

  if (!isOpen && !isMounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          className={cn(
            "fixed bg-primary border border-border rounded-[0.8rem] shadow-xl z-50 overflow-hidden backdrop-blur-sm z-[1000]",
            className.includes("w-full") ? "w-full" : "",
            !className.includes("w-full") && triggerWidth ? `min-w-[${triggerWidth}px]` : "",
            className
          )}
          style={{
            top: calculatedPosition.top,
            left: calculatedPosition.left,
            maxHeight,
            ...(!className.includes("w-full") && triggerWidth && { width: triggerWidth }),
          }}
          initial={{ opacity: 0, scale: 0.95, y: -5 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -5 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          role="menu"
          aria-orientation="vertical"
        >
          <div
            className="overflow-y-auto"
            style={{ maxHeight }}
            // onClick={handleDropdownClick}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}