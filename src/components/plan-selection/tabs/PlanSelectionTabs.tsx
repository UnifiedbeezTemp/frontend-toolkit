import React from "react";
import Tabs from "../../ui/Tabs";

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
    <Tabs
      tabs={["Monthly", "Yearly(Save15%)"]}
      className={`w-fit border-[1px] ${className}`}
      activeTab={isYearly ? "Yearly(Save15%)" : "Monthly"}
      onTabChange={(tab) => onTabChange(tab === "Yearly(Save15%)")}
    />
  );
}
