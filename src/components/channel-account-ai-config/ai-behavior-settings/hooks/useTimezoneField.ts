import { useRef, useState } from "react";

export const useTimezoneField = (
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

  const handleSelect = (timezoneValue: string) => {
    onChange(timezoneValue);
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
