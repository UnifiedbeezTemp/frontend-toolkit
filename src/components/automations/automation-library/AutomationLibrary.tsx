import React from "react";
import TemplateLibraryOverview from "./template-library-overview/TemplateLibraryOverview";
import KickstartSection from "./template-library-overview/KickstartSection";
import LibraryAutomationTable from "./automation-table/LibraryAutomationTable";

export default function AutomationLibrary() {
  return (
    <div className="flex flex-col gap-[4rem]">
      <TemplateLibraryOverview />

      <KickstartSection />

      <div className="flex flex-col gap-[2.4rem]">
        <LibraryAutomationTable />
      </div>
    </div>
  );
}
