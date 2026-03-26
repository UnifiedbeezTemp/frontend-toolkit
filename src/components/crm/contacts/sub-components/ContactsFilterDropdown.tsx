import React from "react";
import SmartDropdown from "../../../smart-dropdown/SmartDropdown";
import { DropdownItem } from "../../../smart-dropdown/DropdownItem";
import { ContactStatus } from "../types";
import StatusPill from "../../../ui/StatusPill";

interface ContactsFilterDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  selectedStatus: ContactStatus | "all";
  onStatusChange: (status: ContactStatus | "all") => void;
}

export default function ContactsFilterDropdown({
  isOpen,
  onClose,
  triggerRef,
  selectedStatus,
  onStatusChange,
}: ContactsFilterDropdownProps) {
  const statuses: (ContactStatus | "all")[] = [
    "all",
    "active",
    "unconfirmed",
    "unsubscribed",
    "bounced",
  ];

  return (
    <SmartDropdown
      isOpen={isOpen}
      onClose={onClose}
      triggerRef={triggerRef}
      placement="bottom-end"
      maxHeight="none"
      className="!w-[20rem]"
    >
      <div className="p-2 flex flex-col gap-1">
        <p className="px-3 py-1 text-[1.2rem] font-bold text-dark-base-40">
          Filter by status
        </p>
        {statuses.map((status) => (
          <DropdownItem
            key={status}
            onClick={() => {
              onStatusChange(status);
              onClose();
            }}
            className={selectedStatus === status ? "bg-accent" : ""}
          >
            {status === "all" ? (
              <span className="text-[1.4rem] font-medium px-2">
                All Contacts
              </span>
            ) : (
              <StatusPill
                status={status as ContactStatus}
                className="scale-90 origin-left"
              />
            )}
          </DropdownItem>
        ))}
      </div>
    </SmartDropdown>
  );
}
