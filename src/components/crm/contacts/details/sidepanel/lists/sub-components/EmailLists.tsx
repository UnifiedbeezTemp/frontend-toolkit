"use client";

import React from "react";
import { List } from "../hooks/useContactLists";
import { cn } from "../../../../../../../lib/utils";
import { InfoIcon } from "../../../../../../../assets/icons/InfoIcon";

interface EmailListsProps {
  lists: List[];
  onListClick: (list: List) => void;
}

export default function EmailLists({ lists, onListClick }: EmailListsProps) {
  return (
    <div className="flex flex-col gap-[1.2rem]">
      <h4 className="text-[1.6rem] font-bold text-dark-base-40">Email</h4>
      <div className="flex flex-wrap gap-[0.8rem] flex-col">
        {lists.map((list) => (
          <div
            key={list.id}
            onClick={() => onListClick(list)}
            className={cn(
              "flex items-center gap-[0.8rem] px-[1.2rem] py-[0.8rem] rounded-[0.8rem] border w-fit cursor-pointer hover:scale-[1.02] transition-all",
              list.variant === "danger"
                ? "bg-danger-100/10 border-none text-danger-100"
                : "bg-brand-primary/10 border-brand-primary text-brand-primary",
            )}
          >
            <div
              className={cn(
                "w-[2rem] h-[2rem] flex items-center justify-center rounded-full text-white font-bold text-[1.2rem]",
                list.variant === "danger"
                  ? "bg-danger-100"
                  : "bg-brand-primary",
              )}
            >
              <InfoIcon size={20} color="white" />
            </div>
            <span className="text-[1.6rem] font-bold">{list.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
