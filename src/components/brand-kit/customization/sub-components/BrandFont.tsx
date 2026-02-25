"use client";

import React from "react";
import Heading from "../../../ui/Heading";
import Text from "../../../ui/Text";
import FontPickerItem from "./fonts/FontPickerItem";
import { useBrandKit } from "../../BrandKitContext";

export default function BrandFont() {
  const { fontHandlers } = useBrandKit();

  return (
    <div className="border-b border-input-stroke pb-[4rem] flex flex-col gap-[2.4rem]">
      <div className="flex flex-col gap-[0.8rem]">
        <Heading size="sm">Brand Font</Heading>
        <Text size="sm">
          We'll use an email-safe font if your font isn't supported.
        </Text>
      </div>

      <div className="flex flex-col gap-[2.4rem]">
        <FontPickerItem {...fontHandlers.header} />
        <FontPickerItem {...fontHandlers.body} />
      </div>
    </div>
  );
}
