import React from "react";
import { Contact } from "../types";
import ContactsTableRow from "./ContactsTableRow";
import CheckBox from "../../../ui/CheckBox";
import ContactCard from "./ContactCard";

interface ContactsTableProps {
  contacts: Contact[];
  selectedContacts: string[];
  onToggleSelection: (id: string) => void;
  onToggleSelectAll: () => void;
  onViewDetails: (contact: Contact) => void;
  onMoreClick: (id: string, e: React.MouseEvent) => void;
}

export default function ContactsTable({
  contacts,
  selectedContacts,
  onToggleSelection,
  onToggleSelectAll,
  onViewDetails,
  onMoreClick,
}: ContactsTableProps) {
  const allSelected =
    contacts.length > 0 && selectedContacts.length === contacts.length;

  return (
    <div className="w-full">
      {/* Mobile view (< md) */}
      <div className="md:hidden">
        <div className="p-[1.6rem] border-b border-border bg-input-filled/10 flex items-center gap-[1.2rem]">
          <CheckBox checked={allSelected} onChange={onToggleSelectAll} />
          <span className="text-[1.4rem] font-medium text-dark-base-70">
            Select All
          </span>
        </div>
        <div className="flex flex-col">
          {contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              isSelected={selectedContacts.includes(contact.id)}
              onToggleSelection={onToggleSelection}
              onMoreClick={onMoreClick}
            />
          ))}
        </div>
      </div>

      {/* Tablet/Desktop view (>= md) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[70rem] lg:min-w-[100rem]">
          <thead>
            <tr className="bg-input-filled border-b border-border">
              <th className="py-[1.2rem] px-[1.6rem] w-[4.8rem]">
                <CheckBox checked={allSelected} onChange={onToggleSelectAll} />
              </th>
              <th className="py-[1.2rem] px-[1.6rem] text-[1.2rem] font-bold text-dark-base-70 tracking-wider border-r border-border">
                Full name
              </th>
              {/* Tablet: Merged Contact column | Desktop: Separate Email and Phone */}
              <th className="py-[1.2rem] px-[1.6rem] text-[1.2rem] font-bold text-dark-base-70 tracking-wider border-r border-border lg:hidden">
                Contact
              </th>
              <th className="hidden lg:table-cell py-[1.2rem] px-[1.6rem] text-[1.2rem] font-bold text-dark-base-70 tracking-wider border-r border-border">
                Email address
              </th>
              <th className="hidden lg:table-cell py-[1.2rem] px-[1.6rem] text-[1.2rem] font-bold text-dark-base-70 tracking-wider border-r border-border">
                Phone
              </th>
              <th className="hidden lg:table-cell py-[1.2rem] px-[1.6rem] text-[1.2rem] font-bold text-dark-base-70 tracking-wider border-r border-border">
                Date Created
              </th>
              <th className="py-[1.2rem] px-[1.6rem] text-[1.2rem] font-bold text-dark-base-70 tracking-wider border-r border-border">
                Status
              </th>
              <th className="py-[1.2rem] px-[1.6rem] text-[1.2rem] font-bold text-dark-base-70 tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <ContactsTableRow
                key={contact.id}
                contact={contact}
                isSelected={selectedContacts.includes(contact.id)}
                onToggleSelection={onToggleSelection}
                onViewDetails={onViewDetails}
              />
            ))}
          </tbody>
        </table>
      </div>

      {contacts.length === 0 && (
        <div className="py-[8rem] flex flex-col items-center justify-center text-center">
          <p className="text-dark-base-40 text-[1.6rem]">
            No contacts found matching your search.
          </p>
        </div>
      )}
    </div>
  );
}
