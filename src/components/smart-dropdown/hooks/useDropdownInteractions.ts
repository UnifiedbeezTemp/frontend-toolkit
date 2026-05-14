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

    const getFocusableItems = () => {
      if (!dropdownRef.current) return [];

      return Array.from(
        dropdownRef.current.querySelectorAll<HTMLElement>(
          [
            "button:not([disabled])",
            "a[href]",
            "input:not([disabled])",
            "textarea:not([disabled])",
            "select:not([disabled])",
            "[tabindex]:not([tabindex='-1'])",
          ].join(","),
        ),
      );
    };

    const focusItem = (index: number) => {
      const focusableItems = getFocusableItems();
      if (focusableItems.length === 0) return;

      const nextIndex =
        (index + focusableItems.length) % focusableItems.length;
      focusableItems[nextIndex].focus();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const focusableItems = getFocusableItems();
      const currentIndex = focusableItems.findIndex(
        (item) => item === document.activeElement,
      );

      switch (event.key) {
        case "Escape":
          onClose();
          triggerRef.current?.focus();
          break;
        case "ArrowDown":
          event.preventDefault();
          focusItem(currentIndex + 1);
          break;
        case "ArrowUp":
          event.preventDefault();
          focusItem(currentIndex - 1);
          break;
        case "Home":
          event.preventDefault();
          focusItem(0);
          break;
        case "End":
          event.preventDefault();
          focusItem(focusableItems.length - 1);
          break;
        case "Tab":
          onClose();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [dropdownRef, isOpen, onClose, triggerRef]);

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
