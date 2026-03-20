"use client";

import React from "react";
import Modal from "../../../modal/Modal";
import ModalHeader from "../../../modal/ModalHeader";
import CloseModalButton from "../../../modal/CloseModalButton";
import Avatar from "../../../ui/Avatar";
import StatusPill from "../../../ui/StatusPill";
import Text from "../../../ui/Text";
import type { Contact } from "../types";

type ContactDetailsModalProps = {
  contact: Contact | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenFullDetails?: (contact: Contact) => void;
};

export default function ContactDetailsModal({
  contact,
  isOpen,
  onClose,
  onOpenFullDetails,
}: ContactDetailsModalProps) {
  if (!contact) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      bottomSheet
      isBlur
      className="w-full sm:w-[52rem] max-h-[85dvh] rounded-t-[2rem] sm:rounded-[1.6rem] overflow-hidden"
    >
      <div className="flex flex-col h-full">
        <ModalHeader
          text="Contact details"
          description=""
          className="p-[1.6rem] sm:p-[2.4rem]"
          action={<CloseModalButton onClick={onClose} />}
        />

        <div className="p-[1.6rem] sm:p-[2.4rem] flex-1 overflow-y-auto">
          <div className="flex items-start justify-between gap-[1.2rem]">
            <div className="flex items-center gap-[1.2rem] min-w-0">
              <Avatar
                src={contact.avatar}
                alt={contact.name}
                name={contact.name}
                size="md"
                className="w-[4.8rem] h-[4.8rem] shrink-0"
              />
              <div className="min-w-0">
                <Text className="text-[1.8rem] font-bold text-dark-base-70 truncate">
                  {contact.name}
                </Text>
                <Text className="text-[1.3rem] text-dark-base-40 truncate">
                  {contact.username}
                </Text>
              </div>
            </div>

            <StatusPill status={contact.status} className="shrink-0" />
          </div>

          <div className="mt-[2.4rem] grid grid-cols-1 sm:grid-cols-2 gap-[1.6rem]">
            <Detail label="Email address" value={contact.email} />
            <Detail label="Phone" value={contact.phone} />
            <Detail label="Date created" value={contact.dateCreated} />
            {contact.list ? <Detail label="List" value={contact.list} /> : null}
          </div>

          {typeof onOpenFullDetails === "function" ? (
            <button
              type="button"
              onClick={() => onOpenFullDetails(contact)}
              className="mt-[2.4rem] text-[1.4rem] font-[600] text-brand-primary hover:underline"
            >
              Open full details
            </button>
          ) : null}
        </div>
      </div>
    </Modal>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-[1.2rem] rounded-[1.2rem] border border-border bg-input-filled/10 min-w-0">
      <Text className="text-[1.1rem] text-dark-base-40 font-[700] uppercase tracking-wider">
        {label}
      </Text>
      <Text className="mt-[0.4rem] text-[1.4rem] text-dark-base-70 break-words">
        {value || "—"}
      </Text>
    </div>
  );
}

