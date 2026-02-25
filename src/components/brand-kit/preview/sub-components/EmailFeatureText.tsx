"use client";

import React from "react";
import {
  ModeColorState,
  BrandFontState,
  ButtonColorState,
} from "../../types/brandKitTypes";
import { getFontWeightStyle } from "../../utils/brandKitUtils";

interface Props {
  colors: ModeColorState;
  fonts: BrandFontState;
  buttonColors: ButtonColorState;
}

export default function EmailFeatureText({
  colors,
  fonts,
  buttonColors,
}: Props) {
  const headerStyle = {
    fontFamily: fonts.header.family,
    ...getFontWeightStyle(fonts.header.weight, fonts.header.style),
    color: colors.primary,
  };
  const bodyStyle = {
    fontFamily: fonts.body.family,
    ...getFontWeightStyle(fonts.body.weight, fonts.body.style),
    color: colors.primary,
  };

  return (
    <div className="mt-[3rem] px-[3rem] flex flex-col items-center justify-center text-center">
      <p style={bodyStyle} className="text-[1.8rem] font-[600]">
        Our new article
      </p>
      <h3 style={headerStyle} className="text-[3.1rem] font-[600] mt-[2rem]">
        Designing with Furniture
      </h3>
      <p style={bodyStyle} className="text-[1.7rem] mt-[1rem] leading-relaxed">
        Unleash your inner designer as we explore how furniture plays a vital
        role in creating stunning interiors...
      </p>
      <button
        className="px-[2.4rem] py-[1.2rem] text-[1.4rem] font-[600] mt-[2.4rem] rounded-[1.2rem] transition-all hover:opacity-90"
        style={{
          backgroundColor: buttonColors.background,
          border: `1px solid ${buttonColors.stroke}`,
          color: buttonColors.color,
        }}
      >
        Read more
      </button>
    </div>
  );
}
