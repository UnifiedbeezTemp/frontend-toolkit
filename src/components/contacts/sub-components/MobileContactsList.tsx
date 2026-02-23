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

interface MobileContactsListProps {
  contacts: Contact[];
  onViewDetails: (contact: Contact) => void;
}

export default function MobileContactsList({
  contacts,
  onViewDetails,
}: MobileContactsListProps) {
  const dispatch = useAppDispatch();
  const selectedContacts = useAppSelector(
    (state) => state.contact.selectedContacts,
  );

  return (
    <div className="sm:hidden flex flex-col gap-4">
      {contacts.map((contact) => {
        const isSelected = selectedContacts.includes(contact.id);
        return (
          <div
            key={contact.id}
            className={cn(
              "p-4 border border-border rounded-xl flex flex-col gap-4 bg-white",
              isSelected && "border-brand-primary/50 bg-brand-primary/5",
            )}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {contact.avatar ? (
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-border">
                    <Image
                      src={contact.avatar}
                      alt={contact.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold text-[1.6rem]">
                    {contact.name.charAt(0)}
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-[1.6rem] font-bold text-text-primary">
                    {contact.name}
                  </span>
                  <span className="text-[1.2rem] text-text-primary/50">
                    {contact.username}
                  </span>
                </div>
              </div>
              <Checkbox
                checked={isSelected}
                onChange={() => dispatch(toggleContactSelection(contact.id))}
                size="sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-[1rem] text-text-primary/40 uppercase">
                  Email
                </span>
                <span className="text-[1.2rem] text-text-primary/70 break-all">
                  {contact.email}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[1rem] text-text-primary/40 uppercase">
                  Phone
                </span>
                <span className="text-[1.2rem] text-text-primary/70">
                  {contact.phone}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-2 pt-4 border-t border-border">
              <span
                className={cn(
                  "px-3 py-1 rounded-full text-[1.2rem] font-medium inline-flex items-center gap-1",
                  getContactStatusStyles(contact.status),
                )}
              >
                <span className="w-2 h-2 rounded-full bg-current" />
                {contact.status}
              </span>
              <Button
                variant="secondary"
                className="text-[1.2rem] font-bold border border-input-stroke rounded-lg px-4 py-2"
                onClick={() => onViewDetails(contact)}
              >
                View details
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
