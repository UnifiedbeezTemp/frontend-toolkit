"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { LibraryAutomation } from "../types";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import Checkbox from "../../../../ui/CheckBox";
import { SmartDropdown, DropdownItem } from "../../../../smart-dropdown";
import ChevronDownIcon from "../../../../../assets/icons/ChevronDownIcon";

interface MobileLibraryAutomationListProps {
  automations: LibraryAutomation[];
  selectedIds: string[];
  onSelect: (id: string) => void;
  onUpdateBusinessGoal: (id: string, goal: string) => void;
}

export default function MobileLibraryAutomationList({
  automations,
  selectedIds,
  onSelect,
  onUpdateBusinessGoal,
}: MobileLibraryAutomationListProps) {
  const icons = useSupabaseIcons();
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const triggerRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

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

  return (
    <div className="sm:hidden flex flex-col gap-[1.2rem] p-[1.6rem] bg-[var(--gray-50)]/30">
      {automations.map((automation) => {
        const isSelected = selectedIds.includes(automation.id);
        const automationIcon =
          icons[automation.iconKey as keyof typeof icons] ||
          icons.featuredIcon1;

        return (
          <div
            key={automation.id}
            className="flex flex-col gap-[1.2rem] p-[1.6rem] rounded-[1.2rem] border border-[var(--input-stroke)] bg-[var(--primary)] shadow-sm"
          >
            {/* Header: Checkbox, Icon, Name */}
            <div className="flex flex-col  items-start gap-[1.2rem]">
              <Checkbox
                checked={isSelected}
                onChange={() => onSelect(automation.id)}
                size="sm"
              />
              <div className="flex items-center gap-[1rem] flex-1 min-w-0">
                <div className="w-[3.6rem] h-[3.6rem] rounded-[0.8rem] border border-[var(--input-stroke)] overflow-hidden flex-shrink-0 bg-[var(--primary)] p-[0.4rem]">
                  <Image
                    src={automationIcon}
                    alt={automation.name}
                    width={28}
                    height={28}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-[1.4rem] font-bold text-[var(--text-primary)] truncate">
                  {automation.name}
                </span>
              </div>
              <div
                className={`flex-shrink-0 w-[0.8rem] h-[0.8rem] rounded-full ${
                  automation.status === "active"
                    ? "bg-[var(--crm-status-active-text)]"
                    : "bg-[var(--crm-status-bounced-text)]"
                }`}
              />
            </div>

            {/* Business Goal Dropdown */}
            <div className="relative">
              <button
                ref={(el) => (triggerRefs.current[automation.id] = el)}
                onClick={() =>
                  setOpenDropdownId(
                    openDropdownId === automation.id ? null : automation.id,
                  )
                }
                className="w-full flex items-center justify-between gap-[0.8rem] px-[1.2rem] py-[0.8rem] rounded-[0.8rem] border border-[var(--input-stroke)] bg-[var(--primary)] hover:border-[var(--brand-primary)] transition-all text-[1.2rem] text-[var(--text-primary)]"
              >
                <div className="flex flex-col items-start min-w-0">
                  <span className="text-[1.0rem] text-[var(--text-secondary)] uppercase font-bold tracking-wider">
                    Business Goal
                  </span>
                  <span className="truncate font-medium">
                    {automation.businessGoal}
                  </span>
                </div>
                <ChevronDownIcon
                  size={14}
                  className="text-[var(--text-secondary)] opacity-50"
                />
              </button>

              <SmartDropdown
                isOpen={openDropdownId === automation.id}
                onClose={() => setOpenDropdownId(null)}
                triggerRef={{ current: triggerRefs.current[automation.id] }}
                placement="bottom-start"
                className="!w-[20rem]"
              >
                <div className="p-2 flex flex-col gap-1">
                  {businessGoals.map((goal) => (
                    <DropdownItem
                      key={goal}
                      onClick={() => {
                        onUpdateBusinessGoal(automation.id, goal);
                        setOpenDropdownId(null);
                      }}
                      className={
                        automation.businessGoal === goal
                          ? "bg-[var(--accent)]"
                          : ""
                      }
                    >
                      <span className="text-[1.2rem] font-medium">{goal}</span>
                    </DropdownItem>
                  ))}
                </div>
              </SmartDropdown>
            </div>

            {/* Contacts & Status */}
            <div className="flex items-center justify-between pt-[0.8rem] border-t border-[var(--input-stroke)]">
              <div className="flex items-center gap-[0.6rem]">
                <span className="text-[1.2rem] text-[var(--text-secondary)]">
                  Contacts:
                </span>
                <span className="text-[1.2rem] font-bold text-[var(--text-primary)]">
                  {automation.currentContact}
                </span>
              </div>
              <span className="text-[1.1rem] text-[var(--text-secondary)] italic">
                Last Edited: {automation.lastEdited.split(" ")[0]}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
