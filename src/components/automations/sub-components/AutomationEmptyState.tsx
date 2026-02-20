"use client";

import React from "react";
import Image from "next/image";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";

export default function AutomationEmptyState() {
  const icons = useSupabaseIcons();

  return (
    <div className="flex flex-col items-center justify-center py-[10rem] px-4 text-center">
      <div className="w-[8rem] h-[8rem] bg-input-filled rounded-full flex items-center justify-center mb-6">
        <Image
          src={icons.bookmarkX}
          alt="Empty"
          width={45}
          height={45}
          className="opacity-40"
        />
      </div>
      <h3 className="text-[2rem] font-bold text-text-primary mb-2">
        Start building your first automation
      </h3>
      <p className="text-[1.4rem] text-text-primary/60 max-w-[400px] mb-8">
        You don't have any automations yet. Create your first one to start
        optimizing your workflow and scaling your impact.
      </p>
    </div>
  );
}
