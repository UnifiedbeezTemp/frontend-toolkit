"use client";

import React from "react";
import Heading from "../../../ui/Heading";
import Text from "../../../ui/Text";
import ModeColors from "./colors/ModeColors";
import { useBrandKit } from "../../BrandKitContext";

export default function BrandColors() {
  const { colors, colorHandlers } = useBrandKit();

  return (
    <div className="border-b border-input-stroke pb-[4rem] flex flex-col gap-[3.2rem]">
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
    </div>
  );
}
