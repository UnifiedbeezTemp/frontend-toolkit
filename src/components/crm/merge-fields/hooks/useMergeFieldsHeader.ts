import { useState, useRef } from "react";
import { FIELD_TYPES } from "../constants";

export function useMergeFieldsHeader(
  typeFilter: string | null,
  onTypeFilter: (type: string | null) => void,
  onSelectAll: () => void,
  onClearSelection: () => void,
  onDeleteSelected: () => void,
  selectedCount: number,
) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  const filterTriggerRef = useRef<HTMLButtonElement>(null);
  const actionsTriggerRef = useRef<HTMLButtonElement>(null);

  const handleFilterSelect = (type: string | null) => {
    onTypeFilter(type);
    setIsFilterOpen(false);
  };

  const handleSelectAll = () => {
    onSelectAll();
    setIsActionsOpen(false);
  };

  const handleClearSelection = () => {
    onClearSelection();
    setIsActionsOpen(false);
  };

  const handleDeleteSelected = () => {
    onDeleteSelected();
    setIsActionsOpen(false);
  };

  return {
    isFilterOpen,
    setIsFilterOpen,
    isActionsOpen,
    setIsActionsOpen,
    filterTriggerRef,
    actionsTriggerRef,
    fieldTypes: FIELD_TYPES,
    handleFilterSelect,
    handleSelectAll,
    handleClearSelection,
    handleDeleteSelected,
  };
}
