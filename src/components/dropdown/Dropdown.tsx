"use client";

import { useDropdown, DropdownOption } from "./hooks/useDropdown";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import ImageComponent from "../ui/ImageComponent";
import { cn } from "../../lib/utils";

export interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onSelect: (value: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
  buttonClassName?: string;
  labelClassName?: string;
  hideLabelOnMobile?: boolean;
  dropdownClasses?: string
}

export default function Dropdown({
  options,
  value,
  onSelect,
  placeholder = "Select",
  icon,
  className,
  buttonClassName,
  labelClassName,
  hideLabelOnMobile = true,
  dropdownClasses
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

  const icons = useSupabaseIcons();

  const handleReset = () => {
    clearSelection();
    toggleDropdown();
  };

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        className={cn(
          "group flex items-center justify-between w-full py-[.8rem] px-[1.4rem] rounded-[.8rem] border transition-all text-[1.6rem] duration-300 font-medium",
          value
            ? "text-text-primary border-input-stroke bg-primary"
            : "bg-primary text-text-primary border-input-stroke",
          buttonClassName
        )}
      >
        <div className="flex items-center gap-2">
          {icon}
          <span
            className={cn(
              "text-left",
              hideLabelOnMobile && "hidden lg:block",
              labelClassName
            )}
          >
            {getCurrentLabel()}
          </span>
        </div>

        <ImageComponent
          alt=""
          src={icons.chevronDown}
          width={25}
          height={25}
          className={cn(
            "object-cover transition-transform",
            hideLabelOnMobile && "hidden lg:block",
            isOpen ? "rotate-180" : ""
          )}
        />
      </button>

      {isOpen && (
        <div className={cn("absolute top-full right-0 mt-2 w-full bg-primary border border-input-stroke rounded-[1.2rem] shadow-lg z-[50] overflow-hidden", dropdownClasses)}>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={cn(
                "w-full px-4 py-3 text-left text-[1.6rem] transition-all duration-200 hover:text-white flex items-center justify-between hover:bg-brand-primary",
                value === option.value
                  ? "text-brand-primary font-medium"
                  : "text-text-primary"
              )}
            >
              {option.label}

              {value === option.value && (
                <ImageComponent
                  alt="Selected"
                  src={icons.chevronDown}
                  width={20}
                  height={20}
                  className="object-cover"
                />
              )}
            </button>
          ))}

          {value && (
            <button
              onClick={handleReset}
              className="w-full px-4 py-3 text-left text-[1.6rem] text-destructive border-t border-input-stroke hover:bg-destructive/10 transition-all duration-200 flex items-center justify-between"
            >
              Reset
            </button>
          )}
        </div>
      )}
    </div>
  );
}
