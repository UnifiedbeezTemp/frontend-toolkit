import { ReactNode, useRef } from "react";
import ChevronDownIcon from "../../../assets/icons/ChevronDownIcon";
import { cn } from "../../../lib/utils";
import { SmartDropdown } from "../../smart-dropdown";
import { useToggle } from "../../../hooks/useToggle";
import { isFunction } from "../../../utils/is";
import CheckMarkIcon from "../../../assets/icons/CheckMarkIcon";
import { FilterOptionList } from "./FilterOptionList";

export interface QuickFilterOption {
  label: ReactNode;
  options: QuickFilterDropdownOption[];
}

export interface QuickFilterBarProps {
  options: QuickFilterOption[];
  selectedOption: QuickFilterOption;
  onSelect: (opt: QuickFilterOption) => void;
  handleDropdownOptionSelect: (opt: QuickFilterDropdownOption) => void;
  selectedDropdownOptions: string[];
  className?: string;
}

export function QuickFilterBar({
  options,
  selectedOption,
  selectedDropdownOptions,
  onSelect,
  handleDropdownOptionSelect,
  className,
}: QuickFilterBarProps) {
  return (
    <div
      className={cn(
        "relative overflow-auto font-medium flex gap-2 lg:gap-4 justify-between w-full bg-input-filled border border-input-stroke p-2 rounded-[.9rem]",
        className
      )}
    >
      {options.map((opt, idx) => (
        <QuickFilterOption
          selected={selectedOption.label === opt.label}
          selectedDropdownOptions={selectedDropdownOptions}
          onSelect={() => onSelect(opt)}
          key={idx}
          label={opt.label}
          options={opt.options}
          handleDropdownOptionSelect={handleDropdownOptionSelect}
        />
      ))}
    </div>
  );
}

type QuickFilterDropdownOption = {
  label: string;
  value: string;
};
type QuickFilterOptionProps = {
  label: ReactNode;
  options: QuickFilterDropdownOption[];
  selected?: boolean;
  selectedDropdownOptions?: string[];
  onSelect?: () => void;
  handleDropdownOptionSelect: (opt: QuickFilterDropdownOption) => void;
};

export function QuickFilterOption({
  label,
  options,
  selected,
  handleDropdownOptionSelect,
  onSelect,
  selectedDropdownOptions,
}: QuickFilterOptionProps) {
  const {
    value: isOpen,
    setTrue: openDropdown,
    setFalse: closeDropdown,
  } = useToggle();
  const dropdownTriggerRef = useRef(null);

  return (
    <div className="relative ">
      <button
        ref={dropdownTriggerRef}
        onClick={() => {
          if (isFunction(onSelect)) onSelect();
          openDropdown();
        }}
        className={cn(
          `flex items-center gap-1 px-4 py-2 rounded-lg transition-all border-0 text-md`,
          selected
            ? "bg-primary border border-input-stroke text-gray-900 hover:bg-gray-50"
            : "bg-transparent text-inactive-color hover:text-gray-600 hover:bg-primary"
        )}
      >
        <span className="text-sm font-inherit whitespace-nowrap">{label}</span>
        <ChevronDownIcon
          width={15}
          height={7.5}
          className={`transition-transform mt-1 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <SmartDropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        triggerRef={dropdownTriggerRef}
        className="min-w-37.5 -mt-1"
        maxHeight=""
      >
        <FilterOptionList<string, string>
          options={options}
          value={selectedDropdownOptions?.[0] || ""}
          onChange={(opt) => handleDropdownOptionSelect(opt)}
          icon={CheckMarkIcon}
        />
      </SmartDropdown>
    </div>
  );
}
