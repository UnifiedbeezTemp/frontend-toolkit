"use client";

import { useEffect, useCallback, useRef } from "react";

interface UseDropdownInteractionsProps {
  isOpen: boolean;
  onClose: () => void;
  dropdownRef: React.RefObject<HTMLElement | null>;
  triggerRef: React.RefObject<HTMLElement | null>;
  closeOnOutsideClick?: boolean;
  closeOnClick?: boolean;
  onPositionChange?: () => void;
}

/**
 * HOOK: useDropdownInteractions
 * 
 * PURPOSE:
 * Handles all dropdown interactions including:
 * - Outside clicks
 * - Keyboard navigation
 * - Scroll and resize events
 * 
 * USAGE:
 * useDropdownInteractions({
 *   isOpen,
 *   onClose,
 *   dropdownRef,
 *   triggerRef,
 *   closeOnOutsideClick: true
 * });
 * 
 * FEATURES:
 * - ESC key to close
 * - Arrow key navigation
 * - Outside click detection
 * - Auto-close on window resize/scroll
 */

export function useDropdownInteractions({
  isOpen,
  onClose,
  dropdownRef,
  triggerRef,
  closeOnOutsideClick = true,
  closeOnClick = true,
  onPositionChange,
}: UseDropdownInteractionsProps) {
  const isOpenRef = useRef(isOpen);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !closeOnOutsideClick) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose, closeOnOutsideClick, dropdownRef, triggerRef]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowDown":
        case "ArrowUp":
          event.preventDefault();
          // TODO: Implement focus management
          break;
        case "Tab":
          onClose();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const handleResize = () => {
      if (onPositionChange) {
        onPositionChange();
      } else {
        onClose();
      }
    };

    let resizeTimeout: NodeJS.Timeout;
    const handleDebouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 100);
    };

    window.addEventListener("resize", handleDebouncedResize);
    
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY) > 50) {
        onClose();
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", handleDebouncedResize);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(resizeTimeout);
    };
  }, [isOpen, onClose, onPositionChange]);

  const handleDropdownClick = useCallback(() => {
    if (closeOnClick && isOpenRef.current) {
      onClose();
    }
  }, [closeOnClick, onClose]);

  return {
    handleDropdownClick,
  };
}