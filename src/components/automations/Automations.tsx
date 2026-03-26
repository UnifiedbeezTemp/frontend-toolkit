"use client";

import React from "react";
import { useAutomations } from "./hooks/useAutomations";
import AutomationTableHeader from "./sub-components/AutomationTableHeader";
import AutomationTable from "./sub-components/AutomationTable";
import AutomationTableSkeleton from "./sub-components/AutomationTableSkeleton";

interface ChildProps {
  automationType: string;
}

export default function Automations({ automationType }: ChildProps) {
  const { isLoading } = useAutomations(automationType);

  return (
    <div className="mt-[1.6rem] rounded-[.99rem] sm:border border-input-stroke bg-primary">
      <AutomationTableHeader automationType={automationType} />

      {isLoading ? <AutomationTableSkeleton /> : <AutomationTable />}
    </div>
  );
}
