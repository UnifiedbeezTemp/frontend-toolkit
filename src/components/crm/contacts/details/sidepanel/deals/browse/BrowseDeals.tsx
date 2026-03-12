"use client";

import React from "react";
import { useBrowseDeals } from "./hooks/useBrowseDeals";
import BrowseTabs from "./sub-components/BrowseTabs";
import BrowseTableHeader from "./sub-components/BrowseTableHeader";
import BrowseEmptyState from "./sub-components/BrowseEmptyState";

export default function BrowseDeals() {
  const { activeTab, handleTabChange } = useBrowseDeals();

  const getEmptyMessage = () => {
    switch (activeTab) {
      case "abandonment":
        return "You have no Abandonment available";
      case "orders":
        return "You have no orders available";
      case "payments":
        return "You have no payments available";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col border border-input-stroke rounded-[1.2rem] overflow-hidden bg-primary">
      <BrowseTabs activeTab={activeTab} onTabChange={handleTabChange} />
      <BrowseTableHeader />
      <div className="flex items-center justify-center p-[2.4rem]">
        <BrowseEmptyState message={getEmptyMessage()} />
      </div>
    </div>
  );
}
