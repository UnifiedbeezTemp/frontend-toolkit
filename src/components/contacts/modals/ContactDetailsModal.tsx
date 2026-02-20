"use client";

import React from "react";
import Modal from "../../modal/Modal";
import ModalHeader from "../../modal/ModalHeader";
import CloseModalButton from "../../modal/CloseModalButton";
import Image from "next/image";
import { Contact } from "../../../store/slices/contactSlice";
import Text from "../../ui/Text";
import Button from "../../ui/Button";

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
      className="max-h-[80dvh] w-[30rem] rounded-t-[2rem] sm:rounded-[1.6rem] overflow-hidden shadow-2xl"
    >
      <div className="flex flex-col h-full">
        <ModalHeader
          text="Contact Details"
          className="p-6 border-b border-border"
          action={<CloseModalButton onClick={onClose} />} description={""}        />

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
            <div
              className={`px-4 py-1 rounded-full text-[1.2rem] font-bold ${
                contact.status === "Active"
                  ? "bg-success/10 text-success"
                  : contact.status === "Unconfirmed"
                    ? "bg-warning/10 text-warning"
                    : contact.status === "Unsubscribed"
                      ? "bg-destructive/10 text-destructive"
                      : "bg-secondary-100/50 text-text-primary/50"
              }`}
            >
              {contact.status}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <DetailRow label="Email address" value={contact.email} />
            <DetailRow label="Phone number" value={contact.phone} />
            <DetailRow label="Date created" value={contact.dateCreated} />
          </div>

          {/* <div className="mt-4 p-4 bg-input-filled rounded-xl flex flex-col gap-2 border border-border/50">
            <Text className="text-[1rem] text-text-primary/40 uppercase font-bold">
              Engagement Status
            </Text>
            <div className="flex items-center justify-between">
              <span className="text-[1.4rem] text-text-primary">
                Reliability Score
              </span>
              <span className="text-[1.4rem] font-bold text-success">98%</span>
            </div>
          </div> */}
        </div>
{/* 
        <div className="p-6 border-t border-border flex gap-4">
          <Button
            variant="secondary"
            className="flex-1 font-bold h-[4.8rem]"
            onClick={onClose}
          >
            Close
          </Button>
          <Button className="flex-1 font-bold h-[4.8rem]">Edit Contact</Button>
        </div> */}
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
