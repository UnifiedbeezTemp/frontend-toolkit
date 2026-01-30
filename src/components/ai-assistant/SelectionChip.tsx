"use client";

import { SelectionChipProps } from "./types";

export default function SelectionChip({
  text,
  colorScheme,
}: SelectionChipProps) {
  return (
    <span
      className={`font-[700] border rounded-[0.4rem] text-[1rem] px-[0.875rem] py-[0.375rem] ${colorScheme.bg} ${colorScheme.text} ${colorScheme.border}`}
    >
      {text}
    </span>
  );
}
