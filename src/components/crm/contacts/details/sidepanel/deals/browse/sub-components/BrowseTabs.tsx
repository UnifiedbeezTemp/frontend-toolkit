"use client";

import React from "react";
import { BrowseTab } from "../hooks/useBrowseDeals";
import { cn } from "../../../../../../../../lib/utils";

interface BrowseTabsProps {
  activeTab: BrowseTab;
  onTabChange: (tab: BrowseTab) => void;
}

const tabs = [
  { label: "Browse Abandonment (0)", value: "abandonment" as const },
  { label: "Orders (0)", value: "orders" as const },
  { label: "Reoccurring Payments (0)", value: "payments" as const },
];

export default function BrowseTabs({
  activeTab,
  onTabChange,
}: BrowseTabsProps) {
  return (
    <div className="flex border-b border-input-stroke items-center justify-around w-full">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onTabChange(tab.value)}
          className={cn(
            "px-[.6rem] py-[1.2rem] sm:w-full lg:w-auto border-r border-input-stroke last:border-0 text-[1.09rem] font-bold transition-all w-auto",
            activeTab === tab.value
              ? "text-dark-base-100 bg-primary"
              : "text-dark-base-40 bg-input-filled",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
