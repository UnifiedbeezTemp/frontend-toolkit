"use client";

import React from "react";
import AlertTriangleIcon from "../../../assets/icons/AlertTriangleIcon";
import ChevronDownIcon from "../../../assets/icons/ChevronDownIcon";
import SmartDropdown from "../../smart-dropdown/SmartDropdown";
import { DropdownItem } from "../../smart-dropdown/DropdownItem";
import { AlertCategory } from "../types";

interface AlertsHeaderProps {
  newCount: number;
  selectedCategory: AlertCategory;
  categories: AlertCategory[];
  isCategoryOpen: boolean;
  categoryTriggerRef: React.RefObject<HTMLButtonElement | null>;
  onToggleCategory: () => void;
  onCloseCategory: () => void;
  onSelectCategory: (value: string) => void;
}

export default function AlertsHeader({
  newCount,
  selectedCategory,
  categories,
  isCategoryOpen,
  categoryTriggerRef,
  onToggleCategory,
  onCloseCategory,
  onSelectCategory,
}: AlertsHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-[1rem] lg:items-center  justify-between p-[1rem]">
      <div className="flex items-center gap-[1rem]">
        <div className="w-[3rem] h-[3rem] rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertTriangleIcon
            className="w-[2rem] h-[2rem]"
            color="var(--red-100)"
          />
        </div>

        <h2 className="text-[2rem] font-bold text-text-secondary">Alerts</h2>

        {newCount > 0 && (
          <span className="px-[0.8rem] py-[0.2rem] rounded-[.4rem] bg-destructive text-white text-[1.2rem] font-bold">
            {newCount} new
          </span>
        )}
      </div>

      <div className="relative">
        <button
          ref={categoryTriggerRef}
          onClick={onToggleCategory}
          className="flex items-center gap-[0.6rem] px-[1.2rem] py-[0.6rem] border border-input-stroke rounded-[0.8rem] bg-input-filled hover:scale-90 transition-all  cursor-pointer"
        >
          <span className="text-[1.4rem] text-text-secondary font-bold">
            {selectedCategory.label}
          </span>
          <ChevronDownIcon
            className={`w-[1.6rem] h-[1.6rem] text-text-primary transition-transform ${
              isCategoryOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        <SmartDropdown
          isOpen={isCategoryOpen}
          onClose={onCloseCategory}
          triggerRef={categoryTriggerRef}
          placement="bottom-end"
          maxHeight="20rem"
          className="!w-[20rem]"
        >
          {categories.map((category) => (
            <DropdownItem
              key={category.value}
              onClick={() => onSelectCategory(category.value)}
              className={
                selectedCategory.value === category.value
                  ? "bg-input-filled font-bold"
                  : ""
              }
            >
              <span className="text-[1.4rem]">{category.label}</span>
            </DropdownItem>
          ))}
        </SmartDropdown>
      </div>
    </div>
  );
}
