"use client";

import React, { useRef, useState } from "react";
import SmartDropdown from "../../../../smart-dropdown/SmartDropdown";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import { cn } from "../../../../../lib/utils";
import ImageComponent from "../../../../ui/ImageComponent";
import { FontSelectorProps } from "../../../types/brandKitTypes";
import { getFontStyle } from "../../../utils/brandKitUtils";

export default function FontSelector({
  value,
  options,
  onChange,
  className,
  isFamily,
}: FontSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const icons = useSupabaseIcons();

  return (
    <div className={cn("relative flex-1", className)}>
      <div
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-[1.6rem] py-[1.2rem] bg-white border border-input-stroke rounded-[0.8rem] cursor-pointer hover:border-brand-primary transition-all shadow-sm h-[4.8rem]"
      >
        <span
          className="text-[1.4rem] text-text-primary truncate"
          style={getFontStyle(isFamily, value)}
        >
          {value}
        </span>
        <ImageComponent
          src={icons.smArrowDown}
          alt="dropdown"
          width={16}
          height={16}
          className={cn("transition-transform", isOpen && "rotate-180")}
        />
      </div>

      <SmartDropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        triggerRef={triggerRef}
        placement="bottom-start"
        className="min-w-[20rem]"
      >
        <div className="flex flex-col py-[0.8rem]">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={cn(
                "px-[1.6rem] py-[1.2rem] hover:bg-soft-green cursor-pointer text-[1.4rem] transition-colors",
                value === option
                  ? "text-brand-primary bg-soft-green/50 font-[600]"
                  : "text-text-primary",
              )}
              style={getFontStyle(isFamily, option)}
            >
              {option}
            </div>
          ))}
        </div>
      </SmartDropdown>
    </div>
  );
}
