"use client";

import React from "react";
import Image from "next/image";
import {
  Contact,
  toggleContactSelection,
} from "../../../store/slices/contactSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/useRedux";
import { cn } from "../../../lib/utils";
import Button from "../../ui/Button";
import Checkbox from "../../ui/CheckBox";
import { getContactStatusStyles } from "../utils/contactStatusStyles";

interface ContactsTableRowProps {
  contact: Contact;
  onViewDetails: (contact: Contact) => void;
}

export default function ContactsTableRow({
  contact,
  onViewDetails,
}: ContactsTableRowProps) {
  const dispatch = useAppDispatch();
  const isSelected = useAppSelector((state) =>
    state.contact.selectedContacts.includes(contact.id),
  );

  return (
    <tr
      className={cn(
        "border-b  border-input-stroke hover:bg-input-filled/50 transition-colors",
        isSelected && "bg-brand-primary/5",
      )}
    >
      <td className="py-4 px-4">
        <Checkbox
          checked={isSelected}
          onChange={() => dispatch(toggleContactSelection(contact.id))}
          size="sm"
        />
      </td>
      <td className="py-4 px-4 border-r border-input-stroke">
        <div className="flex items-center gap-3">
          {contact.avatar ? (
            <div className="w-10 h-10 rounded-full overflow-hidden border border-input-stroke">
              <Image
                src={contact.avatar}
                alt={contact.name}
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold">
              {contact.name.charAt(0)}
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-[1.4rem] font-bold text-text-primary">
              {contact.name}
            </span>
            <span className="text-[1.2rem] text-text-primary/50">
              {contact.username}
            </span>
          </div>
        </div>
      </td>
      <td className="py-4 px-4 text-[1.4rem] border-r border-input-stroke text-text-primary">
        {contact.email}
      </td>
      <td className="py-4 px-4 text-[1.4rem] border-r border-input-stroke text-text-primary">
        {contact.phone}
      </td>
      <td className="py-4 px-4 text-[1.4rem] border-r border-input-stroke text-text-primary">
        {contact.dateCreated}
      </td>
      <td className="py-4 px-4 border-r border-input-stroke">
        <span
          className={cn(
            "px-3 py-1 rounded-full text-[1.2rem] font-medium inline-flex items-center gap-1",
            getContactStatusStyles(contact.status),
          )}
        >
          <span className="w-2 h-2 rounded-full bg-current" />
          {contact.status}
        </span>
      </td>
      <td className="py-4 px-4">
        <Button
          variant="secondary"
          className="text-[1.2rem] font-bold border border-input-stroke rounded-lg px-4 py-2 hover:bg-input-filled transition-colors"
          onClick={() => onViewDetails(contact)}
        >
          View details
        </Button>
      </td>
    </tr>
  );
}
