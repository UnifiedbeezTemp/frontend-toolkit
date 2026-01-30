import { useState, useRef } from "react";

export const DAYS = [
  { value: "MONDAY", label: "Monday" },
  { value: "TUESDAY", label: "Tuesday" },
  { value: "WEDNESDAY", label: "Wednesday" },
  { value: "THURSDAY", label: "Thursday" },
  { value: "FRIDAY", label: "Friday" },
  { value: "SATURDAY", label: "Saturday" },
  { value: "SUNDAY", label: "Sunday" },
];

export const useWorkingDaysField = (
  value: string[],
  onChange: (days: string[]) => void,
) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const toggleDay = (dayValue: string) => {
    if (value.includes(dayValue)) {
      onChange(value.filter((d) => d !== dayValue));
    } else {
      onChange([...value, dayValue]);
    }
  };

  return {
    isOpen,
    triggerRef,
    handleToggle,
    handleClose,
    toggleDay,
  };
};
