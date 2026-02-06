"use client";

import React from "react";
import { cn } from "../../lib/utils";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import ImageComponent from "./ImageComponent";

interface SelectionIndicatorProps {
  isSelected: boolean;
  className?: string;
  size?: number;
}

export default function SelectionIndicator({
  isSelected,
  className,
  size = 24,
}: SelectionIndicatorProps) {
  const icons = useSupabaseIcons();

  return (
    <div
      className={cn(
        "flex-shrink-0 rounded-full flex items-center justify-center transition-all duration-300",
        !isSelected && "border border-input-stroke bg-primary",
        className
      )}
      style={{ width: `${size / 10}rem`, height: `${size / 10}rem` }}
    >
      {isSelected ? (
        <ImageComponent
          src={icons.checkboxBase2}
          alt="selected"
          width={size}
          height={size}
          className="rounded-full"
        />
      ) : null}
    </div>
  );
}
