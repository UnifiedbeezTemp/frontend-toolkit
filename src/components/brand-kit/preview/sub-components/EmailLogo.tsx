"use client";

import React from "react";
import ImageComponent from "../../../ui/ImageComponent";
import { ModeColorState } from "../../types/brandKitTypes";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";

interface Props {
  logo: string | null;
  colors: ModeColorState;
}

export default function EmailLogo({ logo, colors }: Props) {
  const icons = useSupabaseIcons();

  return (
    <div className="px-[4rem] pt-[2rem] flex flex-col items-center justify-center">
      <div
        className="border rounded-full inline-block p-[1rem] mx-auto overflow-hidden flex items-center justify-center bg-white"
        style={{ borderColor: colors.primary }}
      >
        <ImageComponent
          src={logo || "/images/logo.svg"}
          alt="logo"
          width={50}
          height={50}
          className="object-contain"
        />
      </div>
    </div>
  );
}
