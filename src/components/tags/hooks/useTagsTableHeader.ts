import { useState, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/useRedux";
import {
  setSearchQuery,
  clearSelection,
  selectAllTags,
  TagCategory,
  setSelectedCategory,
  deleteSelectedTags,
} from "../../../store/slices/tagSlice";
import { RootState } from "../../../store";

export const useTagsTableHeader = () => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector(
    (state: RootState) => state.tag.searchQuery,
  );
  const tags = useAppSelector((state: RootState) => state.tag.tags);
  const selectedCategory = useAppSelector(
    (state: RootState) => state.tag.selectedCategory,
  );
  const selectedTags = useAppSelector(
    (state: RootState) => state.tag.selectedTags,
  );

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  const filteredTagsInCurrentView = tags.filter(
    (t) => t.category === selectedCategory,
  );

  const handleSelectAll = () => {
    dispatch(selectAllTags(filteredTagsInCurrentView.map((t) => t.id)));
    setIsOptionsOpen(false);
  };

  const handleUnselectAll = () => {
    dispatch(clearSelection());
    setIsOptionsOpen(false);
  };

  const handleDeleteTags = () => {
    dispatch(deleteSelectedTags());
    setIsOptionsOpen(false);
  };

  const handleStatusChange = (status: string) => {
    // This could be for additional filtering like "Active/Inactive" tags if required
    console.log("Filter status changed:", status);
    setIsFilterOpen(false);
  };

  const handleCategoryChange = (category: TagCategory) => {
    dispatch(setSelectedCategory(category));
  };

  const handleSearch = (query: string) => {
    dispatch(setSearchQuery(query));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setIsOptionsOpen(false);
      }
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return {
    searchQuery,
    handleSearch,
    filteredTagsInCurrentView,
    isFilterOpen,
    setIsFilterOpen,
    isOptionsOpen,
    setIsOptionsOpen,
    filterRef,
    optionsRef,
    handleSelectAll,
    handleUnselectAll,
    handleDeleteTags,
    handleStatusChange,
    handleCategoryChange,
    selectedCategory,
  };
};
