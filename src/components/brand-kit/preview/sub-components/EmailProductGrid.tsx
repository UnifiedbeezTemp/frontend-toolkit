"use client";

import React from "react";
import { ProductItem } from "../constants/previewConstants";
import EmailProductItem from "./EmailProductItem";
import {
  ModeColorState,
  BrandFontState,
  ButtonColorState,
} from "../../types/brandKitTypes";
import { getFontWeightStyle } from "../../utils/brandKitUtils";

interface Props {
  products: ProductItem[];
  images: Record<string, string>;
  colors: ModeColorState;
  fonts: BrandFontState;
  buttonColors: ButtonColorState;
}

export default function EmailProductGrid({
  products,
  images,
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
    <div className="mt-[5rem] w-full px-[2rem]">
      <p style={headerStyle} className="text-[2rem] font-[600]">
        Timeless Charm
      </p>
      <p style={bodyStyle} className="text-[1.2rem] mt-2">
        Classic designs that never go out of style. Experience enduring elegance
      </p>

      <div className="grid md:grid-cols-3 items-center gap-[2rem] mt-[2rem]">
        {products?.map((product, i) => (
          <EmailProductItem
            key={i}
            product={product}
            image={images[product.image]}
            colors={colors}
            fonts={fonts}
            buttonColors={buttonColors}
          />
        ))}
      </div>
    </div>
  );
}
