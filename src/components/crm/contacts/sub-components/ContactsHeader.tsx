import React from "react";
import Input from "../../../forms/Input";
import Button from "../../../ui/Button";
import Heading from "../../../ui/Heading";
import SearchIcon from "../../../../assets/icons/SearchIcon";
import FunnelIcon from "../../../../assets/icons/FunnelIcon";
import PlusIcon from "../../../../assets/icons/PlusIcon";
import DownloadIcon from "../../../../assets/icons/DownloadIcon";
import MoreVerticalIcon from "../../../../assets/icons/MoreVerticalIcon";
import IconActionModal from "../../../modal/IconActionModal";
import ContactsFilterDropdown from "./ContactsFilterDropdown";
import ContactsMoreDropdown from "./ContactsMoreDropdown";
import CreateContactModal from "../create-contact/CreateContactModal";
import { useContactsHeader } from "../hooks/useContactsHeader";
import { ContactStatus } from "../types";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";

interface ContactsHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  totalContacts: number;
  selectedStatus: ContactStatus | "all";
  onStatusChange: (status: ContactStatus | "all") => void;
  onDeleteSelected: () => void;
  isSelectionEmpty: boolean;
}

export default function ContactsHeader({
  searchQuery,
  onSearchChange,
  totalContacts,
  selectedStatus,
  onStatusChange,
  onDeleteSelected,
  isSelectionEmpty,
}: ContactsHeaderProps) {
  const {
    isImportModalOpen,
    isAddModalOpen,
    isFilterOpen,
    isMoreOpen,
    filterTriggerRef,
    moreTriggerRef,
    toggleImportModal,
    toggleAddModal,
    toggleFilter,
    toggleMore,
    closeFilter,
    closeMore,
  } = useContactsHeader();

  const icons = useSupabaseIcons();

  return (
    <div className="flex flex-col gap-[2.4rem] p-[1.6rem] sm:p-[2.4rem]">
      {/* Buttons Row: Import and Add (Always visible, responsive layout) */}
      <div className="flex flex-col sm:flex-row items-center gap-[1.2rem] lg:absolute lg:top-[-6.5rem] lg:right-0">
        <Button
          variant="secondary"
          className="flex-1 sm:flex-none px-[1.6rem] gap-[0.8rem] h-[4.4rem] w-full"
          onClick={toggleImportModal}
        >
          <DownloadIcon size={20} />
          Import CSV
        </Button>

        <Button
          className="flex-1 sm:flex-none px-[1.6rem] gap-[0.8rem] grad-btn h-[4.4rem] w-full"
          onClick={toggleAddModal}
        >
          <PlusIcon size={20} />
          Add a contact
        </Button>
      </div>

      <div className="flex flex-col gap-[1.6rem] lg:flex-row lg:justify-between">
        {/* Count Badge and Title (Desktop) */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[0.8rem]">
            <span className="text-[1.8rem] font-bold text-dark-base-70">
              Contacts
            </span>
            <span className="px-[0.8rem] py-[0.2rem] rounded-full text-[1rem] text-dark-base-70 border border-border bg-input-filled/10">
              {totalContacts} users
            </span>
          </div>

          {/* Desktop More Actions (Optional if not in search row) */}
        </div>

        {/* Search, Filter, More row */}
        <div className="flex items-center gap-[1.2rem]">
          <div className="hidden lg:flex items-center gap-[1.2rem]">
            <Button
              variant="secondary"
              className="flex-1 sm:flex-none px-[1.6rem] gap-[0.8rem] h-[4.4rem]"
              onClick={toggleImportModal}
            >
              <DownloadIcon size={20} />
              Import CSV
            </Button>

            <Button
              className="flex-1 sm:flex-none px-[1.6rem] gap-[0.8rem] grad-btn h-[4.4rem]"
              onClick={toggleAddModal}
            >
              <PlusIcon size={20} />
              Add a contact
            </Button>
          </div>
          <div className="flex-1 max-w-[50rem]">
            <Input
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search contacts"
              leftIcon={<SearchIcon size={20} color="var(--dark-base-40)" />}
              className="h-[4.4rem]"
            />
          </div>

          <Button
            ref={filterTriggerRef}
            variant="secondary"
            className="w-[4.4rem] h-[4.4rem] flex items-center justify-center shrink-0"
            onClick={toggleFilter}
          >
            <FunnelIcon size={20} />
          </Button>

          <button
            ref={moreTriggerRef}
            onClick={toggleMore}
            className="w-[4.4rem] h-[4.4rem] flex items-center justify-center hover:bg-input-filled rounded-md transition-colors shrink-0 "
          >
            <MoreVerticalIcon />
          </button>
        </div>
      </div>

      <IconActionModal
        isOpen={isImportModalOpen}
        onClose={toggleImportModal}
        title="Feature Not Available"
        description="The CSV import feature is currently under development and will be available in a future update."
        icon={{
          src: icons.infoOutline,
          alt: "Info",
        }}
        primaryAction={{
          label: "Understood",
          onClick: toggleImportModal,
        }}
      />

      <CreateContactModal isOpen={isAddModalOpen} onClose={toggleAddModal} />

      <ContactsFilterDropdown
        isOpen={isFilterOpen}
        onClose={closeFilter}
        triggerRef={filterTriggerRef}
        selectedStatus={selectedStatus}
        onStatusChange={onStatusChange}
      />

      <ContactsMoreDropdown
        isOpen={isMoreOpen}
        onClose={closeMore}
        triggerRef={moreTriggerRef}
        onDeleteSelected={onDeleteSelected}
        isSelectionEmpty={isSelectionEmpty}
      />
    </div>
  );
}
