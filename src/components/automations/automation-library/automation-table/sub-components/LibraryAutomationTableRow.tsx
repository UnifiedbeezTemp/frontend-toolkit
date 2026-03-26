"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { LibraryAutomation } from "../types";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import { SmartDropdown, DropdownItem } from "../../../../smart-dropdown";
import Checkbox from "../../../../ui/CheckBox";
import ChevronDownIcon from "../../../../../assets/icons/ChevronDownIcon";

interface LibraryAutomationTableRowProps {
  automation: LibraryAutomation;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onUpdateBusinessGoal: (id: string, goal: string) => void;
  isLast: boolean;
}

export default function LibraryAutomationTableRow({
  automation,
  isSelected,
  onSelect,
  onUpdateBusinessGoal,
  isLast,
}: LibraryAutomationTableRowProps) {
  const icons = useSupabaseIcons();
  const [isGoalDropdownOpen, setIsGoalDropdownOpen] = useState(false);
  const goalTriggerRef = useRef<HTMLButtonElement>(null);

  const businessGoals = [
    "Marketing Lead Strategy",
    "Sales Conversion",
    "Customer Retention",
    "Product Onboarding",
    "Support Efficiency",
    "Customer Success",
    "Re-engagement",
    "Support Escalation",
  ];

  const automationIcon =
    icons[automation.iconKey as keyof typeof icons] || icons.featuredIcon1;

  return (
    <tr
      className={`${
        isLast ? "" : "border-b border-[var(--input-stroke)]"
      } hover:bg-[var(--gray-50)] transition-colors group`}
    >
      {/* Checkbox & Name */}
      <td className="py-[1.2rem] px-[1.6rem] border-r border-[var(--input-stroke)] max-w-[40rem]">
        <div className="flex items-center gap-[1.2rem]">
          <Checkbox
            checked={isSelected}
            onChange={() => onSelect(automation.id)}
            size="sm"
          />
          <div className="flex items-center gap-[1rem]">
            <div className="w-[4rem] h-[4rem] rounded-[0.8rem] border border-[var(--input-stroke)] overflow-hidden flex-shrink-0 bg-[var(--primary)] p-[0.4rem]">
              <Image
                src={automationIcon}
                alt={automation.name}
                width={32}
                height={32}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-[1.4rem] font-medium text-[var(--text-primary)] line-clamp-1">
              {automation.name}
            </span>
          </div>
        </div>
      </td>

      {/* Business Goals / Label */}
      <td className="py-[1.2rem] px-[1.6rem] border-r border-[var(--input-stroke)]">
        <div className="relative">
          <button
            ref={goalTriggerRef}
            onClick={() => setIsGoalDropdownOpen(!isGoalDropdownOpen)}
            className="w-full flex items-center justify-between gap-[0.8rem] px-[1.2rem] py-[0.6rem] rounded-[0.6rem] border border-[var(--input-stroke)] bg-[var(--primary)] hover:border-[var(--brand-primary)] transition-all text-[1.3rem] text-[var(--text-primary)]"
          >
            <span className="truncate">{automation.businessGoal}</span>
            <ChevronDownIcon
              size={14}
              className="text-[var(--text-secondary)] opacity-50 group-hover:opacity-100"
            />
          </button>

          <SmartDropdown
            isOpen={isGoalDropdownOpen}
            onClose={() => setIsGoalDropdownOpen(false)}
            triggerRef={goalTriggerRef}
            placement="bottom-start"
            className="!w-[20rem]"
          >
            <div className="p-2 flex flex-col gap-1">
              {businessGoals.map((goal) => (
                <DropdownItem
                  key={goal}
                  onClick={() => {
                    onUpdateBusinessGoal(automation.id, goal);
                    setIsGoalDropdownOpen(false);
                  }}
                  className={
                    automation.businessGoal === goal ? "bg-[var(--accent)]" : ""
                  }
                >
                  <span className="text-[1.3rem] font-medium">{goal}</span>
                </DropdownItem>
              ))}
            </div>
          </SmartDropdown>
        </div>
      </td>

      {/* Status */}
      <td className="py-[1.2rem] px-[1.6rem] border-r border-[var(--input-stroke)]">
        <div className="flex justify-center">
          <div
            className={`inline-flex items-center gap-[0.6rem] px-[1rem] py-[0.4rem] rounded-full text-[1.2rem] font-bold ${
              automation.status === "active"
                ? "bg-[var(--crm-status-active-bg)] text-[var(--crm-status-active-text)]"
                : "bg-[var(--crm-status-bounced-bg)] text-[var(--crm-status-bounced-text)]"
            }`}
          >
            <span
              className={`w-[0.6rem] h-[0.6rem] rounded-full ${
                automation.status === "active"
                  ? "bg-[var(--crm-status-active-text)]"
                  : "bg-[var(--crm-status-bounced-text)]"
              }`}
            />
            {automation.status.charAt(0).toUpperCase() +
              automation.status.slice(1)}
          </div>
        </div>
      </td>

      {/* Last Edited */}
      <td className="py-[1.2rem] px-[1.6rem] border-r border-[var(--input-stroke)]">
        <div className="flex justify-center">
          <span className="text-[1.3rem] text-[var(--text-secondary)] text-center px-[0.8rem] py-[0.4rem] rounded-[0.4rem] border border-[var(--input-stroke)] bg-[var(--primary)] shadow-sm">
            {automation.lastEdited}
          </span>
        </div>
      </td>

      {/* Current Contact */}
      <td className="py-[1.2rem] px-[1.6rem]">
        <div className="flex justify-center">
          <span className="text-[1.4rem] font-medium text-[var(--text-primary)]">
            {automation.currentContact}
          </span>
        </div>
      </td>
    </tr>
  );
}
