import { ReactNode, useRef } from "react";
import ChevronDownIcon from "../../../assets/icons/ChevronDownIcon";
import { cn } from "../../../lib/utils";
import { SmartDropdown } from "../../smart-dropdown";
import { useToggle } from "../../../hooks/useToggle";
import { isFunction } from "../../../utils/is";
import CheckMarkIcon from "../../../assets/icons/CheckMarkIcon";
import { FilterOptionList } from "./FilterOptionList";

export interface QuickFilterOption {
  value?: string
  label: ReactNode
  options?: QuickFilterDropdownOption[]
}

export interface QuickFilterBarProps {
  options: QuickFilterOption[]
  selectedOption: QuickFilterOption
  onSelect: (opt: QuickFilterOption) => void
  handleDropdownOptionSelect?: (opt: QuickFilterDropdownOption) => void
  selectedDropdownOptions?: string[]
  className?: string
  justify?: "start" | "between" | "end" | "center" | "around" | "evenly"
  itemClassName?: string
  activeItemClassName?: string
  inactiveItemClassName?: string
}

export function QuickFilterBar({
  options,
  selectedOption,
  selectedDropdownOptions = [],
  onSelect,
  handleDropdownOptionSelect = () => {},
  className,
  justify = "between",
  itemClassName,
  activeItemClassName,
  inactiveItemClassName,
}: QuickFilterBarProps) {
  const isSelected = (opt: QuickFilterOption) => {
    if (opt.value && selectedOption.value) return opt.value === selectedOption.value
    return opt.label === selectedOption.label
  }

  return (
    <div
      className={cn(
        "relative overflow-auto font-medium flex gap-2 lg:gap-4 w-full bg-input-filled border border-input-stroke p-2 rounded-[.9rem]",
        {
          "justify-start": justify === "start",
          "justify-between": justify === "between",
          "justify-end": justify === "end",
          "justify-center": justify === "center",
          "justify-around": justify === "around",
          "justify-evenly": justify === "evenly",
        },
        className
      )}
    >
      {options.map((opt, idx) => (
        <QuickFilterOption
          selected={isSelected(opt)}
          selectedDropdownOptions={selectedDropdownOptions}
          onSelect={() => onSelect(opt)}
          key={idx}
          label={opt.label}
          options={opt.options}
          handleDropdownOptionSelect={handleDropdownOptionSelect}
          itemClassName={itemClassName}
          activeItemClassName={activeItemClassName}
          inactiveItemClassName={inactiveItemClassName}
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
  label: ReactNode
  options?: QuickFilterDropdownOption[]
  selected?: boolean
  selectedDropdownOptions?: string[]
  onSelect?: () => void
  handleDropdownOptionSelect: (opt: QuickFilterDropdownOption) => void
  itemClassName?: string
  activeItemClassName?: string
  inactiveItemClassName?: string
}

export function QuickFilterOption({
  label,
  options,
  selected,
  handleDropdownOptionSelect,
  onSelect,
  selectedDropdownOptions,
  itemClassName,
  activeItemClassName,
  inactiveItemClassName,
}: QuickFilterOptionProps) {
  const {
    value: isOpen,
    setTrue: openDropdown,
    setFalse: closeDropdown,
  } = useToggle();
  const dropdownTriggerRef = useRef(null);

  return (
    <div className={cn(
        "relative flex items-center rounded-lg transition-all border text-md group",
        selected
          ? cn("bg-white border-input-stroke text-gray-900 hover:bg-gray-50", activeItemClassName)
          : cn("bg-transparent border-transparent text-inactive-color hover:text-gray-600 hover:bg-primary", inactiveItemClassName),
        itemClassName
      )}
    >
      <button
        onClick={() => isFunction(onSelect) && onSelect()}
        className={cn(
          "px-3 py-2 text-sm font-inherit whitespace-nowrap cursor-pointer focus:outline-none",
          !options?.length && "pr-3"
        )}
      >
        {label}
      </button>
      {!!options?.length && (
        <button
          ref={dropdownTriggerRef}
          onClick={(e) => {
            e.stopPropagation()
            if (isFunction(onSelect)) onSelect()
            openDropdown()
          }}
          className="pl-1 pr-3 py-2 cursor-pointer focus:outline-none flex items-center"
        >
          <ChevronDownIcon
            width={15}
            height={7.5}
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      )}
      {!!options?.length && (
        <SmartDropdown
          isOpen={isOpen}
          onClose={closeDropdown}
          triggerRef={dropdownTriggerRef}
          className="min-w-37.5 -mt-1"
          maxHeight=""
          placement="bottom-end"
        >
          <FilterOptionList<string, string>
            options={options}
            value={selectedDropdownOptions?.[0] || ""}
            onChange={(opt) => handleDropdownOptionSelect(opt)}
            icon={CheckMarkIcon}
          />
        </SmartDropdown>
      )}
    </div>
  );
}
