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

import { MultiLanguageManager } from "./multi-language/MultiLanguageManager";
import Loader from "../../ui/Loader";
import Text from "../../ui/Text";

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
    isUnlimited,
    isLoading,
    error,
    refetch,
    isEmpty,
  } = useMultiLanguageModal({ onAdd, onClose, addon });

  if (!addon) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isBlur
      bottomSheet
      className="px-0 sm:px-0 sm:py-0 lg:h-[98dvh] rounded-t-[2.6rem] sm:rounded-[1.6rem] lg:w-[67rem]"
    >

        <div className="flex-shrink-0 px-[1.6rem] sm:px-[4rem] pt-[1.5rem] sm:pt-[4rem] sticky top-[0] z-[10] bg-primary z-[100]">
          <LanguageHeader
            addon={addon}
            onClose={onClose}
            maxLanguages={MAX_LANGUAGES}
            isUnlimited={isUnlimited}
          />
          <LanguageSearch
            query={searchQuery}
            onSearch={setSearchQuery}
            selectedCount={selectedCount}
            maxCount={MAX_LANGUAGES}
            isUnlimited={isUnlimited}
            icons={icons}
          />
        </div>

        <div className="flex-1 overflow-y-auto px-[1.6rem] sm:px-[4rem] custom-scrollbar min-h-0">
          <div className="mb-[2.4rem]">
            <MultiLanguageManager
              addon={addon}
              params={{ currentQuantity: 0, purchasedQuantity: 0 }}
              onSelectionChange={() => {}}
              selectedLanguages={[]}
            />
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-[6rem]">
              <Loader className="w-[4rem] h-[4rem] text-brand-primary" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-[6rem] text-center">
              <div className="w-[6.4rem] h-[6.4rem] bg-destructive/10 rounded-full flex items-center justify-center mb-[1.6rem]">
                <span className="text-[3.2rem]">⚠️</span>
              </div>
              <Text className="text-[1.8rem] font-bold text-text-primary mb-[0.4rem]">
                Failed to load languages
              </Text>
              <Text className="text-[1.4rem] text-text-secondary mb-[2.4rem]">
                {error}
              </Text>
              <Button variant="outline" size="sm" onClick={refetch}>
                Try again
              </Button>
            </div>
          ) : isEmpty ? (
            <div className="flex flex-col items-center justify-center py-[6rem] text-center">
              <div className="w-[6.4rem] h-[6.4rem] bg-muted/20 rounded-full flex items-center justify-center mb-[1.6rem]">
                <span className="text-[3.2rem] opacity-20">🌐</span>
              </div>
              <Text className="text-[1.8rem] font-bold text-text-primary mb-[0.4rem]">
                No languages available
              </Text>
              <Text className="text-[1.4rem] text-text-secondary">
                We couldn't find any more languages to add.
              </Text>
            </div>
          ) : (
            <LanguageGrid
              languages={filteredLanguages}
              selectedLanguages={selectedLanguages}
              onToggle={toggleLanguage}
              icons={icons}
            />
          )}
        </div>

        <div className=" sticky bottom-0  flex-shrink-0 px-[1.6rem] sm:px-[4rem] pb-[1.5rem] sm:pb-[4rem] bg-primary">
          <LanguageSummary
            selectedCount={selectedCount}
            totalPrice={totalPrice}
            addon={addon}
            icons={icons}
          />

          <div className="flex gap-[1.6rem] mt-[2.4rem]">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              className="flex-1"
              disabled={selectedCount === 0 || isLoading || !!error}
              onClick={handleAdd}
              loading={isLoading}
            >
              Add to Plan
            </Button>
          </div>
        </div>

    </Modal>
  );
};
