"use client";

import React from "react";
import { ProductItem } from "../constants/previewConstants";
import EmailProductItem from "./EmailProductItem";
import {
  BrandFontState,
  ButtonColorState,
  FontColorState,
} from "../../types/brandKitTypes";
import { getFontWeightStyle } from "../../utils/brandKitUtils";

interface Props {
  products: ProductItem[];
  images: Record<string, string>;
  fonts: BrandFontState;
  fontColors: FontColorState;
  buttonColors: ButtonColorState;
}

export default function EmailProductGrid({
  products,
  images,
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
    <div className="mt-[5rem] w-full px-[2rem]">
      <p style={{ ...headerStyle, fontSize: fonts.scale.h3 }} className="font-[600]">
        Timeless Charm
      </p>
      <p style={{ ...bodyStyle, fontSize: fonts.scale.body }} className="mt-2">
        Classic designs that never go out of style. Experience enduring elegance
      </p>

      <div className="grid md:grid-cols-3 items-center gap-[2rem] mt-[2rem]">
        {products?.map((product, i) => (
          <EmailProductItem
            key={i}
            product={product}
            image={images[product.image]}
            fonts={fonts}
            fontColors={fontColors}
            buttonColors={buttonColors}
          />
        ))}
      </div>
    </div>
  );
}
