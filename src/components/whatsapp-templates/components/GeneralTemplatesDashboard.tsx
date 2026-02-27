import React from "react";
import WhatsAppTemplatesControls from "./WhatsAppTemplatesControls";
import GeneralTemplatesTable from "./GeneralTemplatesTable";
import Button from "../../ui/Button";
import Pagination from "../../ui/Pagination";
import PlusIcon from "../../../assets/icons/PlusIcon";

import { GeneralTemplatesDashboardProps } from "../types";

export default function GeneralTemplatesDashboard({
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
}: GeneralTemplatesDashboardProps) {
  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[1.6rem] mb-[2.4rem] px-[1.6rem] sm:px-0">
        <div className="flex flex-col">
          <h2 className="text-[2rem] font-bold text-text-secondary">
            Manage General templates
          </h2>
          <p className="text-[1.4rem] text-text-primary">
            Build reusable messages for faster replies
          </p>
        </div>

        <Button
          variant="primary"
          onClick={onCreateClick}
          className="flex items-center gap-[0.8rem] px-[1.6rem] py-[1rem] grad-btn text-white rounded-[0.8rem] text-[1.4rem] font-bold shadow-sm self-start sm:self-center"
        >
          <PlusIcon size={14} color="white" />
          <span>Create new template</span>
        </Button>
      </div>

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
        <GeneralTemplatesTable
          templates={templates}
          selectedIds={selectedTemplateIds}
          onToggleSelect={onToggleSelect}
          onToggleAll={onToggleAll}
          onDelete={onDelete}
        />
        {templates.length === 0 && (
          <div className="flex flex-col items-center justify-center py-[6rem] px-[2.4rem] text-center border-t border-border bg-primary">
            <h3 className="text-[1.8rem] font-bold text-text-secondary mb-[0.8rem]">
              No templates found
            </h3>
            <p className="text-[1.4rem] text-text-primary mb-[1.6rem]">
              Try adjusting your search or filters.
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
