import { useState, useMemo } from "react";
import { CRMTag } from "../types";
import { TagCategory } from "../../../../store/slices/tagSlice";
import { TAG_CATEGORIES } from "../../../tags/utils/tagConstants";
import { generateDummyTags } from "../utils";

const INITIAL_DATA = generateDummyTags();

export function useTags() {
  const [allTags, setAllTags] = useState<CRMTag[]>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<string>(TAG_CATEGORIES[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<TagCategory | null>(
    null,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredTags = useMemo(() => {
    return allTags.filter((tag) => {
      const matchesTab = tag.category === activeTab;
      const matchesSearch = tag.label
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesFilter = !categoryFilter || tag.category === categoryFilter;
      return matchesTab && matchesSearch && matchesFilter;
    });
  }, [allTags, activeTab, searchQuery, categoryFilter]);

  const totalPages = Math.ceil(filteredTags.length / itemsPerPage);

  const paginatedTags = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTags.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTags, currentPage]);

  const toggleTagSelection = (id: string) => {
    setSelectedTags((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const toggleAllSelection = () => {
    if (selectedTags.length === paginatedTags.length) {
      setSelectedTags([]);
    } else {
      setSelectedTags(paginatedTags.map((t) => t.id));
    }
  };

  const selectAll = () => {
    setSelectedTags(paginatedTags.map((t) => t.id));
  };

  const clearSelection = () => {
    setSelectedTags([]);
  };

  const deleteSelected = () => {
    setAllTags((prev) => prev.filter((tag) => !selectedTags.includes(tag.id)));
    setSelectedTags([]);
  };

  const addTag = (newTag: CRMTag) => {
    setAllTags((prev) => [newTag, ...prev]);
    setActiveTab(newTag.category);
    setCurrentPage(1);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setCategoryFilter(null);
    setSelectedTags([]);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleCategoryFilter = (category: TagCategory | null) => {
    setCategoryFilter(category);
    setCurrentPage(1);
  };

  return {
    activeTab,
    setActiveTab: handleTabChange,
    searchQuery,
    setSearchQuery: handleSearchChange,
    tags: paginatedTags,
    selectedTags,
    toggleTagSelection,
    toggleAllSelection,
    selectAll,
    clearSelection,
    deleteSelected,
    isLoading: false,
    currentPage,
    setCurrentPage,
    totalPages,
    addTag,
    categoryFilter,
    setCategoryFilter: handleCategoryFilter,
  };
}
