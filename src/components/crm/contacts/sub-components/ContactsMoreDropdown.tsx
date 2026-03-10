import React from "react";
import SmartDropdown from "../../../smart-dropdown/SmartDropdown";
import { DropdownItem } from "../../../smart-dropdown/DropdownItem";
import TrashIcon from "../../../../assets/icons/TrashIcon";

interface ContactsMoreDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  onDeleteSelected: () => void;
  isSelectionEmpty: boolean;
}

export default function ContactsMoreDropdown({
  isOpen,
  onClose,
  triggerRef,
  onDeleteSelected,
  isSelectionEmpty,
}: ContactsMoreDropdownProps) {
  return (
    <SmartDropdown
      isOpen={isOpen}
      onClose={onClose}
      triggerRef={triggerRef}
      placement="bottom-end"
      className="!w-[18rem]"
    >
      <div className="p-2">
        <DropdownItem
          onClick={() => {
            onDeleteSelected();
            onClose();
          }}
          disabled={isSelectionEmpty}
          className="text-destructive hover:bg-destructive/10"
        >
          <TrashIcon size={18} />
          <span className="text-[1.4rem] font-medium">Delete selected</span>
        </DropdownItem>
      </div>
    </SmartDropdown>
  );
}
