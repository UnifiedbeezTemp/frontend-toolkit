"use client";

import { useState, useRef, useEffect } from "react";

export interface DropdownOption {
  label: string;
  value: string;
}

interface UseDropdownProps {
  options: DropdownOption[];
  value: string;
  onSelect: (value: string) => void;
  placeholder?: string;
}

export function useDropdown({
  options,
  value,
  onSelect,
  placeholder = "Select",
}: UseDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (selectedValue: string) => {
    onSelect(selectedValue);
    setIsOpen(false);
  };

  const clearSelection = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsOpen(false);
    onSelect("");
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const getCurrentLabel = () => {
    return options.find((option) => option.value === value)?.label || placeholder;
  };

  return {
    isOpen,
    dropdownRef,
    handleSelect,
    clearSelection,
    toggleDropdown,
    getCurrentLabel,
  };
}