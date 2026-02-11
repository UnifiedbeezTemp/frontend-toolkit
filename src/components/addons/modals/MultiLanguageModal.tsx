"use client";

import React from "react";
import Modal from "../../modal/Modal";
import Button from "../../ui/Button";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import { Addon } from "../../../store/onboarding/types/addonTypes";
import { useMultiLanguageModal } from "./hooks/useMultiLanguageModal";
import { LanguageHeader } from "./multi-language/LanguageHeader";
import { LanguageSearch } from "./multi-language/LanguageSearch";
import { LanguageGrid } from "./multi-language/LanguageGrid";
import { LanguageSummary } from "./multi-language/LanguageSummary";

interface MultiLanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  addon: Addon | null;
  onAdd: (addon: Addon, quantity: number) => void;
}

export const MultiLanguageModal: React.FC<MultiLanguageModalProps> = ({
  isOpen,
  onClose,
  addon,
  onAdd,
}) => {
  const icons = useSupabaseIcons();
  const {
    searchQuery,
    setSearchQuery,
    selectedLanguages,
    filteredLanguages,
    toggleLanguage,
    handleAdd,
    totalPrice,
    selectedCount,
    MAX_LANGUAGES,
  } = useMultiLanguageModal({ onAdd, onClose, addon });

  if (!addon) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isBlur
      bottomSheet
      overflow={false}
      className="px-0 sm:px-0 sm:py-0 h-[90dvh] sm:h-[85vh] lg:h-[70rem] rounded-t-[2.6rem] sm:rounded-[1.6rem] lg:w-[67rem]"
    >
      <div className="flex flex-col h-[90dvh] sm:h-[85vh] lg:h-[70rem] overflow-hidden">
        {/* Sticky Header Section */}
        <div className="flex-shrink-0 px-[1.6rem] sm:px-[4rem] pt-[1.5rem] sm:pt-[4rem]">
          <LanguageHeader
            addon={addon}
            onClose={onClose}
            maxLanguages={MAX_LANGUAGES}
          />
          <LanguageSearch
            query={searchQuery}
            onSearch={setSearchQuery}
            selectedCount={selectedCount}
            maxCount={MAX_LANGUAGES}
            icons={icons}
          />
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto px-[1.6rem] sm:px-[4rem] custom-scrollbar min-h-0">
          <LanguageGrid
            languages={filteredLanguages}
            selectedLanguages={selectedLanguages}
            onToggle={toggleLanguage}
            icons={icons}
          />
        </div>

        {/* Sticky Footer Section */}
        <div className="flex-shrink-0 px-[1.6rem] sm:px-[4rem] pb-[1.5rem] sm:pb-[4rem] bg-primary border-t border-border">
          <LanguageSummary
            selectedCount={selectedCount}
            totalPrice={totalPrice}
            addon={addon}
            icons={icons}
          />

          <div className="flex gap-[1.6rem] mt-[2.4rem]">
            <Button variant="secondary" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button
              className="flex-1"
              disabled={selectedCount === 0}
              onClick={handleAdd}
            >
              Add to Plan
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
