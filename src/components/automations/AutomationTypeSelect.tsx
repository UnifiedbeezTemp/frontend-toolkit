"use client";

import React from "react";
import { AUTOMATION_TYPES } from "../../constants/automations";

interface ChildProps {
  automationType: string;
  setAutomationType: (value: string) => void;
}

export default function AutomationTypeSelect({
  setAutomationType,
  automationType,
}: ChildProps) {
  return (
    <div className="px-[0.8rem] py-[1.6rem] lg:rounded-[0.9rem] border border-input-stroke flex items-center justify-between overflow-x-auto w-screen lg:w-auto">
      {AUTOMATION_TYPES.map((type, idx) => (
        <button
          className={`${
            type === automationType
              ? "text-text-primary border-input-stroke shadow bg-white"
              : "text-inactive-color border-transparent"
          } text-[1.4rem] border rounded-[0.8rem] text-[1.4rem] transition-all duration-300 leading-[2.7rem] font-[700] py-[0.5rem] px-[1.6rem] shrink-0`}
          key={idx}
          onClick={() => setAutomationType(type)}
        >
          {type}
        </button>
      ))}
    </div>
  );
}
