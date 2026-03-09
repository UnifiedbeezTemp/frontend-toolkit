import React from "react";
import { Contact } from "../types";
import Avatar from "../../../ui/Avatar";
import StatusPill from "../../../ui/StatusPill";
import Button from "../../../ui/Button";
import CheckBox from "../../../ui/CheckBox";
import EyeIcon from "../../../../assets/icons/EyeIcon";

interface ContactsTableRowProps {
  contact: Contact;
  isSelected: boolean;
  onToggleSelection: (id: string) => void;
  onViewDetails: (contact: Contact) => void;
}

export default function ContactsTableRow({
  contact,
  isSelected,
  onToggleSelection,
  onViewDetails,
}: ContactsTableRowProps) {
  return (
    <tr className="border-b border-border hover:bg-input-filled transition-colors">
      <td className="py-[1.6rem] px-[1.6rem]">
        <CheckBox
          checked={isSelected}
          onChange={() => onToggleSelection(contact.id)}
        />
      </td>
      <td className="py-[1.6rem] px-[1.6rem] border-r border-border">
        <div className="flex items-center gap-[1.2rem]">
          <Avatar
            src={contact.avatar}
            alt={contact.name}
            name={contact.name}
            size="sm"
            className="w-[3.2rem] h-[3.2rem]"
          />
          <div className="flex flex-col">
            <span className="text-[1.4rem] font-bold text-dark-base-70 leading-none mb-1">
              {contact.name}
            </span>
            <span className="text-[1.2rem] text-dark-base-40">
              {contact.username}
            </span>
          </div>
        </div>
      </td>

      {/* Tablet: Merged Contact column */}
      <td className="py-[1.6rem] px-[1.6rem] border-r border-border lg:hidden">
        <div className="flex flex-col gap-1">
          <span className="text-[1.4rem] text-dark-base-70 truncate max-w-[15rem]">
            {contact.email}
          </span>
          <span className="text-[1.2rem] text-dark-base-40">
            {contact.phone}
          </span>
        </div>
      </td>

      {/* Desktop: Separate columns */}
      <td className="hidden lg:table-cell py-[1.6rem] px-[1.6rem] text-[1.4rem] text-dark-base-70 border-r border-border">
        {contact.email}
      </td>
      <td className="hidden lg:table-cell py-[1.6rem] px-[1.6rem] text-[1.4rem] text-dark-base-70 border-r border-border">
        {contact.phone}
      </td>
      <td className="hidden lg:table-cell py-[1.6rem] px-[1.6rem] text-[1.4rem] text-dark-base-70 font-medium border-r border-border">
        {contact.dateCreated}
      </td>

      <td className="py-[1.6rem] px-[1.6rem] border-r border-border">
        <StatusPill status={contact.status} />
      </td>
      <td className="py-[1.6rem] px-[1.6rem]">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onViewDetails(contact)}
          className="h-[3.6rem] text-[1.2rem] px-[1.2rem] flex items-center justify-center"
        >
          <EyeIcon className="lg:hidden" />
          <span className="hidden lg:inline">View details</span>
        </Button>
      </td>
    </tr>
  );
}
