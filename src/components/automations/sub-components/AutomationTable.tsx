"use client";

import React from "react";
import { useAutomationTable } from "../hooks/useAutomationTable";
import DesktopAutomationTable from "./DesktopAutomationTable";
import MobileAutomationList from "./MobileAutomationList";
import PaginationControls from "./PaginationControls";
import AutomationEmptyState from "./AutomationEmptyState";
import AutomationNoResultsState from "./AutomationNoResultsState";

export default function AutomationTable() {
  const {
    filteredAutomations,
    currentAutomations,
    icons,
    currentPage,
    totalPages,
    handlePrevious,
    handleNext,
    handlePageChange,
    getPageNumbers,
    totalCount,
  } = useAutomationTable();

  if (totalCount === 0) {
    return <AutomationEmptyState />;
  }

  if (filteredAutomations.length === 0) {
    return <AutomationNoResultsState />;
  }

  return (
    <div className="w-full overflow-x-auto">
      <DesktopAutomationTable currentAutomations={currentAutomations} />

      <MobileAutomationList
        currentAutomations={currentAutomations}
        icons={icons}
      />

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        handlePageChange={handlePageChange}
        getPageNumbers={getPageNumbers}
        icons={icons}
        hasAutomations={filteredAutomations.length > 0}
      />
    </div>
  );
}
