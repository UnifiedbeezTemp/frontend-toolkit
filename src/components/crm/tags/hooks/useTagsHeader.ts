import { useState, useRef } from "react";
import { TagCategory } from "../../../../store/slices/tagSlice";
import { TAG_CATEGORIES } from "../../../tags/utils/tagConstants";

export function useTagsHeader(
  categoryFilter: TagCategory | null,
  onCategoryFilter: (category: TagCategory | null) => void,
  onSelectAll: () => void,
  onClearSelection: () => void,
  onDeleteSelected: () => void,
  selectedCount: number,
) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  const filterTriggerRef = useRef<HTMLButtonElement>(null);
  const actionsTriggerRef = useRef<HTMLButtonElement>(null);

  const handleFilterSelect = (category: TagCategory | null) => {
    onCategoryFilter(category);
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
    categoryFilter,
    categories: TAG_CATEGORIES,
    selectedCount,
    handleFilterSelect,
    handleSelectAll,
    handleClearSelection,
    handleDeleteSelected,
  };
}
