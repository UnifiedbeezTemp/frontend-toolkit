"use client";

import React from "react";
import { useAutomations } from "./hooks/useAutomations";
import AutomationTableHeader from "./sub-components/AutomationTableHeader";
import AutomationTable from "./sub-components/AutomationTable";

interface ChildProps {
  automationType: string;
}

export default function Automations({ automationType }: ChildProps) {
  useAutomations(automationType);

  return (
    <div className="mt-[1.6rem] rounded-[.99rem] sm:border border-input-stroke">
      <AutomationTableHeader automationType={automationType} />

      <AutomationTable />
    </div>
  );
}
