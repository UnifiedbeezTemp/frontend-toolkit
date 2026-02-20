"use client";

import React from "react";
import { Contact } from "../../../store/slices/contactSlice";
import ContactsTableRow from "./ContactsTableRow";
import Checkbox from "../../ui/CheckBox";
import { cn } from "../../../lib/utils";

interface DesktopContactsTableProps {
  contacts: Contact[];
  onViewDetails: (contact: Contact) => void;
  onSelectAll: (checked: boolean) => void;
  isAllSelected: boolean;
}

export default function DesktopContactsTable({
  contacts,
  onViewDetails,
  onSelectAll,
  isAllSelected,
}: DesktopContactsTableProps) {
  const headers = [
    { label: "Full name", className: "w-auto" },
    { label: "Email address", className: "w-auto" },
    { label: "Phone", className: "w-auto" },
    { label: "Date created", className: "w-auto" },
    { label: "Status", className: "w-auto" },
    { label: "Action", className: "w-auto", noBorder: true },
  ];

  return (
    <div className="hidden sm:block overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-input-stroke bg-input-filled">
            <th className="py-4 px-4 w-10">
              <Checkbox
                checked={isAllSelected}
                onChange={(checked) => onSelectAll(checked)}
                size="sm"
              />
            </th>
            {headers.map((header, index) => (
              <th
                key={index}
                className={cn(
                  "py-4 px-4 text-[1.2rem] font-medium text-text-primary/50 uppercase tracking-wider",
                  !header.noBorder && "",
                  header.className,
                )}
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <ContactsTableRow
              key={contact.id}
              contact={contact}
              onViewDetails={onViewDetails}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
