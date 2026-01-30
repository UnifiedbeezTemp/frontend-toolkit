import { useState, useRef, useCallback, useMemo, useEffect } from "react";

export const OPTIONS = ["30 Sec", "1 min", "5 mins", "10 mins", "Custom"];

export const UNIT_OPTIONS = [
  { label: "Seconds", value: "sec" },
  { label: "Minutes", value: "min" },
  { label: "Hours", value: "hour" },
];

const DEFAULT_PRESET = "5 mins";

function extractUnit(val: string | null): string {
  if (!val) return "min";
  const lower = val.toLowerCase();
  if (lower.includes("sec")) return "sec";
  if (lower.includes("hour")) return "hour";
  return "min";
}

export const useNoReplyTimeField = (
  value: string | null,
  onChange: (value: string) => void,
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [customUnit, setCustomUnit] = useState("min");
  const [isUnitOpen, setIsUnitOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const unitTriggerRef = useRef<HTMLButtonElement>(null);

  const isPresetValue = useMemo(() => {
    return OPTIONS.slice(0, -1).includes(value || "");
  }, [value]);

  useEffect(() => {
    if (value && !isPresetValue && value !== "Custom" && !isCustomMode) {
      setIsCustomMode(true);
      setCustomAmount(value.match(/\d+/)?.[0] || "");
      setCustomUnit(extractUnit(value));
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
        setCustomAmount(value?.match(/\d+/)?.[0] || "");
        setCustomUnit(extractUnit(value));
        setIsOpen(false);
      } else {
        setIsCustomMode(false);
        setCustomAmount("");
        onChange(option);
        setIsOpen(false);
      }
    },
    [onChange, value],
  );

  const handleCustomAmountChange = useCallback(
    (inputValue: string) => {
      const numericValue = inputValue.replace(/\D/g, "");
      setCustomAmount(numericValue);
      if (numericValue) {
        const unitLabel =
          customUnit === "sec" ? "Sec" : customUnit === "min" ? "min" : "hour";
        const plural =
          parseInt(numericValue) > 1 && customUnit !== "sec" ? "s" : "";
        onChange(`${numericValue} ${unitLabel}${plural}`);
      }
    },
    [onChange, customUnit],
  );

  const handleUnitChange = useCallback(
    (unit: string) => {
      setCustomUnit(unit);
      setIsUnitOpen(false);
      if (customAmount) {
        const unitLabel =
          unit === "sec" ? "Sec" : unit === "min" ? "min" : "hour";
        const plural = parseInt(customAmount) > 1 && unit !== "sec" ? "s" : "";
        onChange(`${customAmount} ${unitLabel}${plural}`);
      }
    },
    [onChange, customAmount],
  );

  const handleExitCustomMode = useCallback(() => {
    setIsCustomMode(false);
    setCustomAmount("");
    onChange(DEFAULT_PRESET);
  }, [onChange]);

  const toggleUnitDropdown = useCallback(() => {
    setIsUnitOpen(!isUnitOpen);
  }, [isUnitOpen]);

  const closeUnitDropdown = useCallback(() => {
    setIsUnitOpen(false);
  }, []);

  const currentUnitLabel =
    UNIT_OPTIONS.find((u) => u.value === customUnit)?.label || "Minutes";

  return {
    isOpen,
    triggerRef,
    unitTriggerRef,
    showCustomInput,
    customAmount,
    customUnit,
    currentUnitLabel,
    isUnitOpen,
    handleToggle,
    handleClose,
    handleSelect,
    handleCustomAmountChange,
    handleUnitChange,
    handleExitCustomMode,
    toggleUnitDropdown,
    closeUnitDropdown,
  };
};
