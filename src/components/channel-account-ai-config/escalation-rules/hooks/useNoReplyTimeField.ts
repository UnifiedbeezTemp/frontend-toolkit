import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export const OPTIONS = ["30 Sec", "1 min", "5 mins", "10 mins", "Custom"];

export const UNIT_OPTIONS = [
  { label: "Seconds", value: "sec" },
  { label: "Minutes", value: "min" },
  { label: "Hours", value: "hour" },
];

const DEFAULT_PRESET = "5 mins";

function extractUnit(
  val: string | null,
  unitOptions: { label: string; value: string }[],
): string {
  if (!val) return unitOptions[1]?.value ?? "min";
  const lower = val.toLowerCase();
  if (lower.includes("sec")) return "sec";
  if (lower.includes("hour")) return "hour";
  return "min";
}

export const useNoReplyTimeField = (
  value: string | null,
  onChange: (value: string) => void,
  config?: {
    options?: string[];
    unitOptions?: { label: string; value: string }[];
  },
) => {
  const options = config?.options ?? OPTIONS;
  const unitOptions = config?.unitOptions ?? UNIT_OPTIONS;

  const [isOpen, setIsOpen] = useState(false);
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [customUnit, setCustomUnit] = useState(unitOptions[1]?.value ?? "min");
  const [isUnitOpen, setIsUnitOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const unitTriggerRef = useRef<HTMLButtonElement>(null);

  const isPresetValue = useMemo(() => {
    return options.slice(0, -1).includes(value || "");
  }, [options, value]);

  useEffect(() => {
    if (value && !isPresetValue && value !== "Custom" && !isCustomMode) {
      setIsCustomMode(true);
      setCustomAmount(value.match(/\d+/)?.[0] || "");
      setCustomUnit(extractUnit(value, unitOptions));
    }
  }, [value, isPresetValue, isCustomMode, unitOptions]);

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
        setCustomUnit(extractUnit(value, unitOptions));
        setIsOpen(false);
      } else {
        setIsCustomMode(false);
        setCustomAmount("");
        onChange(option);
        setIsOpen(false);
      }
    },
    [onChange, unitOptions, value],
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
    unitOptions.find((u) => u.value === customUnit)?.label || "Minutes";

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
    options,
    unitOptions,
  };
};
