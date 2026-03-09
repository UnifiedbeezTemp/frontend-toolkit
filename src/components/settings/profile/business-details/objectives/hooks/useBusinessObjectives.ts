import { useState, useRef } from "react";
import { BusinessInfo } from "../../utils/types";
import { BusinessObjective } from "../../../../../../types/businessObjectiveTypes";

interface UseBusinessObjectivesProps {
  currentInfo: BusinessInfo;
  setEditingInfo: (value: BusinessInfo) => void;
  isEditing: boolean;
}

export function useBusinessObjectives({
  currentInfo,
  setEditingInfo,
  isEditing,
}: UseBusinessObjectivesProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleToggleObjective = (objective: BusinessObjective) => {
    const isSelected = currentInfo.objectives.some(
      (o) => o.title === objective.title
    );

    let newObjectives;
    if (isSelected) {
      if (currentInfo.objectives.length <= 1) return;
      newObjectives = currentInfo.objectives.filter(
        (o) => o.title !== objective.title
      );
    } else {
      newObjectives = [
        ...currentInfo.objectives,
        {
          id: objective.id,
          title: objective.title,
          description: objective.description,
        },
      ];
    }

    setEditingInfo({
      ...currentInfo,
      objectives: newObjectives,
    });
  };

  const handleToggleDropdown = () => {
    if (isEditing) {
      setShowDropdown(!showDropdown);
    }
  };

  const handleCloseDropdown = () => {
    setShowDropdown(false);
  };

  return {
    showDropdown,
    triggerRef,
    handleToggleObjective,
    handleToggleDropdown,
    handleCloseDropdown,
  };
}
