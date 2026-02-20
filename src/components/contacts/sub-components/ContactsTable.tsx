"use client";

import React from "react";
import DesktopContactsTable from "./DesktopContactsTable";
import MobileContactsList from "./MobileContactsList";
import { useContactsTable } from "../hooks/useContactsTable";
import {
  Contact,
  selectAllContacts,
  clearSelection,
} from "../../../store/slices/contactSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/useRedux";

interface ContactsTableProps {
  onViewDetails: (contact: Contact) => void;
}

export default function ContactsTable({ onViewDetails }: ContactsTableProps) {
  const { currentContacts, filteredContacts } = useContactsTable();

  const dispatch = useAppDispatch();
  const selectedContacts = useAppSelector(
    (state) => state.contact.selectedContacts,
  );
  const isAllSelected =
    currentContacts.length > 0 &&
    currentContacts.every((c) => selectedContacts.includes(c.id));

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const currentIds = currentContacts.map((c) => c.id);
      dispatch(selectAllContacts(currentIds));
    } else {
      dispatch(clearSelection());
    }
  };

  if (filteredContacts.length === 0) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center">
        <p className="text-[1.8rem] font-bold text-text-primary mb-2">
          No contacts found
        </p>
        <p className="text-[1.4rem] text-text-primary/50">
          Try adjusting your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <DesktopContactsTable
        contacts={currentContacts}
        onViewDetails={onViewDetails}
        onSelectAll={handleSelectAll}
        isAllSelected={isAllSelected}
      />

      <MobileContactsList
        contacts={currentContacts}
        onViewDetails={onViewDetails}
      />
    </div>
  );
}
