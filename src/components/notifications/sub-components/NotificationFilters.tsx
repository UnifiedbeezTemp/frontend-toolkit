import React from "react";
import { NotificationCategory } from "../types";
import { cn } from "../../../lib/utils";

interface NotificationFiltersProps {
  activeFilter: NotificationCategory;
  onFilterChange: (category: NotificationCategory) => void;
}

const CATEGORIES: { label: string; value: NotificationCategory }[] = [
  { label: "All", value: "all" },
  { label: "Channels", value: "channels" },
  { label: "Automations", value: "automations" },
  { label: "System", value: "system" },
];

export default function NotificationFilters({
  activeFilter,
  onFilterChange,
}: NotificationFiltersProps) {
  return (
    <div className="flex items-center gap-[0.8rem] px-[2rem] py-[1.2rem] overflow-x-auto no-scrollbar">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onFilterChange(cat.value)}
          className={cn(
            "px-[1.6rem] py-[0.6rem] rounded-full text-[1.3rem] font-semibold border transition-all truncate",
            activeFilter === cat.value
              ? "bg-soft-green border-success text-success"
              : "border-border text-text-primary/50 hover:text-text-primary",
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
