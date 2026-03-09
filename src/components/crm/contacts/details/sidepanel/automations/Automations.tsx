"use client";

import React from "react";
import Button from "../../../../../ui/Button";
import PlusIcon from "../../../../../../assets/icons/PlusIcon";
import { useAutomations } from "./hooks/useAutomations";

export default function Automations() {
  const { automations, handleCreateAutomation } = useAutomations();

  return (
    <div className="flex flex-col gap-[1.6rem] pb-[1.6rem] border-b border-input-stroke">
      <h3 className="text-[1.6rem] font-bold text-dark-base-70 tracking-tight">
        Automations
      </h3>

      <div className="flex flex-col gap-[1.2rem] p-[1.6rem] bg-input-filled border border-input-stroke rounded-[0.8rem]">
        <div className="flex flex-col gap-[1.2rem]">
          {automations.map((automation, index) => (
            <div
              key={index}
              className="px-[1.6rem] py-[1rem] bg-primary border border-input-stroke rounded-[0.8rem] text-[1.4rem] font-bold text-dark-base-70 text-left w-fit"
            >
              {automation}
            </div>
          ))}
        </div>
      </div>
      <Button
        variant="secondary"
        onClick={handleCreateAutomation}
        className="w-full h-[4.4rem] gap-[0.8rem] border-border text-[1.4rem] font-bold bg-primary w-fit ml-auto"
      >
        <PlusIcon size={16} color="var(--dark-base-70)" />
        Create New Automation
      </Button>
    </div>
  );
}
