"use client";

import React, { useState } from "react";
import ContactDetailsSideHeader from "./ContactDetailsSideHeader";
import ContactDetailsProfile from "./ContactDetailsProfile";
import { useContactDetails } from "../hooks/useContactDetails";
import ContactInfo from "./info/ContactInfo";
import LeadSource from "./lead-source/LeadSource";
import AssignedTo from "./assigned-to/AssignedTo";
import LeadStatus from "./lead-status/LeadStatus";
import Automations from "./automations/Automations";
import Tags from "./tags/Tags";
import Lists from "./lists/Lists";
import BrowseDeals from "./deals/browse/BrowseDeals";
import OpenTasks from "./deals/tasks/OpenTasks";
import ContactNotes from "./deals/notes/ContactNotes";
import Modal from "../../../../modal/Modal";
import BackButton from "../../../../ui/BackButton";
import { useMediaQuery } from "../../../../../hooks/useMediaQuery";
import { cn } from "../../../../../lib/utils";

export default function ContactDetailsSidepanel() {
  const { contact } = useContactDetails();
  const [activeTab, setActiveTab] = useState("personal");
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width: 639px)");
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)");

  if (!contact) return null;

  const personalInfoContent = (
    <div className="flex flex-col gap-[2.4rem]">
      <ContactInfo contact={contact} />
      <LeadSource />
      <AssignedTo />
      <LeadStatus />
      <Automations />
      <Tags />
      <Lists />
    </div>
  );

  const dealsContent = (
    <div className="flex flex-col gap-[2.4rem]">
      <div className="pb-[2.4rem] border-b border-input-stroke">
        <BrowseDeals />
      </div>
      <div className="pb-[2.4rem] border-b border-input-stroke">
        <OpenTasks contact={contact} />
      </div>
      <ContactNotes />
    </div>
  );

  return (
    <div className="h-full flex flex-col gap-[2.4rem] p-[1rem] lg:border-r border-input-stroke bg-primary overflow-y-auto custom-scrollbar lg:pb-[10rem]">
      {/* MOBILE VIEW */}
      <div className="lg:hidden flex flex-col gap-[2rem]">
        <div className="flex flex-col gap-[2.4rem] pb-[1rem] border-b border-input-stroke">
          <BackButton />
          <div className="flex items-center gap-[0.4rem] text-[1.6rem] font-bold">
            <span className="text-dark-base-40">Contacts/</span>
            <span className="text-brand-primary">{contact.name}</span>
          </div>
        </div>
        <ContactDetailsProfile
          contact={contact}
          onMoreClick={() => setIsDetailsModalOpen(true)}
        />
      </div>

      {/* DESKTOP VIEW */}
      <div className="hidden lg:flex flex-col gap-[2.4rem]">
        <ContactDetailsSideHeader
          contact={contact}
          activeTab={activeTab}
          onTabChange={(v) => setActiveTab(v as string)}
        />

        {activeTab === "personal" ? (
          <>
            <ContactDetailsProfile contact={contact} />
            {personalInfoContent}
          </>
        ) : (
          dealsContent
        )}
      </div>

      {/* BOTTOM SHEET / SIDE PANEL MODAL (MOBILE/TABLET) */}
      <Modal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        bottomSheet={isMobile}
        sidePanel={isTablet}
        className={cn("p-0 border-t-0", isTablet && "rounded-none")}
      >
        <div
          className={cn(
            "flex flex-col gap-[2.4rem] p-[1.6rem] pb-[4rem] bg-primary overflow-y-auto custom-scrollbar",
            isMobile ? "rounded-t-[2.4rem]" : "h-full",
          )}
        >
          <ContactDetailsSideHeader
            contact={contact}
            activeTab={activeTab}
            onTabChange={(v) => setActiveTab(v as string)}
            className="border-none pb-0"
            hideBreadcrumb
            hideBackButton
          />
          {activeTab === "personal" ? personalInfoContent : dealsContent}
        </div>
      </Modal>
    </div>
  );
}
