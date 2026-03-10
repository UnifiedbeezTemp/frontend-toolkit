"use client";

import React from "react";
import Button from "../../../../../../ui/Button";
import { List } from "../hooks/useContactLists";
import PlusIcon from "../../../../../../../assets/icons/PlusIcon";

interface SmsListsProps {
  lists: List[];
  onAdd: () => void;
}

export default function SmsLists({ lists, onAdd }: SmsListsProps) {
  return (
    <div className="flex flex-col gap-[1.2rem]">
      <h4 className="text-[1.6rem] font-bold text-dark-base-40">SMS</h4>
      {lists.length > 0 ? (
        <div className="flex flex-wrap gap-[0.8rem]">
        </div>
      ) : (
        <div className="flex flex-col gap-[1.6rem]">
          <p className="text-[1.45rem] text-brand-primary">
            This contact was not added to your SMS list
          </p>
          <Button
            variant="secondary"
            onClick={onAdd}
            className="w-fit h-[4.4rem] px-[1.6rem] gap-[0.8rem] border-input-stroke bg-primary text-[1.6rem] font-bold text-dark-base-70"
          >
            <PlusIcon size={16} color="var(--dark-base-70)" />
            Add
          </Button>
        </div>
      )}
    </div>
  );
}
