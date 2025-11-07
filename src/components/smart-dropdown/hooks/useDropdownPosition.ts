"use client";

import { useState, useCallback, useRef } from "react";

export type DropdownPlacement =
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end"
  | "left-start"
  | "left-end"
  | "right-start"
  | "right-end";

interface Position {
  top: number;
  left: number;
  placement: DropdownPlacement;
}

interface UseDropdownPositionProps {
  triggerRef: React.RefObject<HTMLElement | null>;
  placement: DropdownPlacement;
  offset?: number;
}

/**
 * HOOK: useDropdownPosition
 * 
 * PURPOSE:
 * Calculates optimal dropdown position with viewport edge detection
 * Automatically flips placement if content would be cut off
 * 
 * USAGE:
 * const { calculatedPosition, calculatePosition } = useDropdownPosition({
 *   triggerRef,
 *   placement: 'bottom-start',
 *   offset: 8,
 * });
 * 
 * RETURNS:
 * - calculatedPosition: { top, left, placement }
 * - calculatePosition: () => void - Manual recalculation function
 */

export function useDropdownPosition({
  triggerRef,
  placement,
  offset = 8,
}: UseDropdownPositionProps) {
  const [calculatedPosition, setCalculatedPosition] = useState<Position>({
    top: 0,
    left: 0,
    placement,
  });

  const hasCalculatedRef = useRef(false);

  const calculatePosition = useCallback((dropdownRect?: DOMRect) => {
    if (!triggerRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const dropdownDimensions = dropdownRect || {
      width: 200,
      height: 160,
    };

    let top = 0;
    let left = 0;
    let finalPlacement = placement;

    switch (placement) {
      case "top-start":
        top = triggerRect.top - dropdownDimensions.height - offset;
        left = triggerRect.left;
        break;
      case "top-end":
        top = triggerRect.top - dropdownDimensions.height - offset;
        left = triggerRect.right - dropdownDimensions.width;
        break;
      case "bottom-start":
        top = triggerRect.bottom + offset;
        left = triggerRect.left;
        break;
      case "bottom-end":
        top = triggerRect.bottom + offset;
        left = triggerRect.right - dropdownDimensions.width;
        break;
      case "left-start":
        top = triggerRect.top;
        left = triggerRect.left - dropdownDimensions.width - offset;
        break;
      case "left-end":
        top = triggerRect.bottom - dropdownDimensions.height;
        left = triggerRect.left - dropdownDimensions.width - offset;
        break;
      case "right-start":
        top = triggerRect.top;
        left = triggerRect.right + offset;
        break;
      case "right-end":
        top = triggerRect.bottom - dropdownDimensions.height;
        left = triggerRect.right + offset;
        break;
    }

    if (placement.startsWith("bottom") && top + dropdownDimensions.height > viewport.height) {
      finalPlacement = placement.replace("bottom", "top") as DropdownPlacement;
      top = triggerRect.top - dropdownDimensions.height - offset;
    } else if (placement.startsWith("top") && top < 0) {
      finalPlacement = placement.replace("top", "bottom") as DropdownPlacement;
      top = triggerRect.bottom + offset;
    }

    if (placement.includes("start") && left < 0) {
      finalPlacement = finalPlacement.replace("start", "end") as DropdownPlacement;
      left = triggerRect.right - dropdownDimensions.width;
    } else if (placement.includes("end") && left + dropdownDimensions.width > viewport.width) {
      finalPlacement = finalPlacement.replace("end", "start") as DropdownPlacement;
      left = triggerRect.left;
    }

    top = Math.max(8, Math.min(top, viewport.height - dropdownDimensions.height - 8));
    left = Math.max(8, Math.min(left, viewport.width - dropdownDimensions.width - 8));

    setCalculatedPosition(current => {
      if (current.top === top && current.left === left && current.placement === finalPlacement) {
        return current;
      }
      return { top, left, placement: finalPlacement };
    });

    hasCalculatedRef.current = true;
  }, [triggerRef, placement, offset]);

  const refinePosition = useCallback((dropdownRect: DOMRect) => {
    calculatePosition(dropdownRect);
  }, [calculatePosition]);

  const resetCalculation = useCallback(() => {
    hasCalculatedRef.current = false;
  }, []);

  return {
    calculatedPosition,
    calculatePosition,
    refinePosition,
    resetCalculation,
    hasCalculated: hasCalculatedRef.current,
  };
}