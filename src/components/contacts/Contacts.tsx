"use client";

import React, { useState } from "react";
import ContactsTableHeader from "./sub-components/ContactsTableHeader";
import ContactsTable from "./sub-components/ContactsTable";
import ContactDetailsModal from "./modals/ContactDetailsModal";
import { Contact } from "../../store/slices/contactSlice";
import { useContacts } from "./hooks/useContacts";
import { useContactsTable } from "./hooks/useContactsTable";
import PaginationV2 from "../ui/PaginationV2";

interface ContactsProps {
  onClose?: () => void;
}

export default function Contacts({ onClose }: ContactsProps) {
  useContacts();

  const { currentPage, totalPages, handlePageChange } = useContactsTable();

  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleViewDetails = (contact: Contact) => {
    setSelectedContact(contact);
    setIsDetailsOpen(true);
  };

  return (
    <>
      <div className="pt-[1.9rem] sm:pt-[2.4rem] bg-primary pb-[1rem] sticky top-0">
        <ContactsTableHeader />
      </div>

      <div className="flex-1 overflow-y-auto">
        <ContactsTable onViewDetails={handleViewDetails} />
      </div>

      <div className="p-[1.6rem] sm:p-[2.4rem] border-t border-input-stroke sticky bottom-0 shadow bg-primary py-[4rem] px-[1rem] lg:px-[4rem] flex items-center justify-between gap-[10px] w-full">
        <PaginationV2
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <ContactDetailsModal
        contact={selectedContact}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />
    </>
  );
}
