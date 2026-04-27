"use client";

import React from "react";
import ColorPickerItem from "./ColorPickerItem";
import Heading from "../../../../ui/Heading";

import { ModeColorsProps } from "../../../types/brandKitTypes";

export default function ModeColors({
  mode,
  primary,
  background,
  onColorChange,
  disabled,
}: ModeColorsProps) {
  return (
    <div className="flex flex-col gap-[2.4rem] bg-input-filled rounded px-[1.6rem] py-[2.4rem] border border-input-stroke rounded-[0.8rem]">
      <div className="flex flex-col gap-[1.6rem]">
        <Heading
          size="xs"
          className="text-text-secondary uppercase tracking-wider"
        >
          {mode} Mode
        </Heading>
        <div className="flex flex-col gap-[1.6rem] border-soft-green">
          <ColorPickerItem
            label="Primary"
            color={primary}
            disabled={disabled}
            onChange={(color) => onColorChange("primary", color)}
          />
          <ColorPickerItem
            label="Background"
            color={background}
            disabled={disabled}
            onChange={(color) => onColorChange("background", color)}
          />
        </div>
      </div>
    </div>
  );
}
