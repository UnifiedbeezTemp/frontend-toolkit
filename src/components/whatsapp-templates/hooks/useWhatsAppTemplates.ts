import { useState, useMemo } from "react";
import { WhatsAppTemplate } from "../types";
import {
  DUMMY_WHATSAPP_TEMPLATES,
  DUMMY_WHATSAPP_ACCOUNTS,
} from "../constants";

export const useWhatsAppTemplates = () => {
  const [selectedAccountId, setSelectedAccountId] = useState<string>(
    DUMMY_WHATSAPP_ACCOUNTS[0].id,
  );
  const [templates, setTemplates] = useState<WhatsAppTemplate[]>(
    DUMMY_WHATSAPP_TEMPLATES,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedTemplateIds, setSelectedTemplateIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const accounts = DUMMY_WHATSAPP_ACCOUNTS;
  const selectedAccount =
    accounts.find((acc) => acc.id === selectedAccountId) || accounts[0];

  const filteredTemplates = useMemo(() => {
    let result = templates;

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter((tmpl) =>
        tmpl.name.toLowerCase().includes(lowerQuery),
      );
    }

    if (categoryFilter !== "All") {
      result = result.filter((tmpl) => tmpl.category === categoryFilter);
    }

    if (statusFilter !== "All") {
      result = result.filter((tmpl) => tmpl.status === statusFilter);
    }

    return result;
  }, [templates, searchQuery, categoryFilter, statusFilter]);

  const totalPages = Math.ceil(filteredTemplates.length / itemsPerPage);
  const paginatedTemplates = filteredTemplates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleAccountChange = (id: string) => {
    setSelectedAccountId(id);
  };

  const handleToggleSelect = (id: string) => {
    setSelectedTemplateIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleToggleAll = () => {
    if (selectedTemplateIds.length === paginatedTemplates.length) {
      setSelectedTemplateIds([]);
    } else {
      setSelectedTemplateIds(paginatedTemplates.map((t) => t.id));
    }
  };

  const handleDelete = (id: string) => {
    setTemplates((prev) => prev.filter((t) => t.id !== id));
    setSelectedTemplateIds((prev) => prev.filter((i) => i !== id));
  };

  const resetFilters = () => {
    setCategoryFilter("All");
    setStatusFilter("All");
    setSearchQuery("");
  };

  return {
    accounts,
    selectedAccount,
    handleAccountChange,
    templates: paginatedTemplates,
    totalCount: filteredTemplates.length,
    searchQuery,
    handleSearchChange,
    categoryFilter,
    setCategoryFilter,
    statusFilter,
    setStatusFilter,
    resetFilters,
    selectedTemplateIds,
    handleToggleSelect,
    handleToggleAll,
    handleDelete,
    currentPage,
    setCurrentPage,
    totalPages,
  };
};
