"use client";

import React from "react";
import ColorPickerItem from "./ColorPickerItem";
import { ButtonColorsProps } from "../../../types/brandKitTypes";
import Heading from "../../../../ui/Heading";
import Text from "../../../../ui/Text";

export default function ButtonColors({
  color,
  background,
  stroke,
  onColorChange,
}: ButtonColorsProps) {
  return (
    <div className="flex flex-col gap-[2.4rem] mt-[3.2rem]">
      <div className="flex flex-col gap-[0.8rem]">
        <Heading size="sm">Buttons</Heading>
        <Text size="sm">Edit button appearance and interactions.</Text>
      </div>

      <div className="flex flex-col gap-[1.6rem]">
        <ColorPickerItem
          label="Color"
          color={color}
          onChange={(c) => onColorChange("color", c)}
        />
        <ColorPickerItem
          label="Background"
          color={background}
          onChange={(c) => onColorChange("background", c)}
        />
        <ColorPickerItem
          label="Stroke"
          color={stroke}
          onChange={(c) => onColorChange("stroke", c)}
        />
      </div>
    </div>
  );
}
