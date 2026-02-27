import { useState } from "react";
import { WhatsAppTemplate } from "../types";
import { GeneralTemplateFormData } from "./useGeneralTemplateForm";

export const MOCK_GENERAL_TEMPLATES: WhatsAppTemplate[] = [
  {
    id: "1",
    name: "Deposit Paid",
    category: "Utility",
    language: "English",
    status: "Approved",
  },
  {
    id: "2",
    name: "Utility Bill",
    category: "Service",
    language: "English",
    status: "Pending",
  },
  {
    id: "3",
    name: "Rent Reminder",
    category: "Account",
    language: "Spanish",
    status: "Approved",
  },
];

export function useGeneralTemplates() {
  const [templates, setTemplates] = useState<WhatsAppTemplate[]>(
    MOCK_GENERAL_TEMPLATES,
  );
  const [isGeneralCreationOpen, setIsGeneralCreationOpen] = useState(false);
  const [generalSearch, setGeneralSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedGeneralIds, setSelectedGeneralIds] = useState<string[]>([]);
  const [generalPage, setGeneralPage] = useState(1);

  const filteredTemplates = templates.filter((t) => {
    const matchesSearch = t.name
      .toLowerCase()
      .includes(generalSearch.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || t.category === categoryFilter;
    const matchesStatus = statusFilter === "All" || t.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleToggleSelect = (id: string) => {
    setSelectedGeneralIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleToggleAll = () => {
    setSelectedGeneralIds((prev) =>
      prev.length === filteredTemplates.length
        ? []
        : filteredTemplates.map((t) => t.id),
    );
  };

  const handleOpenCreation = () => setIsGeneralCreationOpen(true);
  const handleCloseCreation = () => setIsGeneralCreationOpen(false);

  const addTemplate = (data: GeneralTemplateFormData) => {
    const newTemplate: WhatsAppTemplate = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.name,
      category: data.list,
      language: "English", // Default for now
      status: "Approved",
    };
    setTemplates((prev) => [newTemplate, ...prev]);
    setIsGeneralCreationOpen(false);
  };

  const resetFilters = () => {
    setCategoryFilter("All");
    setStatusFilter("All");
    setGeneralSearch("");
  };

  return {
    isGeneralCreationOpen,
    generalSearch,
    setGeneralSearch,
    categoryFilter,
    setCategoryFilter,
    statusFilter,
    setStatusFilter,
    resetFilters,
    selectedGeneralIds,
    handleToggleSelect,
    handleToggleAll,
    generalPage,
    setGeneralPage,
    handleOpenCreation,
    handleCloseCreation,
    addTemplate,
    templates: filteredTemplates,
  };
}
