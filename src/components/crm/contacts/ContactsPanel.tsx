import React, { useState } from "react";
import ContactsHeader from "./sub-components/ContactsHeader";
import ContactsTable from "./sub-components/ContactsTable";
import { useContactsTable } from "./hooks/useContactsTable";
import PaginationV2 from "../../ui/PaginationV2";
import Pagination from "../../ui/Pagination";
import { useRouter } from "next/navigation";
import ContactDetailsModal from "./modals/ContactDetailsModal";
import type { Contact } from "./types";

export default function ContactsPanel() {
  const router = useRouter();
  const {
    contacts,
    selectedContacts,
    searchQuery,
    setSearchQuery,
    selectedStatus,
    setSelectedStatus,
    currentPage,
    totalPages,
    toggleSelection,
    toggleSelectAll,
    handlePageChange,
    deleteSelected,
    totalCount,
  } = useContactsTable();

  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleViewDetails = (contact: Contact) => {
    setSelectedContact(contact);
    setIsDetailsOpen(true);
  };

  const handleMoreClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/crm/contacts/${id}`);
  };

  return (
    <div className="relative bg-primary rounded-[1.6rem] border border-border overflow-hidden shadow-sm">
      <ContactsHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalContacts={totalCount}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        onDeleteSelected={deleteSelected}
        isSelectionEmpty={selectedContacts.length === 0}
      />

      <div className="flex-1">
        <ContactsTable
          contacts={contacts}
          selectedContacts={selectedContacts}
          onToggleSelection={toggleSelection}
          onToggleSelectAll={toggleSelectAll}
          onViewDetails={handleViewDetails}
          onMoreClick={handleMoreClick}
        />
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <ContactDetailsModal
        contact={selectedContact}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        onOpenFullDetails={(contact) => router.push(`/crm/contacts/${contact.id}`)}
      />
    </div>
  );
}
