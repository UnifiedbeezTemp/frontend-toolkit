import React from "react";
import { CATEGORIES, LANGUAGES } from "../../hooks/useDiscoverTemplates";
import Input from "../../../forms/Input";
import ImageComponent from "next/image";
import { SmartDropdown } from "../../../smart-dropdown";
import Button from "../../../ui/Button";
import SearchIcon from "../../../../assets/icons/SearchIcon";
import FunnelIcon from "../../../../assets/icons/FunnelIcon";
import ChevronDownIcon from "../../../../assets/icons/ChevronDownIcon";

interface DiscoverControlsProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedCategory: { label: string; value: string };
  onCategoryChange: (val: { label: string; value: string }) => void;
  selectedLanguage: { label: string; value: string; icon: string };
  onLanguageChange: (val: {
    label: string;
    value: string;
    icon: string;
  }) => void;
  activeDropdown: string | null;
  toggleDropdown: (name: string) => void;
  setActiveDropdown: (name: string | null) => void;
  onCreateNewClick: () => void;
  categoryTriggerRef: React.RefObject<HTMLButtonElement | null>;
  languageTriggerRef: React.RefObject<HTMLButtonElement | null>;
  plusIcon: string;
}

export function DiscoverControls({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedLanguage,
  onLanguageChange,
  activeDropdown,
  toggleDropdown,
  setActiveDropdown,
  onCreateNewClick,
  categoryTriggerRef,
  languageTriggerRef,
  plusIcon,
}: DiscoverControlsProps) {
  return (
    <div className="flex flex-col gap-[1.6rem]">
      <div className="w-full">
        <Input
          value={searchQuery}
          onChange={onSearchChange}
          leftIcon={<SearchIcon size={16} className="grayscale" />}
          placeholder="Search"
          className="h-[4rem] w-full"
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-[1.6rem]">
        <div className="flex items-center gap-[1.2rem] w-full sm:w-auto">
          <div className="relative flex-1 sm:w-[18rem]">
            <button
              ref={categoryTriggerRef}
              onClick={() => toggleDropdown("category")}
              className="w-full h-[4.2rem] flex items-center justify-between px-[1.2rem] bg-white border border-border rounded-[0.8rem] text-left hover:border-text-primary transition-colors"
            >
              <div className="flex items-center gap-[0.8rem] overflow-hidden">
                <FunnelIcon size={14} className="text-text-primary shrink-0" />
                <span className="text-[1.4rem] text-text-secondary font-medium truncate">
                  {selectedCategory.label}
                </span>
              </div>
              <ChevronDownIcon
                size={14}
                className="text-text-primary shrink-0"
              />
            </button>
            <SmartDropdown
              isOpen={activeDropdown === "category"}
              onClose={() => setActiveDropdown(null)}
              triggerRef={categoryTriggerRef}
            >
              {CATEGORIES.map((option) => (
                <button
                  key={option.value}
                  onClick={() => onCategoryChange(option)}
                  className="w-full px-[1.2rem] py-[0.8rem] text-left text-[1.4rem] hover:bg-black-5 font-medium text-text-secondary"
                >
                  {option.label}
                </button>
              ))}
            </SmartDropdown>
          </div>

          <div className="relative flex-1 sm:w-[18rem]">
            <button
              ref={languageTriggerRef}
              onClick={() => toggleDropdown("language")}
              className="w-full h-[4.2rem] flex items-center justify-between px-[1.2rem] bg-white border border-border rounded-[0.8rem] text-left hover:border-text-primary transition-colors"
            >
              <div className="flex items-center gap-[0.8rem] overflow-hidden">
                <span className="shrink-0">{selectedLanguage.icon}</span>
                <span className="text-[1.4rem] text-text-secondary font-medium truncate">
                  {selectedLanguage.label}
                </span>
              </div>
              <ChevronDownIcon
                size={14}
                className="text-text-primary shrink-0"
              />
            </button>
            <SmartDropdown
              isOpen={activeDropdown === "language"}
              onClose={() => setActiveDropdown(null)}
              triggerRef={languageTriggerRef}
            >
              {LANGUAGES.map((option) => (
                <button
                  key={option.value}
                  onClick={() => onLanguageChange(option)}
                  className="w-full px-[1.2rem] py-[0.8rem] text-left text-[1.4rem] hover:bg-black-5 font-medium text-text-secondary"
                >
                  <div className="flex items-center gap-[0.8rem]">
                    <span>{option.icon}</span>
                    <span>{option.label}</span>
                  </div>
                </button>
              ))}
            </SmartDropdown>
          </div>
        </div>

        <Button
          variant="primary"
          className="w-full sm:w-auto sm:h-[4.2rem] sm:aspect-square lg:aspect-auto lg:px-[1.6rem] shrink-0 font-[500] text-[1.4rem] py-[1rem] grad-btn flex items-center justify-center"
          onClick={onCreateNewClick}
        >
          <ImageComponent
            src={plusIcon}
            alt="plus"
            width={16}
            height={16}
            className="lg:mr-[0.8rem]"
          />
          <span className="sm:hidden lg:inline">Create new template</span>
        </Button>
      </div>
    </div>
  );
}
