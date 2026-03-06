"use client";

import { useState, useCallback } from "react";

export type BrowseTab = "abandonment" | "orders" | "payments";

export function useBrowseDeals() {
  const [activeTab, setActiveTab] = useState<BrowseTab>("abandonment");

  const handleTabChange = useCallback((tab: BrowseTab) => {
    setActiveTab(tab);
  }, []);

  return {
    activeTab,
    handleTabChange,
  };
}
