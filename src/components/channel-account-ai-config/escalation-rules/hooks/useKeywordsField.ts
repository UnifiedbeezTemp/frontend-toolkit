import { useState, useRef, KeyboardEvent } from "react";

export const SUGGESTED_KEYWORDS = [
  "Alarm",
  "Energetic",
  "Warm",
  "Classic",
  "Direct",
  "Luxury",
  "Hospitable",
  "Funny",
  "Approachable",
  "Youthful",
  "Minimal",
];

export const useKeywordsField = (
  value: string[],
  onChange: (keywords: string[]) => void,
) => {
  const [inputValue, setInputValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownTriggerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!value.includes(inputValue.trim())) {
        onChange([...value, inputValue.trim()]);
      }
      setInputValue("");
    } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
    setIsDropdownOpen(true);
  };

  const handleInputFocus = () => {
    setIsDropdownOpen(true);
  };

  const removeKeyword = (keyword: string) => {
    onChange(value.filter((k) => k !== keyword));
  };

  const addSuggestedKeyword = (keyword: string) => {
    if (!value.includes(keyword) && value.length < 10) {
      onChange([...value, keyword]);
    }
    setIsDropdownOpen(false);
  };

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCloseDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const availableSuggestions = SUGGESTED_KEYWORDS.filter(
    (k) => !value.includes(k),
  );

  return {
    inputValue,
    isDropdownOpen,
    inputRef,
    dropdownTriggerRef,
    availableSuggestions,
    handleKeyDown,
    handleInputChange,
    handleInputFocus,
    removeKeyword,
    addSuggestedKeyword,
    handleToggleDropdown,
    handleCloseDropdown,
    handleContainerClick,
  };
};
