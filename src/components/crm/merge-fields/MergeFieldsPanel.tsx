"use client";

import { useMergeFields } from "./hooks/useMergeFields";
import Tabs from "../../ui/Tabs";
import { MERGE_FIELD_TABS } from "./constants";
import FieldsHeader from "./sub-components/FieldsHeader";
import FieldsTable from "./sub-components/FieldsTable";
import FieldDetailsModal from "./sub-components/FieldDetailsModal";
import CreateFieldModal from "./create-field/CreateFieldModal";
import Pagination from "../../ui/Pagination";
import { useState } from "react";
import { MergeField } from "./types";

const TAB_OPTIONS = MERGE_FIELD_TABS.map((tab) => ({
  label: tab.label,
  value: tab.value,
}));

export default function MergeFieldsPanel() {
  const [detailField, setDetailField] = useState<MergeField | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    fields,
    selectedFields,
    toggleFieldSelection,
    toggleAllSelection,
    selectAll,
    clearSelection,
    deleteSelected,
    isLoading,
    currentPage,
    setCurrentPage,
    totalPages,
    addField,
    typeFilter,
    setTypeFilter,
  } = useMergeFields();

  return (
    <div className="space-y-[2rem]">
      <Tabs
        tabs={TAB_OPTIONS}
        activeTab={activeTab}
        onTabChange={(v) => setActiveTab(v as string)}
        variant="underline"
        fullWidth={false}
         className="border-none gap-[2.4rem]"
        labelClassName="text-brand-primary border-brand-primary text-[1rem] truncate sm:text-[1.6rem] font-semibold pb-[1.2rem]"
        inactiveLabelClassName="text-muted text-[1rem] sm:text-[1.6rem] pb-[1.2rem] truncate"
        containerClassName="px-0 py-0 w-screen sm:w-full overflow-x-auto"
      />

      <div className="bg-primary flex flex-col gap-0 rounded-[1.6rem] border border-border">
        <FieldsHeader
          activeTab={activeTab}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onAddField={() => setIsCreateModalOpen(true)}
          typeFilter={typeFilter}
          onTypeFilter={setTypeFilter}
          onSelectAll={selectAll}
          onClearSelection={clearSelection}
          onDeleteSelected={deleteSelected}
          selectedCount={selectedFields.length}
        />

        <FieldsTable
          fields={fields}
          selectedFields={selectedFields}
          toggleFieldSelection={toggleFieldSelection}
          toggleAllSelection={toggleAllSelection}
          isLoading={isLoading}
          onViewDetails={(field) => setDetailField(field)}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <FieldDetailsModal
        isOpen={!!detailField}
        onClose={() => setDetailField(null)}
        field={detailField}
      />

      <CreateFieldModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        addField={addField}
      />
    </div>
  );
}
