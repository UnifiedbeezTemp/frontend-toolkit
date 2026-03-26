"use client";

import React from "react";
import LibraryAutomationTableHeader from "./sub-components/LibraryAutomationTableHeader";
import LibraryAutomationTableRow from "./sub-components/LibraryAutomationTableRow";
import MobileLibraryAutomationList from "./sub-components/MobileLibraryAutomationList";
import Pagination from "../../../ui/Pagination";
import { useLibraryAutomationTable } from "./hooks/useLibraryAutomationTable";

export default function LibraryAutomationTable() {
  const {
    selectedCategory,
    handleCategoryChange,
    searchQuery,
    handleSearchChange,
    statusFilter,
    handleStatusFilterChange,
    currentAutomations,
    currentPage,
    totalPages,
    setCurrentPage,
    selectedIds,
    handleSelect,
    handleNewAutomation,
    handleUpdateBusinessGoal,
  } = useLibraryAutomationTable();

  return (
    <div
     className="flex flex-col w-full border border-[var(--input-stroke)] rounded-[1.2rem] overflow-hidden bg-[var(--primary)] shadow-sm"
     >
      <LibraryAutomationTableHeader
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        statusFilter={statusFilter}
        onStatusFilterChange={handleStatusFilterChange}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onNewAutomation={handleNewAutomation}
      />

      {/* Desktop Table */}
      <div className="hidden sm:block w-full overflow-x-auto overflow-y-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[var(--gray-50)]/50 border-b border-[var(--input-stroke)]">
              <th className="py-[1.2rem] px-[1.6rem] text-left text-[1.2rem] font-bold text-[var(--dark-base-40)] uppercase tracking-wider border-r border-[var(--input-stroke)]">
                Automation Name
              </th>
              <th className="py-[1.2rem] px-[1.6rem] text-left text-[1.2rem] font-bold text-[var(--dark-base-40)] uppercase tracking-wider border-r border-[var(--input-stroke)]">
                Business Goals / Label
              </th>
              <th className="py-[1.2rem] px-[1.6rem] text-center text-[1.2rem] font-bold text-[var(--dark-base-40)] uppercase tracking-wider border-r border-[var(--input-stroke)]">
                Status
              </th>
              <th className="py-[1.2rem] px-[1.6rem] text-center text-[1.2rem] font-bold text-[var(--dark-base-40)] uppercase tracking-wider border-r border-[var(--input-stroke)]">
                Last Edited
              </th>
              <th className="py-[1.2rem] px-[1.6rem] text-center text-[1.2rem] font-bold text-[var(--dark-base-40)] uppercase tracking-wider">
                Current Contact
              </th>
            </tr>
          </thead>
          <tbody>
            {currentAutomations.length > 0 ? (
              currentAutomations.map((automation, index) => (
                <LibraryAutomationTableRow
                  key={automation.id}
                  automation={automation}
                  isSelected={selectedIds.includes(automation.id)}
                  onSelect={handleSelect}
                  onUpdateBusinessGoal={handleUpdateBusinessGoal}
                  isLast={index === currentAutomations.length - 1}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="py-[4.8rem] text-center text-[var(--text-secondary)] text-[1.6rem]"
                >
                  No automations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile view */}
      {currentAutomations.length > 0 ? (
        <MobileLibraryAutomationList
          automations={currentAutomations}
          selectedIds={selectedIds}
          onSelect={handleSelect}
          onUpdateBusinessGoal={handleUpdateBusinessGoal}
        />
      ) : (
        <div className="sm:hidden py-[4.8rem] text-center text-[var(--text-secondary)] text-[1.4rem] bg-[var(--primary)] border-b border-[var(--input-stroke)]">
          No automations found.
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        className="border-none"
      />
    </div>
  );
}
