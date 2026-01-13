import React from "react";
import PlanSelectionToggle from "./PlanSelectionToggle";

interface PlanSelectionTabsProps {
  isYearly: boolean;
  onTabChange: (isYearly: boolean) => void;
  className?: string;
}

export default function PlanSelectionTabs({
  isYearly,
  onTabChange,
  className = "",
}: PlanSelectionTabsProps) {
  return (
    <PlanSelectionToggle
      isYearly={isYearly}
      onTabChange={onTabChange}
      className={className}
    />
  );
}
