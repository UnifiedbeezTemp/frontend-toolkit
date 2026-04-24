"use client";

import React from "react";
import {
  BrandFontState,
  ButtonColorState,
  FontColorState,
} from "../../types/brandKitTypes";
import { getFontWeightStyle } from "../../utils/brandKitUtils";

interface Props {
  fonts: BrandFontState;
  fontColors: FontColorState;
  buttonColors: ButtonColorState;
}

export default function EmailFeatureText({
  fonts,
  fontColors,
  buttonColors,
}: Props) {
  const headerStyle = {
    fontFamily: fonts.header.family,
    ...getFontWeightStyle(fonts.header.weight, fonts.header.style),
    color: fontColors.headingColor,
  };
  const bodyStyle = {
    fontFamily: fonts.body.family,
    ...getFontWeightStyle(fonts.body.weight, fonts.body.style),
    color: fontColors.bodyColor,
  };

  return (
    <div className="mt-[3rem] px-[3rem] flex flex-col items-center justify-center text-center">
      <p style={bodyStyle} className="font-[600]">
        Our new article
      </p>
      <h3
        style={{ ...headerStyle, fontSize: fonts.scale.h2 }}
        className="font-[600] mt-[2rem]"
      >
        Designing with Furniture
      </h3>
      <p
        style={{ ...bodyStyle, fontSize: fonts.scale.body }}
        className="mt-[1rem] leading-relaxed"
      >
        Unleash your inner designer as we explore how furniture plays a vital
        role in creating stunning interiors...
      </p>
      <button
        className="px-[2.4rem] py-[1.2rem] text-[1.4rem] font-[600] mt-[2.4rem] rounded-[1.2rem] transition-all hover:opacity-90"
        style={{
          backgroundColor: buttonColors.color,
          border: `1px solid ${buttonColors.stroke}`,
          color: buttonColors.text,
        }}
      >
        Read more
      </button>
    </div>
  );
}
