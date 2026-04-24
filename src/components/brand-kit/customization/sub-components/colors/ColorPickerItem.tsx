"use client";

import React, { useRef, useState } from "react";
import SmartDropdown from "../../../../smart-dropdown/SmartDropdown";
import ColorPicker from "../../../../color-picker/ColorPicker";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import { cn } from "../../../../../lib/utils";
import ImageComponent from "../../../../ui/ImageComponent";

import { ColorPickerItemProps } from "../../../types/brandKitTypes";

export default function ColorPickerItem({
  label,
  color,
  onChange,
  onDelete,
  className,
  disabled = false,
}: ColorPickerItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const icons = useSupabaseIcons();

  return (
    <div className={cn("flex flex-col gap-[0.8rem]", className)}>
      <span className="text-[1.4rem] font-[500] text-text-secondary">
        {label}
      </span>
      <div className="flex items-center gap-[0.8rem]">
        <div
          ref={triggerRef}
          onClick={() => {
            if (!disabled) setIsOpen(!isOpen);
          }}
          className={cn(
            "flex-1 flex items-center justify-between px-[1.6rem] py-[1.2rem] bg-white border border-input-stroke rounded-[0.8rem] transition-all shadow-sm",
            disabled
              ? "cursor-not-allowed opacity-60"
              : "cursor-pointer hover:border-brand-primary",
          )}
        >
          <div className="flex items-center gap-[1.2rem]">
            <div
              className="w-[2.4rem] h-[2.4rem] rounded-full border border-input-stroke"
              style={{ backgroundColor: color || "#FFFFFF" }}
            />
            <span className="text-[1.4rem] text-text-primary">
              {color || "Select color"}
            </span>
          </div>
          <ImageComponent
            src={icons.smArrowDown}
            alt="dropdown"
            width={16}
            height={16}
            className={cn("transition-transform", isOpen && "rotate-180")}
          />
        </div>

        {onDelete && (
          <button
            onClick={onDelete}
            disabled={disabled}
            className="p-[0.8rem] hover:bg-soft-green rounded-[0.4rem] transition-colors"
          >
            <ImageComponent
              src={icons.trash}
              alt="delete"
              width={20}
              height={20}
            />
          </button>
        )}
      </div>

      <SmartDropdown
        isOpen={isOpen && !disabled}
        onClose={() => setIsOpen(false)}
        triggerRef={triggerRef}
        placement="bottom-start"
        className=""
        maxHeight="60rem"
      >
        <ColorPicker value={color} onChange={onChange} />
      </SmartDropdown>
    </div>
  );
}
