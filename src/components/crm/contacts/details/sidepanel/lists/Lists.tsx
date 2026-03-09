"use client";

import React, { useState } from "react";
import ChevronDownIcon from "../../../../../../assets/icons/ChevronDownIcon";
import { useContactLists } from "./hooks/useContactLists";
import EmailLists from "./sub-components/EmailLists";
import SmsLists from "./sub-components/SmsLists";
import ContactListModal from "./modals/ContactListModal/ContactListModal";
import { List } from "./hooks/useContactLists";

export default function Lists() {
  const { emailLists, smsLists, handleAddSmsList } = useContactLists();
  const [selectedList, setSelectedList] = useState<List | null>(null);

  return (
    <div className="flex flex-col gap-[2.4rem] pb-[2.4rem]">
      {/* Contact List Modal */}
      <ContactListModal
        isOpen={!!selectedList}
        onClose={() => setSelectedList(null)}
        list={selectedList}
      />

      {/* Header with Dropdowns */}
      <div className="flex items-center justify-between ">
        <h3 className="text-[1.6rem] font-bold text-dark-base-70 tracking-tight">
          Lists
        </h3>
        <div className="flex items-center gap-[0.8rem] border border-input-stroke rounded-[0.8rem] overflow-hidden">
          <div className="flex items-center gap-[0.4rem] px-[1.2rem] py-[0.6rem] cursor-pointer hover:bg-input-filled transition-colors">
            <span className="text-[1.4rem] font-bold text-dark-base-70">
              Status
            </span>
            <ChevronDownIcon size={10} color="var(--dark-base-70)" />
          </div>
          <div className="flex items-center gap-[0.4rem] px-[1.2rem] py-[0.6rem] cursor-pointer hover:bg-input-filled transition-colors">
            <span className="text-[1.4rem] font-bold text-dark-base-70">
              Source
            </span>
            <ChevronDownIcon size={10} color="var(--dark-base-70)" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[2.4rem]">
        {/* Email Section */}
        <div className="p-[1.6rem] bg-input-filled border border-input-stroke rounded-[1rem]">
          <EmailLists lists={emailLists} onListClick={setSelectedList} />
        </div>

        {/* SMS Section */}
        <div className="p-[1.6rem] bg-input-filled border border-input-stroke rounded-[1rem]">
          <SmsLists lists={smsLists} onAdd={handleAddSmsList} />
        </div>
      </div>
    </div>
  );
}
