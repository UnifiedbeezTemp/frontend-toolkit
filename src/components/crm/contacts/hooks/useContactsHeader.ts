import { useState, useRef } from "react";

export function useContactsHeader() {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const filterTriggerRef = useRef<HTMLButtonElement>(null);
  const moreTriggerRef = useRef<HTMLButtonElement>(null);

  const toggleImportModal = () => setIsImportModalOpen((prev) => !prev);
  const toggleAddModal = () => setIsAddModalOpen((prev) => !prev);
  const toggleFilter = () => setIsFilterOpen((prev) => !prev);
  const toggleMore = () => setIsMoreOpen((prev) => !prev);

  const closeFilter = () => setIsFilterOpen(false);
  const closeMore = () => setIsMoreOpen(false);

  return {
    isImportModalOpen,
    isAddModalOpen,
    isFilterOpen,
    isMoreOpen,
    filterTriggerRef,
    moreTriggerRef,
    toggleImportModal,
    toggleAddModal,
    toggleFilter,
    toggleMore,
    closeFilter,
    closeMore,
  };
}
