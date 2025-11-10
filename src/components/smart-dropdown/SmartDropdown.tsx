"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { useDropdownPosition } from "./hooks/useDropdownPosition";
import { useDropdownInteractions } from "./hooks/useDropdownInteractions";

export type DropdownPlacement = 
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end"
  | "left-start"
  | "left-end"
  | "right-start"
  | "right-end";

/**
 * COMPONENT: SmartDropdown
 * 
 * PURPOSE:
 * Reusable dropdown component with intelligent positioning
 * Automatically adjusts placement to avoid viewport edges
 * Renders in portal to avoid z-index issues
 * 
 * USAGE:
 * <SmartDropdown
 *   isOpen={isOpen}
 *   onClose={onClose}
 *   triggerRef={triggerRef}
 *   placement="bottom-start"
 *   className="min-w-[200px]"
 * >
 *   <DropdownItem onClick={handleEdit}>Edit</DropdownItem>
 *   <DropdownItem onClick={handleDelete}>Delete</DropdownItem>
 * </SmartDropdown>
 * 
 * PROPS:
 * - isOpen: boolean - Controls visibility
 * - onClose: () => void - Close callback
 * - triggerRef: React.RefObject<HTMLElement> - Trigger element reference
 * - placement: DropdownPlacement - Preferred placement
 * - offset: number - Distance from trigger (default: 8)
 * - maxHeight: string - Max height before scroll (default: '16rem')
 * - className: string - Additional CSS classes
 * - closeOnClick: boolean - Close on item click (default: true)
 * - closeOnOutsideClick: boolean - Close on outside click (default: true)
 * - children: React.ReactNode - Dropdown content
 */

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

  const { 
    calculatedPosition, 
    calculatePosition, 
    refinePosition, 
    resetCalculation 
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
    }
  }, [isOpen, calculatePosition, refinePosition, resetCalculation]);

  if (!isOpen && !isMounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          className={`
            fixed bg-primary border border-border rounded-lg shadow-xl z-50
            overflow-hidden backdrop-blur-sm
            ${className}
          `}
          style={{
            top: calculatedPosition.top,
            left: calculatedPosition.left,
            maxHeight,
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
            onClick={handleDropdownClick}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}