import React from "react";
import Tabs from "../../ui/Tabs";
import { ViewTab } from "../types";

interface SalesTrendsHeaderProps {
  activeView: ViewTab;
  viewTabs: { label: string; value: string | number }[];
  onViewChange: (view: string | number) => void;
}

export default function SalesTrendsHeader({
  activeView,
  viewTabs,
  onViewChange,
}: SalesTrendsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-[1rem] justify-between px-[1rem] sm:px-[2rem] pt-[1rem] sm:pt-[2rem]">
      <h2 className="text-[1.5rem] sm:text-[2rem] font-bold text-text-secondary">
        Sales Trends & Analytics
      </h2>

      <Tabs
        tabs={viewTabs}
        activeTab={activeView}
        onTabChange={onViewChange}
        variant="default"
        fullWidth={false}
        size="sm"
        className="p-[.5rem]"
      />
    </div>
  );
}
