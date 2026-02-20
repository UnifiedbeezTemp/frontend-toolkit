"use client";

import React from "react";
import { Automation } from "../../../store/slices/automationSlice";
import AutomationTableRow from "./AutomationTableRow";

interface DesktopAutomationTableProps {
  currentAutomations: Automation[];
}

export default function DesktopAutomationTable({
  currentAutomations,
}: DesktopAutomationTableProps) {
  return (
    <div className="hidden sm:block">
      <table className="w-full border-collapse">
        <thead className="bg-input-filled w-full">
          <tr className="border-b border-border">
            <th className="text-left py-[.9rem] px-4 font-bold text-text-primary text-[1.16rem] border-r border-border">
              <div className="flex items-center gap-[10px]">
                <div className="w-[1.65rem] h-[1.65rem] rounded-[0.4rem] border border-border bg-white"></div>
                Automation Name
              </div>
            </th>
            <th className="text-left py-[.9rem] px-4 font-bold text-text-primary text-[1.16rem] border-r border-border">
              Status
            </th>
            <th className="text-center py-[.9rem] px-4 font-bold text-text-primary text-[1.16rem] border-r border-border">
              Contact in automation
            </th>
            <th className="text-center py-[.9rem] px-4 font-bold text-text-primary text-[1.16rem] border-r border-border">
              Campaigns in automation
            </th>
            <th className="text-center py-[.9rem] px-4 font-bold text-text-primary text-[1.16rem] border-r border-border">
              Conversion tracking trigger
            </th>
            <th className="text-center py-[.9rem] px-4 font-bold text-text-primary text-[1.16rem]">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {currentAutomations.map((automation, idx) => (
            <AutomationTableRow
              key={automation.id}
              automation={automation}
              isLast={idx === currentAutomations.length - 1}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
