"use client";

import React from "react";
import ChevronDownIcon from "../../../../../../assets/icons/ChevronDownIcon";

export default function LeadStatus() {
  return (
    <div className="flex flex-col gap-[2.4rem] pb-[1.6rem] border-b border-input-stroke">
      <h3 className="text-[1.6rem] font-bold text-dark-base-40 tracking-tight">
        Lead Status
      </h3>
      <div className="flex items-center justify-between group cursor-pointer">
        <span className="text-[1.8rem] text-dark-base-70 font-bold">
          New Lead
        </span>
        {/* <ChevronDownIcon size={20} color="var(--dark-base-40)" /> */}
      </div>
    </div>
  );
}
