import { useMemo, useRef, useState } from "react";
import { useUser } from "@/shared/src/contexts/UserContext";
import { useEscalationKeywordsOptions } from "@/shared/src/api/services/configuration/hooks/useEscalationKeywordsOptions";

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
  const { user } = useUser();
  const industryType = user?.industry ?? "";
  const keywordsQuery = useEscalationKeywordsOptions(industryType);

  const [inputValue, setInputValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownTriggerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
    if (!value.includes(keyword)) {
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

  const suggestions = useMemo(() => {
    const remote = keywordsQuery.data?.keywords;
    if (Array.isArray(remote) && remote.length > 0) return remote;
    return SUGGESTED_KEYWORDS;
  }, [keywordsQuery.data?.keywords]);

  const availableSuggestions = useMemo(() => {
    return suggestions
      .filter((k): k is string => typeof k === "string")
      .map((k) => k.trim())
      .filter((k) => k.length > 0 && !value.includes(k));
  }, [suggestions, value]);

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
    isLoadingSuggestions: keywordsQuery.isLoading || keywordsQuery.isFetching,
  };
};
