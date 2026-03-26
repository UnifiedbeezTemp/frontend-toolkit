import { useState, useRef } from "react";
import { BusinessInfo } from "../../utils/types";

interface UseIndustryDropdownProps {
  currentInfo: BusinessInfo;
  setEditingInfo: (value: BusinessInfo) => void;
  isEditing: boolean;
}

export function useIndustryDropdown({ isEditing }: UseIndustryDropdownProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleToggleDropdown = () => {
    if (isEditing) {
      setShowDropdown(true);
    }
  };

  const handleCloseDropdown = () => {
    setShowDropdown(false);
  };

  const handleContinue = () => {
    const manualOnboardingUrl =
      process.env.NEXT_PUBLIC_MANUAL_ONBOARDING_URL || "";
    window.location.href = `${manualOnboardingUrl}/2?substep=2`;
  };

  return {
    showDropdown,
    triggerRef,
    handleToggleDropdown,
    handleCloseDropdown,
    handleContinue,
  };
}
