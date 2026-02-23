"use client";

import React from "react";
import ImageComponent from "../../ui/ImageComponent";
import Text from "../../ui/Text";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";

interface WarningProps {
  unCompletedSteps: number;
}

export default function RemainingWarning({ unCompletedSteps }: WarningProps) {
  const supabaseIcons = useSupabaseIcons();
  return (
    <div className="flex flex-col items-start border border-warning bg-warning/20 py-[1.6rem] px-[.8rem] rounded-[.8rem]">
      <div className="flex items-start gap-[1rem]">
        <ImageComponent
          alt="warning"
          src={supabaseIcons.warning}
          width={25}
          height={25}
        />
        <div>
          <p className="text-text-secondary lg:text-[20px] text-[18px] leading-[2rem] font-[700]">
            {unCompletedSteps} Steps remaining
          </p>
          <Text
            size="sm"
            className="text-[14px] font-[400] leading-[2.2rem] text-text-primary mt-[5px] hidden sm:block"
          >
            You can go live now, but completing these steps will help you get
            the most out of UnifiedBeez.
          </Text>
        </div>
      </div>
      <Text
        size="sm"
        className="text-[14px] font-[400] leading-[2.2rem] text-text-primary block sm:hidden"
      >
        You can go live now, but completing these steps will help you get the
        most out of UnifiedBeez.
      </Text>
    </div>
  );
}
