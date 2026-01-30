import { useState, useRef } from "react";

export const OPTIONS = [
  "10 minutes",
  "30 minutes",
  "1 hour",
  "2 hours",
  "5 hours",
  "12 hours",
  "24 hours",
  "48 hours",
];

export const useDelayBeforeFollowUpField = (
  value: string | null,
  onChange: (value: string) => void,
) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return {
    isOpen,
    triggerRef,
    handleToggle,
    handleClose,
    handleSelect,
  };
};
