"use client";

import React from "react";
import Avatar from "../../../../../ui/Avatar";
import ChevronDownIcon from "../../../../../../assets/icons/ChevronDownIcon";

export default function AssignedTo() {
  return (
    <div className="flex flex-col gap-[2.4rem] pb-[1.6rem] border-b border-input-stroke">
      <h3 className="text-[1.6rem] font-bold text-dark-base-40 tracking-tight">
        Assigned to
      </h3>
      <div className="flex items-center justify-between group cursor-pointer">
        <div className="flex items-center gap-[1.2rem]">
          <Avatar
            alt="Assigned User"
            name="Carolyn Allen"
            size="md"
            className="w-[3.6rem] h-[3.6rem]"
          />
          <span className="text-[1.8rem] text-dark-base-70 font-bold">
            Carolyn Allen
          </span>
        </div>
        {/* <ChevronDownIcon size={20} color="var(--dark-base-40)" /> */}
      </div>
    </div>
  );
}
