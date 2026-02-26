import React from "react";
import WhatsAppAccountsSection from "./WhatsAppAccountsSection";
import WhatsAppTemplatesControls from "./WhatsAppTemplatesControls";
import WhatsAppTemplatesTable from "./WhatsAppTemplatesTable";
import { TemplatesDashboardProps } from "../types";
import Pagination from "../../ui/Pagination";
import SearchIcon from "../../../assets/icons/SearchIcon";
import Button from "../../ui/Button";

export function TemplatesDashboard({
  accounts,
  selectedAccount,
  onAccountChange,
  onCreateClick,
  templates,
  searchQuery,
  onSearchChange,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  resetFilters,
  selectedTemplateIds,
  onToggleSelect,
  onToggleAll,
  onDelete,
  currentPage,
  totalPages,
  onPageChange,
}: TemplatesDashboardProps) {
  return (
    <div className="w-full">
      <WhatsAppAccountsSection
        accounts={accounts}
        selectedAccount={selectedAccount}
        onAccountChange={onAccountChange}
        onCreateClick={onCreateClick}
      />

      <div className="lg:border border-input-stroke rounded-[1rem] overflow-hidden">
        <WhatsAppTemplatesControls
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          resetFilters={resetFilters}
        />
        <WhatsAppTemplatesTable
          templates={templates}
          selectedIds={selectedTemplateIds}
          onToggleSelect={onToggleSelect}
          onToggleAll={onToggleAll}
          onDelete={onDelete}
        />
        {templates.length === 0 && (
          <div className="flex flex-col items-center justify-center py-[6rem] px-[2.4rem] text-center border-t border-border bg-primary">
            <div className="w-[6.4rem] h-[6.4rem] rounded-full bg-black-5 flex items-center justify-center mb-[1.6rem]">
              <SearchIcon size={32} className="text-text-primary opacity-20" />
            </div>
            <h3 className="text-[1.8rem] font-bold text-text-secondary mb-[0.8rem]">
              No templates found
            </h3>
            <p className="text-[1.4rem] text-text-primary max-w-[32rem] mb-[1.6rem]">
              We couldn't find any templates matching your search or filters.
              Try adjusting them or create a new one.
            </p>
            <Button
              variant="secondary"
              onClick={resetFilters}
              className="text-brand-primary border-brand-primary hover:bg-brand-primary/5 px-[2.4rem]"
            >
              Clear all filters
            </Button>
          </div>
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          className="border-0 sm:border-y lg:border-t lg:border-0 lg:border-t px-[1.6rem]"
        />
      </div>
    </div>
  );
}
