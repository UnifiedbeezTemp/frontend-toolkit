"use client";

import React from "react";
import Avatar from "../../../../ui/Avatar";
import Button from "../../../../ui/Button";
import { Contact } from "../../types";
import { TablerEditIcon } from "../../../../../assets/icons/TablerEditIcon";
import MoreVerticalIcon from "../../../../../assets/icons/MoreVerticalIcon";

interface ContactDetailsProfileProps {
  contact: Contact;
  onMoreClick?: () => void;
}

export default function ContactDetailsProfile({
  contact,
  onMoreClick,
}: ContactDetailsProfileProps) {
  return (
    <div className="flex justify-between lg:flex-col gap-[2rem]">
      <div className="flex items-center gap-[1.6rem]">
        <Avatar
          src={contact.avatar}
          name={contact.name}
          size="lg"
          className="w-[8rem] h-[8rem]"
          alt={contact.name}
        />
        <div className="flex flex-col">
          <h2 className="text-[2.2rem] font-bold text-dark-base-70 tracking-tight leading-tight">
            {contact.name}
          </h2>
          <span className="text-[1.4rem] text-dark-base-40 font-medium">
            {contact.email}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-[1.2rem]">
        <Button
          variant="secondary"
          className="flex-1 h-[4.4rem] gap-[0.8rem] border-input-stroke text-[1.4rem] font-bold hidden lg:flex"
        >
          <TablerEditIcon size={20} />
          Edit
        </Button>
        <button
          onClick={onMoreClick}
          className="w-[4.4rem] h-[4.4rem] flex items-center justify-center rounded-[0.8rem] border border-input-stroke bg-primary hover:bg-input-filled transition-all text-dark-base-70  lg:hidden"
        >
          <MoreVerticalIcon size={3} height={16} />
        </button>
      </div>
    </div>
  );
}
