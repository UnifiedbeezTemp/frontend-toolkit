import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/useRedux";
import { RootState } from "../../../store";
import { usePagination } from "../../../hooks/usePagination";
import {
  selectAllTags,
  clearSelection,
  toggleTagSelection as toggleTag,
} from "../../../store/slices/tagSlice";

export const useTagsTable = (itemsPerPage: number = 8) => {
  const dispatch = useAppDispatch();
  const tags = useAppSelector((state: RootState) => state.tag.tags);
  const selectedCategory = useAppSelector(
    (state: RootState) => state.tag.selectedCategory,
  );
  const searchQuery = useAppSelector(
    (state: RootState) => state.tag.searchQuery,
  );
  const selectedTags = useAppSelector(
    (state: RootState) => state.tag.selectedTags,
  );

  const filteredTags = useMemo(() => {
    return tags.filter((tag) => {
      const matchesCategory = tag.category === selectedCategory;
      const matchesSearch =
        tag.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tag.autoFillTag.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [tags, selectedCategory, searchQuery]);

  const { currentPage, totalPages, handlePageChange, startIndex, endIndex } =
    usePagination({
      totalItems: filteredTags.length,
      itemsPerPage,
    });

  const currentTags = useMemo(() => {
    return filteredTags.slice(startIndex, endIndex);
  }, [filteredTags, startIndex, endIndex]);

  const isAllSelected = useMemo(
    () =>
      currentTags.length > 0 &&
      currentTags.every((t) => selectedTags.includes(t.id)),
    [currentTags, selectedTags],
  );

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const currentIds = currentTags.map((t) => t.id);
      dispatch(selectAllTags(currentIds));
    } else {
      dispatch(clearSelection());
    }
  };

  const toggleTagSelection = (id: string) => {
    dispatch(toggleTag(id));
  };

  return {
    currentTags,
    filteredTags,
    currentPage,
    totalPages,
    handlePageChange,
    isAllSelected,
    handleSelectAll,
    toggleTagSelection,
    selectedTags,
  };
};
