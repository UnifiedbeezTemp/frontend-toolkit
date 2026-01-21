"use client";

import React from "react";
import { cn } from "../../../lib/utils";
import { motion } from "framer-motion";
import { usePlanSelectionToggle } from "./hooks/usePlanSelectionToggle";

interface PlanSelectionToggleProps {
  isYearly: boolean;
  onTabChange: (isYearly: boolean) => void;
  className?: string;
}

export default function PlanSelectionToggle({
  isYearly,
  onTabChange,
  className = "",
}: PlanSelectionToggleProps) {
  const tabs = ["Monthly", "Yearly(Save15%)"];
  const activeTab = isYearly ? "Yearly(Save15%)" : "Monthly";
  const { indicatorStyle, tabRefs } = usePlanSelectionToggle(isYearly);

  return (
    <div
      className={cn(
        "inline-flex items-center relative",
        "bg-toggle-filled border border-input-stroke rounded-[0.8rem] h-[4rem]",
        className
      )}
      role="tablist"
    >
      <motion.div
        className={cn(
          "absolute bg-primary shadow-sm rounded-[0.7rem] h-full border-input-stroke",
          isYearly ? "border-l" : "border-r"
        )}
        initial={false}
        animate={{
          left: indicatorStyle.left,
          width: indicatorStyle.width,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      />
      {tabs.map((tab, index) => {
        const isActive = activeTab === tab;

        return (
          <button
            key={tab}
            ref={(el: HTMLButtonElement | null) => {
              tabRefs.current[index] = el;
            }}
            type="button"
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onTabChange(tab === "Yearly(Save15%)")}
            className={cn(
              "relative z-10 flex-1 px-[1.2rem] py-[0.8rem] font-bold text-[1.4rem] transition-colors duration-200",
              isActive
                ? "text-text-primary"
                : "text-inactive-color hover:text-text-primary"
            )}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
