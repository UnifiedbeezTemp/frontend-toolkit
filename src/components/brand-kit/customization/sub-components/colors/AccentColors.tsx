"use client";

import React from "react";
import ColorPickerItem from "./ColorPickerItem";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import ImageComponent from "../../../../ui/ImageComponent";

import { AccentColorsProps } from "../../../types/brandKitTypes";

export default function AccentColors({
  accents,
  onAdd,
  onUpdate,
  onRemove,
}: AccentColorsProps) {
  const icons = useSupabaseIcons();

  return (
    <div className="flex flex-col gap-[1.6rem]">
      <div className="flex flex-col gap-[2.4rem]">
        {accents.map((color, index) => (
          <ColorPickerItem
            key={index}
            label={`Accent ${index + 1}`}
            color={color}
            onChange={(newColor) => onUpdate(index, newColor)}
            onDelete={() => onRemove(index)}
          />
        ))}
      </div>

      {accents.length < 5 && (
        <button
          onClick={onAdd}
          className="flex items-center gap-[0.8rem] text-brand-primary font-[600] text-[1.4rem] mt-[0.8rem] w-fit hover:opacity-80 transition-opacity"
        >
          <ImageComponent src={icons.plus} alt="add" width={16} height={16} />
          Add Color
        </button>
      )}
    </div>
  );
}
