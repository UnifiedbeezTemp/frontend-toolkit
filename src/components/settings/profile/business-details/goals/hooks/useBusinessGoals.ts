import { useState, useRef } from "react";
import { BusinessGoal } from "@/shared/src/types/businessGoalTypes";
import { BusinessInfo } from "../../utils/types";

interface UseBusinessGoalsProps {
  currentInfo: BusinessInfo;
  setEditingInfo: (value: BusinessInfo) => void;
  isEditing: boolean;
}

export function useBusinessGoals({
  currentInfo,
  setEditingInfo,
  isEditing,
}: UseBusinessGoalsProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleSelectGoal = (goal: BusinessGoal) => {
    const isSelected = currentInfo.goals.some((g) => g.title === goal.title);
    let newGoals;

    if (isSelected) {
      if (currentInfo.goals.length <= 1) return;
      newGoals = currentInfo.goals.filter((g) => g.title !== goal.title);
    } else {
      newGoals = [
        ...currentInfo.goals,
        { id: goal.id, title: goal.title, description: goal.description },
      ];
    }

    setEditingInfo({
      ...currentInfo,
      goals: newGoals,
    });
  };

  const handleToggleDropdown = () => {
    if (isEditing) {
      setShowDropdown((prev) => !prev);
    }
  };

  const handleCloseDropdown = () => {
    setShowDropdown(false);
  };

  return {
    showDropdown,
    triggerRef,
    handleSelectGoal,
    handleToggleDropdown,
    handleCloseDropdown,
  };
}
