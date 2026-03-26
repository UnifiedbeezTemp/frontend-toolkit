"use client";

import { useAutomations } from "./hooks/useAutomations";
import { AutomationsContext } from "./AutomationsContext";
import AutomationTableHeader from "./sub-components/AutomationTableHeader";
import AutomationTable from "./sub-components/AutomationTable";
import AutomationTableSkeleton from "./sub-components/AutomationTableSkeleton";

interface ChildProps {
  automationType: string;
}

export default function Automations({ automationType }: ChildProps) {
  const state = useAutomations(automationType);

  return (
    <AutomationsContext.Provider value={state}>
      <div className="mt-[1.6rem] rounded-[.99rem] sm:border border-input-stroke bg-primary">
        <AutomationTableHeader automationType={automationType} />
        {state.isLoading ? <AutomationTableSkeleton /> : <AutomationTable />}
      </div>
    </AutomationsContext.Provider>
  );
}
