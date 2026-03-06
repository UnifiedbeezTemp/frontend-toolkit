"use client";

import React from "react";
import { ContentTab } from "../hooks/useContactContent";
import { cn } from "../../../../../../lib/utils";
import OutlineMail from "../../../../../../assets/icons/OutlineMail";
import ListBoxIcon from "../../../../../../assets/icons/ListBoxIcon";
import TablerMessageIcon from "../../../../../../assets/icons/TablerMessageIcon";
import TDesignChartIcon from "../../../../../../assets/icons/TDesignChartIcon";
import AddCallOutlineIcon from "../../../../../../assets/icons/AddCallOutlineIcon";
import FolderOutlineIcon from "../../../../../../assets/icons/FolderOutlineIcon";

interface ContentTabsProps {
  activeTab: ContentTab;
  onTabChange: (tab: ContentTab) => void;
}

export default function ContentTabs({
  activeTab,
  onTabChange,
}: ContentTabsProps) {
  const tabs = [
    { id: "activity", label: "Activity", icon: TDesignChartIcon },
    { id: "tasks", label: "Tasks", icon: ListBoxIcon },
    { id: "emails", label: "Emails", icon: OutlineMail },
    { id: "communication", label: "Communication", icon: AddCallOutlineIcon },
    { id: "documents", label: "Documents", icon: FolderOutlineIcon },
  ] as const;

  return (
    <div className="flex bg-input-filled sm:rounded-[1.2rem] p-[0.8rem] w-screen overflow-x-auto sm:w-full items-center justify-between border border-input-stroke shrink-0">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex items-center w-full flex items-center justify-center gap-[0.8rem] px-[1.6rem] py-[1rem] rounded-[0.8rem] transition-all group",
              isActive
                ? "bg-primary text-dark-base-70 shadow border border-border"
                : "text-inactive-color hover:text-dark-base-100",
            )}
          >
            <Icon
              size={20}
              color={
                isActive ? "var(--dark-base-70)" : "var(--inactive-color)"
              }
              className="transition-colors group-hover:!text-dark-base-100"
            />
            <span className="text-[1.4rem] font-bold">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
