"use client";

import { useState, useRef, useEffect, useCallback } from "react";

export const useAddonHeader = (onRemove?: () => void) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleMenu = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  const handleRemoveClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onRemove?.();
      closeMenu();
    },
    [onRemove, closeMenu],
  );

  return {
    isMenuOpen,
    menuRef,
    toggleMenu,
    handleRemoveClick,
  };
};
