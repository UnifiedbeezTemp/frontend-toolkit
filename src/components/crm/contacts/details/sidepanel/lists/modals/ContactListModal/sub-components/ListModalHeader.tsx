"use client";

import React, { useRef, useState } from "react";
import ChevronDownIcon from "../../../../../../../../../assets/icons/ChevronDownIcon";
import { List } from "../../../hooks/useContactLists";
import { cn } from "../../../../../../../../../lib/utils";
import { SmartDropdown } from "../../../../../../../../smart-dropdown";

interface ListModalHeaderProps {
  list: List;
  statusFilter: string;
  onStatusChange: (status: string) => void;
}

const statusOptions = [
  { id: "all", label: "All", color: "bg-dark-base-40" },
  { id: "active", label: "Active", color: "bg-success" },
  { id: "unconfirmed", label: "Unconfirmed", color: "bg-warning" },
  { id: "unsubscribed", label: "Unsubscribed", color: "bg-destructive" },
  { id: "bounced", label: "Bounced", color: "bg-dark-base-40" },
];

export default function ListModalHeader({
  list,
  statusFilter,
  onStatusChange,
}: ListModalHeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  const currentOption =
    statusOptions.find((opt) => opt.id === statusFilter) || statusOptions[0];

  return (
    <div className="flex items-center justify-between pb-[1.6rem] px-[1.6rem] pt-[0.8rem]">
      <div className="flex items-center gap-[1.2rem]">
        <h2 className="text-[1.6rem] font-bold text-dark-base-100">
          List: {list.label}
        </h2>
        <div className="border border-border text-dark-base-70 px-[1rem] py-[0.4rem] rounded-full text-[1.2rem] font-bold">
          {list.type === "email" ? "Email" : "SMS"}
        </div>
      </div>

      <div className="flex items-center gap-[1.2rem]">
        <span className="text-[1.6rem] font-bold text-dark-base-70">
          Status
        </span>
        <div
          ref={triggerRef}
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className="flex items-center gap-[0.8rem] px-[1.6rem] py-[1rem] border border-input-stroke rounded-[0.8rem] cursor-pointer min-w-[18rem] justify-between hover:bg-input-filled transition-colors"
        >
          <div className="flex items-center gap-[0.8rem]">
            <div
              className={cn(
                "w-[0.8rem] h-[0.8rem] rounded-full",
                currentOption.color,
              )}
            />
            <span className="text-[1.6rem] font-bold text-dark-base-100">
              {currentOption.label}
            </span>
          </div>
          <ChevronDownIcon size={12} color="var(--dark-base-70)" />
        </div>

        <SmartDropdown
          isOpen={isDropdownOpen}
          onClose={() => setIsDropdownOpen(false)}
          triggerRef={triggerRef}
          maxHeight="none"
        >
          <div className="flex flex-col overflow-hidden bg-primary shadow-xl rounded-[0.8rem]">
            {statusOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => {
                  onStatusChange(option.id);
                  setIsDropdownOpen(false);
                }}
                className={cn(
                  "px-[1.6rem] py-[1.2rem] hover:bg-input-filled cursor-pointer text-[1.4rem] font-bold flex items-center gap-[0.8rem]",
                  statusFilter === option.id
                    ? "text-brand-primary bg-brand-primary/5"
                    : "text-dark-base-70",
                )}
              >
                <div
                  className={cn(
                    "w-[0.8rem] h-[0.8rem] rounded-full",
                    option.color,
                  )}
                />
                {option.label}
              </div>
            ))}
          </div>
        </SmartDropdown>
      </div>
    </div>
  );
}
