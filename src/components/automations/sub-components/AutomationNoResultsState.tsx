"use client";

import React from "react";
import Image from "next/image";
import Button from "../../ui/Button";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import { useAutomationTableHeader } from "../hooks/useAutomationTableHeader";

export default function AutomationNoResultsState() {
  const icons = useSupabaseIcons();
  const { resetFilters } = useAutomationTableHeader();

  return (
    <div className="flex flex-col items-center justify-center py-[10rem] px-4 text-center">
      <div className="w-[8rem] h-[8rem] bg-input-filled rounded-full flex items-center justify-center mb-6">
        <Image
          src={icons.searchIg}
          alt="No results"
          width={45}
          height={45}
          className="opacity-40"
        />
      </div>
      <h3 className="text-[2rem] font-bold text-text-primary mb-2">
        No matching automations
      </h3>
      <p className="text-[1.4rem] text-text-primary/60 max-w-[400px] mb-8">
        We couldn't find any automations matching your current filters. Try
        adjusting your search or reset all filters to see everything.
      </p>
      <Button variant="secondary" onClick={resetFilters}>
        Reset All Filters
      </Button>
    </div>
  );
}
