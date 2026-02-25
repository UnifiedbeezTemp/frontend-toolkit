"use client";

import React from "react";
import { ModeColorState, BrandFontState } from "../../types/brandKitTypes";
import { getFontWeightStyle } from "../../utils/brandKitUtils";

interface Props {
  colors: ModeColorState;
  fonts: BrandFontState;
}

export default function EmailHeader({ colors, fonts }: Props) {
  const headerStyle = {
    fontFamily: fonts.header.family,
    ...getFontWeightStyle(fonts.header.weight, fonts.header.style),
  };
  const bodyStyle = {
    fontFamily: fonts.body.family,
    ...getFontWeightStyle(fonts.body.weight, fonts.body.style),
  };

  return (
    <div
      className="px-[1rem] border-b border-border flex items-center justify-between p-[1.5rem]"
      style={{ borderColor: colors.primary }}
    >
      <div className="">
        <div className="flex items-center gap-[8px]">
          <p style={headerStyle}>E-commerce Business Template</p>
          <button
            className="text-[10px] p-[4px] px-[8px] border rounded-[7px]"
            style={{
              borderColor: colors.primary,
              color: colors.primary,
            }}
          >
            Draft
          </button>
        </div>
        <p style={bodyStyle} className="text-[10px]">
          From: UnifiedBeez &lt;hello@unifiedbeez.com&gt;
        </p>
      </div>
      <div className="flex items-center gap-[5px]">
        {["#FE5F57", "#F3B42F", "#377A3C"].map((i) => (
          <div
            key={i}
            className="w-[10px] h-[10px] rounded-full inline-block"
            style={{ backgroundColor: i }}
          />
        ))}
      </div>
    </div>
  );
}
