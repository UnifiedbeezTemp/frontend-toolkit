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
          group flex items-center justify-between w-full p-[8px] rounded-[0.8rem] border transition-all text-[1.6rem] duration-300 font-medium
          ${
            value
              ? "text-text-primary border-border bg-primary"
              : "bg-primary text-text-primary border-border hover:shadow-md"
          }
          hover:scale-105 active:scale-95
        `}
      >
        <div className="flex items-center gap-2">
          {value ? (
            <div
              onClick={clearSelection}
              className="p-[.2rem] rounded-full hover:bg-brand-primary/10 hover:bg-opacity-10 transition-colors border-brand-primary border"
            >
              <X className="w-[1.5rem] h-[1.5rem]" />
            </div>
          ) : (
            icon
          )}
          <span className="min-w-[120px] text-left">{getCurrentLabel()}</span>
        </div>

        <ChevronDown
          size={20}
          className={`transition-transform duration-200 text-[2rem] ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-[25rem] bg-primary border border-border rounded-[0.8rem] shadow-lg z-[10] overflow-hidden">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`
                w-full px-4 py-3 text-left text-[1.4rem] transition-all duration-200 hover:text-white flex items-center justify-between hover:bg-brand-primary
                ${
                  value === option.value
                    ? "text-brand-primary font-medium"
                    : "text-text-primary"
                }
              `}
            >
              {option.label}

              {value === option.value && (
                <ChevronDown
                  size={20}
                  className={`transition-transform duration-200 text-[2rem]`}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
