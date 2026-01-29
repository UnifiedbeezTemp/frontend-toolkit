"use client";

import { useState, useRef } from "react";
import { NumberType, NumberTypeSelectorProps } from "../../types";
import { NUMBER_TYPE_OPTIONS } from "../../constants";
import ImageComponent from "next/image";
import { useSupabaseIcons } from "../../../../../../lib/supabase/useSupabase";
import { SmartDropdown } from "../../../../../smart-dropdown";

export default function NumberTypeSelector({
  numberType,
  onNumberTypeChange,
}: NumberTypeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const icons = useSupabaseIcons();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const selectedLabel =
    NUMBER_TYPE_OPTIONS.find((o) => o.value === numberType)?.label || "Local";

  return (
    <div>
      <label className="block text-[1.4rem] lg:text-[1.6rem] text-text-secondary font-[700] mb-[0.8rem]">
        Number Type
      </label>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-[1.4rem] py-[1rem] bg-primary border border-input-stroke rounded-[0.8rem] text-[1.6rem] text-text-primary flex items-center justify-between focus:border-brand-primary focus:ring-2 focus:ring-focus-ring outline-none"
      >
        <span>{selectedLabel}</span>
        <ImageComponent
          src={icons.gridDropdown}
          alt="arrow-down"
          width={25}
          height={25}
          className="w-[1.6rem] h-[1.6rem]"
        />
      </button>
      <SmartDropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        triggerRef={triggerRef}
        maxHeight="20rem"
      >
        <div className="py-[0.4rem]">
          {NUMBER_TYPE_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onNumberTypeChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full px-[1.4rem] py-[1rem] text-left text-[1.4rem] hover:bg-hover-bg transition-colors ${
                option.value === numberType
                  ? "bg-brand-primary/10 text-brand-primary"
                  : "text-text-primary"
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
