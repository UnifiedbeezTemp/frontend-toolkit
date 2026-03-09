"use client";

import { useTags } from "./hooks/useTags";
import Tabs from "../../ui/Tabs";
import { TAG_CATEGORIES } from "../../tags/utils/tagConstants";
import TagsHeader from "./sub-components/TagsHeader";
import TagsTable from "./sub-components/TagsTable";
import TagDetailsModal from "./sub-components/TagDetailsModal";
import CreateTagModal from "./create-tag/CreateTagModal";
import Pagination from "../../ui/Pagination";
import { useState } from "react";
import { CRMTag } from "./types";

const TAB_OPTIONS = TAG_CATEGORIES.map((cat) => ({
  label: `${cat.emoji} ${cat.label}`,
  value: cat.id,
}));

export default function TagsPanel() {
  const [detailTag, setDetailTag] = useState<CRMTag | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    tags,
    selectedTags,
    toggleTagSelection,
    toggleAllSelection,
    selectAll,
    clearSelection,
    deleteSelected,
    isLoading,
    currentPage,
    setCurrentPage,
    totalPages,
    categoryFilter,
    setCategoryFilter,
    addTag,
  } = useTags();

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
        <TagsHeader
          activeTab={activeTab}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onAddTag={() => setIsCreateModalOpen(true)}
          categoryFilter={categoryFilter}
          onCategoryFilter={setCategoryFilter}
          onSelectAll={selectAll}
          onClearSelection={clearSelection}
          onDeleteSelected={deleteSelected}
          selectedCount={selectedTags.length}
        />

        <TagsTable
          tags={tags}
          selectedTags={selectedTags}
          toggleTagSelection={toggleTagSelection}
          toggleAllSelection={toggleAllSelection}
          isLoading={isLoading}
          onViewDetails={(tag) => setDetailTag(tag)}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <TagDetailsModal
        isOpen={!!detailTag}
        onClose={() => setDetailTag(null)}
        tag={detailTag}
      />

      <CreateTagModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        addTag={addTag}
      />
    </div>
  );
}
