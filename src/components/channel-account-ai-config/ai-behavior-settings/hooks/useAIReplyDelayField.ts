import { useState, useRef } from "react";

export const OPTIONS = ["30 Sec", "1 min", "5 mins", "10 mins", "Custom"];

export const useAIReplyDelayField = (
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
