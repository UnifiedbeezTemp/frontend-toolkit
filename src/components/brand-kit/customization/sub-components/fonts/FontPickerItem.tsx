"use client";

import React from "react";
import FontSelector from "./FontSelector";
import {
  EMAIL_SAFE_FONTS,
} from "../../../constants/fontsConstants";

import { FontPickerItemProps } from "../../../types/brandKitTypes";
import { WEIGHT_OPTIONS } from "../../../constants/brandKitConstants";

export default function FontPickerItem({
  label,
  family,
  weight,
  onFamilyChange,
  onWeightChange,
}: FontPickerItemProps) {
  return (
    <div className="flex flex-col gap-[0.8rem] flex-1">
      <span className="text-[1.4rem] font-[500] text-text-secondary">
        {label}
      </span>
      <div className="flex items-center gap-[1.2rem] w-full">
        <FontSelector
          value={family}
          options={EMAIL_SAFE_FONTS}
          onChange={onFamilyChange}
          isFamily
        />
        <FontSelector
          value={weight}
          options={WEIGHT_OPTIONS}
          onChange={onWeightChange}
        />
      </div>
    </div>
  );
}
