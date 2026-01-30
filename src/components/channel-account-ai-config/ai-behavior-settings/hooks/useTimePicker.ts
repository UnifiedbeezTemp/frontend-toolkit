import { useState, useRef } from "react";

export const HOURS = Array.from({ length: 12 }, (_, i) =>
  String(i + 1).padStart(2, "0"),
);
export const MINUTES = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, "0"),
);
export const PERIODS = ["AM", "PM"] as const;

export const useTimePicker = (
  hours: string,
  minutes: string,
  period: "AM" | "PM",
  onChange: (hours: string, minutes: string, period: "AM" | "PM") => void,
) => {
  const [isHoursOpen, setIsHoursOpen] = useState(false);
  const [isMinutesOpen, setIsMinutesOpen] = useState(false);
  const [isPeriodOpen, setIsPeriodOpen] = useState(false);
  const hoursRef = useRef<HTMLInputElement>(null);
  const minutesRef = useRef<HTMLInputElement>(null);
  const hoursDropdownRef = useRef<HTMLButtonElement>(null);
  const minutesDropdownRef = useRef<HTMLButtonElement>(null);
  const periodRef = useRef<HTMLButtonElement>(null);

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value === "") {
      onChange("", minutes, period);
      return;
    }
    const numValue = parseInt(value);
    if (isNaN(numValue)) {
      onChange("", minutes, period);
      return;
    }
    const clampedValue = Math.min(Math.max(numValue, 1), 12);
    onChange(String(clampedValue), minutes, period);
  };

  const handleHoursBlur = () => {
    if (hours && hours !== "") {
      const numValue = parseInt(hours);
      if (!isNaN(numValue)) {
        const clampedValue = Math.min(Math.max(numValue, 1), 12);
        onChange(String(clampedValue).padStart(2, "0"), minutes, period);
      }
    }
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value === "") {
      onChange(hours, "", period);
      return;
    }
    const numValue = parseInt(value);
    if (isNaN(numValue)) {
      onChange(hours, "", period);
      return;
    }
    const clampedValue = Math.min(Math.max(numValue, 0), 59);
    onChange(hours, String(clampedValue), period);
  };

  const handleMinutesBlur = () => {
    if (minutes && minutes !== "") {
      const numValue = parseInt(minutes);
      if (!isNaN(numValue)) {
        const clampedValue = Math.min(Math.max(numValue, 0), 59);
        onChange(hours, String(clampedValue).padStart(2, "0"), period);
      }
    }
  };

  const handleHoursToggle = () => {
    setIsHoursOpen(!isHoursOpen);
    setIsMinutesOpen(false);
    setIsPeriodOpen(false);
  };

  const handleHoursClose = () => {
    setIsHoursOpen(false);
  };

  const handleHoursSelect = (hour: string) => {
    onChange(hour, minutes, period);
    setIsHoursOpen(false);
  };

  const handleMinutesToggle = () => {
    setIsMinutesOpen(!isMinutesOpen);
    setIsHoursOpen(false);
    setIsPeriodOpen(false);
  };

  const handleMinutesClose = () => {
    setIsMinutesOpen(false);
  };

  const handleMinutesSelect = (minute: string) => {
    onChange(hours, minute, period);
    setIsMinutesOpen(false);
  };

  const handlePeriodToggle = () => {
    setIsPeriodOpen(!isPeriodOpen);
    setIsHoursOpen(false);
    setIsMinutesOpen(false);
  };

  const handlePeriodClose = () => {
    setIsPeriodOpen(false);
  };

  const handlePeriodSelect = (newPeriod: "AM" | "PM") => {
    onChange(hours, minutes, newPeriod);
    setIsPeriodOpen(false);
  };

  return {
    isHoursOpen,
    isMinutesOpen,
    isPeriodOpen,
    hoursRef,
    minutesRef,
    hoursDropdownRef,
    minutesDropdownRef,
    periodRef,
    handleHoursToggle,
    handleHoursClose,
    handleHoursSelect,
    handleMinutesToggle,
    handleMinutesClose,
    handleMinutesSelect,
    handlePeriodToggle,
    handlePeriodClose,
    handlePeriodSelect,
    handleHoursChange,
    handleHoursBlur,
    handleMinutesChange,
    handleMinutesBlur,
  };
};
