"use client";

import { useState, useMemo } from "react";
import { SmartSequence, MOCK_SMART_SEQUENCES } from "../types";
import { useAutomationRedirection } from "../../../hooks/useAutomationRedirection";

export function useSmartSequenceGrid() {
  const { handleGoToDashboard } = useAutomationRedirection();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("Any Industry");
  const [isIndustryOpen, setIsIndustryOpen] = useState(false);

  const [selectedSequence, setSelectedSequence] =
    useState<SmartSequence | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredSequences = useMemo(() => {
    return MOCK_SMART_SEQUENCES.filter((seq) => {
      const matchesSearch =
        seq.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        seq.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesIndustry =
        selectedIndustry === "Any Industry" ||
        seq.industry === selectedIndustry;
      return matchesSearch && matchesIndustry;
    });
  }, [searchQuery, selectedIndustry]);

  const handleCardClick = (id: string) => {
    const sequence = MOCK_SMART_SEQUENCES.find((seq) => seq.id === id);
    if (!sequence) return;

    if (sequence.isCustom) {
      handleGoToDashboard();
      return;
    }

    setSelectedSequence(sequence);
    setIsModalOpen(true);
  };

  const handleUseSequence = () => {
    setIsModalOpen(false);
    handleGoToDashboard();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSequence(null);
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedIndustry,
    setSelectedIndustry,
    isIndustryOpen,
    setIsIndustryOpen,
    filteredSequences,
    selectedSequence,
    isModalOpen,
    handleCardClick,
    handleUseSequence,
    handleCloseModal,
    handleGoToDashboard,
  };
}
