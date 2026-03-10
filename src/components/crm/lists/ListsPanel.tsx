"use client";

import { useLists } from "./hooks/useLists";
import Tabs from "../../ui/Tabs";
import { AUTOMATION_TYPES } from "../../../constants/automations";
import ListsHeader from "./sub-components/ListsHeader";
import ListsPagination from "./sub-components/ListsPagination";
import ListsTable from "./sub-components/ListsTable";
import CreateListModal from "./create-list/CreateListModal";
import ListDetailsModal from "./sub-components/ListDetailsModal";
import { useState } from "react";
import { CRMList } from "./types";

export default function ListsPanel() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [detailList, setDetailList] = useState<CRMList | null>(null);
  const {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    lists,
    selectedLists,
    toggleListSelection,
    toggleAllSelection,
    selectAll,
    clearSelection,
    deleteSelected,
    isLoading,
    currentPage,
    setCurrentPage,
    totalPages,
    addList,
    channelFilter,
    setChannelFilter,
  } = useLists();

  return (
    <div className="space-y-[2rem]">
      <Tabs
        tabs={AUTOMATION_TYPES}
        activeTab={activeTab}
        onTabChange={(v) => setActiveTab(v as string)}
        variant="underline"
        fullWidth={false}
        className="border-none gap-[2.4rem]"
        labelClassName="text-brand-primary border-brand-primary text-[1rem] truncate sm:text-[1.6rem] font-semibold pb-[1.2rem]"
        inactiveLabelClassName="text-muted text-[1rem] sm:text-[1.6rem] pb-[1.2rem] truncate"
        containerClassName="px-0 py-0 w-screen sm:w-full overflow-x-auto"
      />

      <div className="bg-primary p-[1rem] flex flex-col gap-0 rounded-[1.6rem] border border-border">
        <ListsHeader
          activeTab={activeTab}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onCreateList={() => setIsCreateModalOpen(true)}
          channelFilter={channelFilter}
          onChannelFilter={setChannelFilter}
          onSelectAll={selectAll}
          onClearSelection={clearSelection}
          onDeleteSelected={deleteSelected}
          selectedCount={selectedLists.length}
        />

        <ListsTable
          lists={lists}
          selectedLists={selectedLists}
          toggleListSelection={toggleListSelection}
          toggleAllSelection={toggleAllSelection}
          isLoading={isLoading}
          onViewDetails={(list) => setDetailList(list)}
        />

        <ListsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <CreateListModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        addList={addList}
      />

      <ListDetailsModal
        isOpen={!!detailList}
        onClose={() => setDetailList(null)}
        list={detailList}
      />
    </div>
  );
}
