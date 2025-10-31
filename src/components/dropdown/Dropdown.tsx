"use client";

import { ChevronDown, X } from "lucide-react";
import { useDropdown, DropdownOption } from "./hooks/useDropdown";

export interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onSelect: (value: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
}

export default function Dropdown({
  options,
  value,
  onSelect,
  placeholder = "Select",
  icon,
}: DropdownProps) {
  const {
    isOpen,
    dropdownRef,
    handleSelect,
    clearSelection,
    toggleDropdown,
    getCurrentLabel,
  } = useDropdown({
    options,
    value,
    onSelect,
    placeholder,
  });

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`
          group flex items-center gap-2 px-4 py-[6px] rounded-lg border-2 transition-all text-[16px] duration-300 font-medium
          ${
            value
              ? "text-text-primary border-border bg-opacity-5"
              : "bg-primary text-text-primary border-border hover:shadow-md"
          }
          hover:scale-105 active:scale-95
        `}
      >
        {value ? (
          <div
            onClick={clearSelection}
            className="p-1 rounded-full hover:bg-brand-primary/10 hover:bg-opacity-10 transition-colors border-brand-primary border"
          >
            <X className="w-3 h-3" />
          </div>
        ) : (
          icon
        )}
        <span className="min-w-[120px] text-left">{getCurrentLabel()}</span>

        <div className="flex items-center gap-1">
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-primary border border-border rounded-lg shadow-lg z-10 overflow-hidden">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`
                w-full px-4 py-3 text-left transition-all duration-200 hover:text-white hover:bg-brand-primary
                ${
                  value === option.value
                    ? "text-white bg-brand-primary bg-opacity-10 font-medium"
                    : "text-text-primary"
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}