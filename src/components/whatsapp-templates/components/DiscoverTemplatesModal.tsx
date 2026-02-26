import React, { useRef } from "react";
import { TemplateFormData } from "../types";
import { useDiscoverTemplates } from "../hooks/useDiscoverTemplates";
import { DiscoverHeader } from "./discover/DiscoverHeader";
import { DiscoverControls } from "./discover/DiscoverControls";
import { DiscoverGrid } from "./discover/DiscoverGrid";
import { EmptyState } from "./discover/EmptyState";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import Modal from "../../modal/Modal";

interface DiscoverTemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUseTemplate: (template: TemplateFormData) => void;
  onCreateNewTemplate?: () => void;
}

export default function DiscoverTemplatesModal({
  isOpen,
  onClose,
  onUseTemplate,
  onCreateNewTemplate,
}: DiscoverTemplatesModalProps) {
  const icons = useSupabaseIcons();
  const categoryTriggerRef = useRef<HTMLButtonElement>(null);
  const languageTriggerRef = useRef<HTMLButtonElement>(null);

  const {
    searchQuery,
    selectedCategory,
    selectedLanguage,
    activeDropdown,
    groupedTemplates,
    handleSearchChange,
    handleCategoryChange,
    handleLanguageChange,
    toggleDropdown,
    setActiveDropdown,
  } = useDiscoverTemplates();

  const handleCreateNewClick = () => {
    onClose();
    onCreateNewTemplate?.();
  };

  const hasTemplates = Object.keys(groupedTemplates).length > 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="p-0 sm:w-[70rem] rounded-t-[1.6rem] sm:rounded-[1.6rem] lg:w-[120rem] sm:h-[90vh] flex flex-col overflow-hidden"
      bottomSheet
    >
      <div className="shrink-0 p-[2.4rem]">
        <DiscoverHeader onClose={onClose} />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-[2.4rem] px-[1.6rem] sm:px-[2.4rem] pb-[2.4rem]">
          <DiscoverControls
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            selectedLanguage={selectedLanguage}
            onLanguageChange={handleLanguageChange}
            activeDropdown={activeDropdown}
            toggleDropdown={toggleDropdown}
            setActiveDropdown={setActiveDropdown}
            onCreateNewClick={handleCreateNewClick}
            categoryTriggerRef={categoryTriggerRef}
            languageTriggerRef={languageTriggerRef}
            plusIcon={icons.plusWhite}
          />

          {hasTemplates ? (
            <DiscoverGrid
              groupedTemplates={groupedTemplates}
              onUseTemplate={onUseTemplate}
            />
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </Modal>
  );
}
