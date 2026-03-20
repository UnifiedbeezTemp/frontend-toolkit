"use client";

import React from "react";
import Modal from "../../modal/Modal";
import ModalHeader from "../../modal/ModalHeader";
import CloseModalButton from "../../modal/CloseModalButton";
import Image from "next/image";
import { Contact } from "../../../store/slices/contactSlice";
import StatusPill from "../../ui/StatusPill";

interface ContactDetailsModalProps {
  contact: Contact | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactDetailsModal({
  contact,
  isOpen,
  onClose,
}: ContactDetailsModalProps) {
  if (!contact) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      bottomSheet
      isBlur
      className="max-h-[85dvh] w-full sm:w-[42rem] rounded-t-[2rem] sm:rounded-[1.6rem] overflow-hidden shadow-2xl"
    >
      <div className="flex flex-col h-full">
        <ModalHeader
          text="Contact Details"
          className="p-6 border-b border-border"
          action={<CloseModalButton onClick={onClose} />}
          description=""
        />

        <div className="p-8 flex-1 overflow-y-auto flex flex-col gap-8">
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-brand-primary/10 shadow-lg">
              {contact.avatar ? (
                <Image
                  src={contact.avatar}
                  alt={contact.name}
                  width={96}
                  height={96}
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold text-[3rem]">
                  {contact.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="text-center">
              <h3 className="text-[2.2rem] font-bold text-text-primary">
                {contact.name}
              </h3>
              <p className="text-[1.4rem] text-text-primary/50">
                {contact.username}
              </p>
            </div>
            <StatusPill status={contact.status} />
          </div>

          <div className="flex flex-col gap-6">
            <DetailRow label="Email address" value={contact.email} />
            <DetailRow label="Phone number" value={contact.phone} />
            <DetailRow label="Date created" value={contact.dateCreated} />
            {contact.list ? <DetailRow label="List" value={contact.list} /> : null}
          </div>
        </div>
      </div>
    </Modal>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[1rem] text-text-primary/40 uppercase font-bold tracking-wider">
        {label}
      </span>
      <span className="text-[1.6rem] text-text-primary font-medium">
        {value}
      </span>
    </div>
  );
}
