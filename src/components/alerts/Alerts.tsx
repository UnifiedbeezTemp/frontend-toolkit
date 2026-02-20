"use client";

import React from "react";
import { useAlerts } from "./hooks/useAlerts";
import AlertsHeader from "./sub-components/AlertsHeader";
import AlertsList from "./sub-components/AlertsList";

export default function Alerts() {
  const {
    alerts,
    categories,
    selectedCategory,
    isCategoryOpen,
    categoryTriggerRef,
    newCount,
    handleCategorySelect,
    toggleCategoryDropdown,
    closeCategoryDropdown,
  } = useAlerts();

  return (
    <div className="flex flex-col w-full lg:mt-[2rem] bg-primary border border-input-stroke rounded-[1.6rem] overflow-hidden max-h-[48rem]">
      <AlertsHeader
        newCount={newCount}
        selectedCategory={selectedCategory}
        categories={categories}
        isCategoryOpen={isCategoryOpen}
        categoryTriggerRef={categoryTriggerRef}
        onToggleCategory={toggleCategoryDropdown}
        onCloseCategory={closeCategoryDropdown}
        onSelectCategory={handleCategorySelect}
      />

      <div className="overflow-y-auto flex-1">
        <AlertsList alerts={alerts} />
      </div>
    </div>
  );
}
