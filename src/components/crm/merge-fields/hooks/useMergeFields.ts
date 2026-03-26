import { useState, useMemo } from "react";
import { MergeField, MergeFieldCategory } from "../types";
import { generateDummyFields } from "../utils";

const INITIAL_DATA = generateDummyFields();

export function useMergeFields() {
  const [allFields, setAllFields] = useState<MergeField[]>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<string>("audience");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredFields = useMemo(() => {
    return allFields.filter((field) => {
      const matchesTab = field.category === activeTab;
      const matchesSearch = field.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesFilter = !typeFilter || field.type === typeFilter;
      return matchesTab && matchesSearch && matchesFilter;
    });
  }, [allFields, activeTab, searchQuery, typeFilter]);

  const totalPages = Math.ceil(filteredFields.length / itemsPerPage);

  const paginatedFields = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredFields.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredFields, currentPage]);

  const toggleFieldSelection = (id: string) => {
    setSelectedFields((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const toggleAllSelection = () => {
    if (selectedFields.length === paginatedFields.length) {
      setSelectedFields([]);
    } else {
      setSelectedFields(paginatedFields.map((f) => f.id));
    }
  };

  const selectAll = () => {
    setSelectedFields(paginatedFields.map((f) => f.id));
  };

  const clearSelection = () => {
    setSelectedFields([]);
  };

  const deleteSelected = () => {
    setAllFields((prev) =>
      prev.filter((field) => !selectedFields.includes(field.id)),
    );
    setSelectedFields([]);
  };

  const addField = (newField: MergeField) => {
    setAllFields((prev) => [newField, ...prev]);
    setActiveTab(newField.category);
    setCurrentPage(1);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setTypeFilter(null);
    setSelectedFields([]);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleTypeFilter = (type: string | null) => {
    setTypeFilter(type);
    setCurrentPage(1);
  };

  return {
    activeTab,
    setActiveTab: handleTabChange,
    searchQuery,
    setSearchQuery: handleSearchChange,
    fields: paginatedFields,
    selectedFields,
    toggleFieldSelection,
    toggleAllSelection,
    selectAll,
    clearSelection,
    deleteSelected,
    isLoading: false,
    currentPage,
    setCurrentPage,
    totalPages,
    addField,
    typeFilter,
    setTypeFilter: handleTypeFilter,
  };
}
