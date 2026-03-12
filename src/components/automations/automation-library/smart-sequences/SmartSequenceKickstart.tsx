"use client";

import React from "react";
import Heading from "../../../ui/Heading";
import AIInput from "../../automations-page/AIInput";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";

export default function SmartSequenceKickstart() {
  const icons = useSupabaseIcons();

  return (
    <div className="w-full max-w-[80rem] mx-auto flex flex-col gap-[1.2rem] transition-all duration-300">
      <div className="flex flex-col gap-[0.8rem] items-center text-center px-[1.6rem]">
        <Heading className="text-[2rem] sm:text-[2.4rem] font-bold">
          Kickstart your next automation with ease.
        </Heading>
        <p className="text-[1.4rem] sm:text-[1.6rem]">
          Tell Beezora what you want to achieve, and she'll craft the workflow
          from idea to execution.
        </p>
      </div>

      <div className="w-full">
        <AIInput sendIcon={icons.send2} />
      </div>
    </div>
  );
}
