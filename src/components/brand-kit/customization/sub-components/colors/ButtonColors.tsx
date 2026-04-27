"use client";

import React from "react";
import ColorPickerItem from "./ColorPickerItem";
import { ButtonColorsProps } from "../../../types/brandKitTypes";
import Heading from "../../../../ui/Heading";
import Text from "../../../../ui/Text";

export default function ButtonColors({
  color,
  text,
  stroke,
  onColorChange,
  disabled,
}: ButtonColorsProps) {
  return (
    <div className="flex flex-col gap-[2.4rem] mt-[1.6rem]">
      <div className="flex flex-col gap-[0.8rem]">
        <Heading size="sm">Buttons</Heading>
        <Text size="sm">Edit button appearance and interactions.</Text>
      </div>

      <div className="flex flex-col gap-[1.6rem]">
        <ColorPickerItem
          label="Button Color"
          color={color}
          disabled={disabled}
          onChange={(c) => onColorChange("color", c)}
        />
        <ColorPickerItem
          label="Button Text Color"
          color={text}
          disabled={disabled}
          onChange={(c) => onColorChange("text", c)}
        />
        <ColorPickerItem
          label="Button Stroke Color"
          color={stroke}
          disabled={disabled}
          onChange={(c) => onColorChange("stroke", c)}
        />
      </div>
    </div>
  );
}
