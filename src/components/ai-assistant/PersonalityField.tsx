"use client";

import { useState, useRef } from "react";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import Heading from "../ui/Heading";
import ImageComponent from "../ui/ImageComponent";
import SmartDropdown from "../smart-dropdown/SmartDropdown";
interface Option {
  label: string;
  value: string;
}

interface PersonalityFieldProps {
  label: string;
  value: string;
  options: Option[];
  onSelect: (value: string) => void;
  fieldType: "tone" | "style" | "personalityType";
}

export default function PersonalityField({
  label,
  value,
  options,
  onSelect,
}: PersonalityFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const icons = useSupabaseIcons();

  const selectedOption = options.find((opt) => opt.value === value);
  const displayValue = selectedOption
    ? selectedOption.label
    : `Select ${label}`;

  const handleSelect = (optionValue: string) => {
    onSelect(optionValue);
    setIsOpen(false);
  };

  return (
    <div>
      <Heading className="text-[1.4rem] lg:text-[1.6rem] font-[700]">
        {label}
      </Heading>
      <button
        type="button"
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between border border-border text-text-primary rounded-[0.8rem] w-full px-[1.4rem] py-[0.8rem] mt-[1rem] hover:border-primary-90 transition-colors"
      >
        <span className="text-[1.4rem] lg:text-[1.6rem]">{displayValue}</span>
        <ImageComponent
          src={icons.chevronDown}
          alt="arrow"
          width={20}
          height={20}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <SmartDropdown
        className="z-[1100]"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        triggerRef={triggerRef}
      >
        <div className="flex flex-col max-h-[30rem] overflow-y-auto p-[0.5rem]">
          {options.map((option) => (
            <button
              type="button"
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`text-text-primary text-[1.6rem] p-[1rem] w-full text-left hover:bg-input-filled transition-colors ${
                value === option.value ? "bg-input-filled" : ""
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </SmartDropdown>
    </div>
  );
}
