"use client";

import Checkbox from "../ui/CheckBox";
import { useFilterDropdown } from "./hooks/useFilterDropdown";

interface FilterDropdownProps {
  section: "invited" | "members";
  onClose?: () => void;
}

export default function FilterDropdown({ section, onClose }: FilterDropdownProps) {
  const {
    isOpen,
    dropdownRef,
    options,
    activeFilter,
    handleFilterSelect,
    handleReset,
  } = useFilterDropdown({ section, onClose });

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full right-0 mt-1 min-w-[28rem] bg-white border border-border rounded-lg shadow-lg z-20"
    >
      <div className="max-h-64 overflow-y-auto">
        {options.map((option) => {
          const isActive = activeFilter === option.value;
          return (
            <div
              key={option.value}
              onClick={() => handleFilterSelect(option.value)}
              className="w-full flex items-center gap-[1.2rem] py-[1.2rem] px-[0.8rem] text-left text-[1.4rem] transition-colors text-text-primary border-b border-border"
            >
              <Checkbox
                checked={isActive}
                onChange={() => handleFilterSelect(option.value)}
                size="sm"
              />
              <span className="text-text-secondary">{option.label}</span>
            </div>
          );
        })}
      </div>
      {activeFilter && (
        <div className="">
          <button
            onClick={handleReset}
            className="w-full py-[1.2rem] px-[0.8rem] text-left text-[1.4rem] text-destructive transition-colors"
          >
            Reset Filter
          </button>
        </div>
      )}
    </div>
  );
}

