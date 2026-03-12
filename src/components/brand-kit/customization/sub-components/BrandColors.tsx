"use client";

import React from "react";
import Heading from "../../../ui/Heading";
import Text from "../../../ui/Text";
import ModeColors from "./colors/ModeColors";
import ColorPickerItem from "./colors/ColorPickerItem";
import { useBrandKit } from "../../context/BrandKitContext";

export default function BrandColors() {
  const { colors, colorHandlers } = useBrandKit();

  return (
    <div className="border-b border-input-stroke pb-[4rem] flex flex-col gap-[3.2rem] pt-[1.6rem]">
      <div className="flex flex-col gap-[0.8rem]">
        <Heading size="sm">Brand Colors</Heading>
        <Text size="sm">
          These colors will be used for buttons, highlights, and campaign
          consistency across different themes.
        </Text>
      </div>

      <div className="grid grid-cols-1 gap-[4.8rem]">
        <ModeColors {...colorHandlers.light} />
        <ModeColors {...colorHandlers.dark} />
      </div>

      <div className="bg-input-filled rounded px-[1.6rem] py-[2.4rem] border border-input-stroke rounded-[0.8rem]">
        <Heading
          size="xs"
          className="text-text-secondary uppercase tracking-wider mb-[1.6rem]"
        >
          Accent
        </Heading>
        <ColorPickerItem
          label="Accent Color"
          color={colors.accentColor}
          onChange={colorHandlers.accent.onAccentColorChange}
        />
      </div>
    </div>
  );
}
