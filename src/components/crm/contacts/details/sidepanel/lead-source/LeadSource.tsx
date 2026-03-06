"use client";

import React from "react";
import { useSupabaseIcons } from "../../../../../../lib/supabase/useSupabase";
import ImageComponent from "../../../../../ui/ImageComponent";

export default function LeadSource() {
    const icons = useSupabaseIcons()
  return (
    <div className="flex flex-col gap-[1.6rem] pb-[2.4rem] border-b border-input-stroke">
      <h3 className="text-[1.6rem] font-bold text-dark-base-40 tracking-tight">
        Lead Source
      </h3>
      <div className="flex items-center gap-[1.2rem]">
        <ImageComponent src={icons.google} alt={"google"} width={24} height={24}/>
        <span className="text-[1.8rem] text-dark-base-70 font-bold">
          Google Ads
        </span>
      </div>
    </div>
  );
}
