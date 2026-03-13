"use client";

import React from "react";
import BackButton from "../../../../ui/BackButton";
import Tabs from "../../../../ui/Tabs";
import { Contact } from "../../types";
import { cn } from "../../../../../lib/utils";

interface ContactDetailsSideHeaderProps {
  contact: Contact;
  activeTab: string;
  onTabChange: (value: string) => void;
  hideBreadcrumb?: boolean;
  hideBackButton?: boolean;
  className?: string;
}

export default function ContactDetailsSideHeader({
  contact,
  activeTab,
  onTabChange,
  hideBreadcrumb = false,
  hideBackButton = false,
  className,
}: ContactDetailsSideHeaderProps) {
  const tabs = [
    { label: "Personal Info", value: "personal" },
    { label: "Deals (0)", value: "deals" },
  ];

  return (
    <div
      className={cn(
        "flex flex-col gap-[2.4rem] pb-[2.4rem] border-b border-input-stroke",
        className,
      )}
    >
      {!hideBackButton && <BackButton />}

      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={(v) => onTabChange(v as string)}
        variant="unpadded"
        size="md"
        className="w-full"
        containerClassName="bg-input-filled"
      />

      {!hideBreadcrumb && (
        <div className="flex items-center gap-[0.4rem] text-[1.6rem] font-bold">
          <span className="text-dark-base-40">Contacts/</span>
          <span className="text-brand-primary">{contact.name}</span>
        </div>
      )}
    </div>
  );
}
