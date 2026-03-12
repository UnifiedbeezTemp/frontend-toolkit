import React from "react";
import { Contact } from "../types";
import Avatar from "../../../ui/Avatar";
import StatusPill from "../../../ui/StatusPill";
import CheckBox from "../../../ui/CheckBox";
import MoreVerticalIcon from "../../../../assets/icons/MoreVerticalIcon";

interface ContactCardProps {
  contact: Contact;
  isSelected: boolean;
  onToggleSelection: (id: string) => void;
  onMoreClick: (id: string, e: React.MouseEvent) => void;
}

export default function ContactCard({
  contact,
  isSelected,
  onToggleSelection,
  onMoreClick,
}: ContactCardProps) {
  return (
    <div className="bg-primary p-[1.6rem] border-b border-border transition-colors hover:bg-input-filled flex gap-[1.2rem]">
      <div className="pt-2">
        <CheckBox
          checked={isSelected}
          onChange={() => onToggleSelection(contact.id)}
        />
      </div>

      <div className="flex-1 flex flex-col gap-[1.2rem]">
        {/* Top Row: Avatar, Name, Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[1.2rem]">
            <Avatar
              src={contact.avatar}
              alt={contact.name}
              name={contact.name}
              size="sm"
              className="w-[3.2rem] h-[3.2rem]"
            />
            <span className="text-[1.4rem] font-bold text-dark-base-70">
              {contact.name}
            </span>
          </div>
          <StatusPill
            status={contact.status}
            className="scale-90 origin-right"
          />
        </div>

        {/* Middle Row: Email and Date */}
        <div className="flex justify-between items-center text-[1.2rem]">
          <span className="text-dark-base-40 truncate max-w-[15rem]">
            {contact.email}
          </span>
          <span className="text-dark-base-40">04/04/2024</span>
        </div>

        {/* Bottom Row: Phone and Time/More */}
        <div className="flex justify-between items-center text-[1.2rem]">
          <span className="text-dark-base-40">{contact.phone}</span>
          <div className="flex items-center gap-2">
            <span className="text-dark-base-40">12:32</span>
            <button
              onClick={(e) => onMoreClick(contact.id, e)}
              className="p-1 hover:bg-accent rounded-md transition-colors"
            >
              <MoreVerticalIcon size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
