import { useState, useRef, useCallback, useMemo, useEffect } from "react";

export const OPTIONS = [
  "5 messages",
  "10 messages",
  "15 messages",
  "25 messages",
  "Custom",
];

const DEFAULT_PRESET = "10 messages";

export const useUnansweredMessagesField = (
  value: string | null,
  onChange: (value: string) => void,
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customValue, setCustomValue] = useState("");
  const triggerRef = useRef<HTMLButtonElement>(null);

  const isPresetValue = useMemo(() => {
    return OPTIONS.slice(0, -1).includes(value || "");
  }, [value]);

  useEffect(() => {
    if (value && !isPresetValue && value !== "Custom" && !isCustomMode) {
      setIsCustomMode(true);
      setCustomValue(value.replace(/\D/g, "") || "");
    }
  }, [value, isPresetValue, isCustomMode]);

  const showCustomInput = isCustomMode;

  const handleToggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSelect = useCallback(
    (option: string) => {
      if (option === "Custom") {
        setIsCustomMode(true);
        setCustomValue(value?.replace(/\D/g, "") || "");
        setIsOpen(false);
      } else {
        setIsCustomMode(false);
        setCustomValue("");
        onChange(option);
        setIsOpen(false);
      }
    },
    [onChange, value],
  );

  const handleCustomChange = useCallback(
    (inputValue: string) => {
      const numericValue = inputValue.replace(/\D/g, "");
      setCustomValue(numericValue);
      if (numericValue) {
        onChange(`${numericValue} messages`);
      }
    },
    [onChange],
  );

  const handleExitCustomMode = useCallback(() => {
    setIsCustomMode(false);
    setCustomValue("");
    onChange(DEFAULT_PRESET);
  }, [onChange]);

  return {
    isOpen,
    triggerRef,
    showCustomInput,
    customValue,
    handleToggle,
    handleClose,
    handleSelect,
    handleCustomChange,
    handleExitCustomMode,
  };
};
