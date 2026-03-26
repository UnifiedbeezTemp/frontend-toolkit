import { useState, useMemo } from "react";
import { LibraryAutomation } from "../types";
import { MOCK_LIBRARY_AUTOMATIONS } from "../utils/data";
import { useAutomationRedirection } from "../../../hooks/useAutomationRedirection";

export function useLibraryAutomationTable() {
  const [automations, setAutomations] = useState<LibraryAutomation[]>(
    MOCK_LIBRARY_AUTOMATIONS,
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const itemsPerPage = 8;
  const { handleRedirection } = useAutomationRedirection();

  const filteredAutomations = useMemo(() => {
    return automations.filter((item) => {
      const matchesCategory =
        !selectedCategory || item.category === selectedCategory;
      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.businessGoal.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [automations, selectedCategory, statusFilter, searchQuery]);

  const totalPages = Math.ceil(filteredAutomations.length / itemsPerPage);

  const currentAutomations = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAutomations.slice(start, start + itemsPerPage);
  }, [filteredAutomations, currentPage]);

  const handleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (status: "all" | "active" | "inactive") => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleUpdateBusinessGoal = (id: string, goal: string) => {
    setAutomations((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, businessGoal: goal } : item,
      ),
    );
  };

  const handleNewAutomation = () => {
    handleRedirection(selectedCategory || "Re-engagement and Campaigns");
  };

  return {
    selectedCategory,
    handleCategoryChange,
    searchQuery,
    handleSearchChange,
    statusFilter,
    handleStatusFilterChange,
    currentAutomations,
    currentPage,
    totalPages,
    setCurrentPage,
    selectedIds,
    handleSelect,
    handleNewAutomation,
    handleUpdateBusinessGoal,
  };
}
