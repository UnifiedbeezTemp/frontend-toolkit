import { useState, useRef } from "react";

export const OPTIONS = [
  "Sales Follow-up",
  "Customer Support",
  "Booking Reminder",
  "Cold Lead Nudge",
  "Abandoned Cart Recovery",
  "Onboarding & Setup Help",
  "Custom Template",
];

export const useFollowUpContentTypeField = (
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
