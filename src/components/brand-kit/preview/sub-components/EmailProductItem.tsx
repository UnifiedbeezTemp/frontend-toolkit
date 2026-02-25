"use client";

import React from "react";
import ImageComponent from "../../../ui/ImageComponent";
import { ProductItem } from "../constants/previewConstants";
import {
  ModeColorState,
  BrandFontState,
  ButtonColorState,
} from "../../types/brandKitTypes";
import { getFontWeightStyle } from "../../utils/brandKitUtils";

interface Props {
  product: ProductItem;
  image: string;
  colors: ModeColorState;
  fonts: BrandFontState;
  buttonColors: ButtonColorState;
}

export default function EmailProductItem({
  product,
  image,
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
    <div className="text-center">
      <ImageComponent
        src={image}
        alt={product.name}
        width={150}
        height={150}
        className="rounded-[10px] w-full object-cover"
      />
      <div className="mt-[10px] space-y-[8px] text-center flex flex-col items-center justify-center">
        <p style={headerStyle} className="text-[12px]">
          {product.name}
        </p>
        <p style={bodyStyle} className="text-[12px]">
          {product.description}
        </p>
        <p style={{ ...bodyStyle, fontWeight: 600 }} className="text-[13px]">
          {product.price}
        </p>
        <button
          className="px-[15px] py-[9px] text-[13px] font-[600] mt-[10px] rounded-[7px] w-full transition-all hover:opacity-90"
          style={{
            backgroundColor: buttonColors.background,
            border: `1px solid ${buttonColors.stroke}`,
            color: buttonColors.color,
          }}
        >
          Buy
        </button>
      </div>
    </div>
  );
}
