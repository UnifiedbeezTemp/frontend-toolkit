import React, { useState, useRef } from "react";
import { WhatsAppAccount, WhatsAppTemplate } from "../types";
import ImageComponent from "next/image";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import ChevronDownIcon from "../../../assets/icons/ChevronDownIcon";
import SmartDropdown from "../../smart-dropdown/SmartDropdown";
import ConnectedNumbersModal from "./ConnectedNumbersModal";

interface WhatsAppAccountsSectionProps {
  accounts: WhatsAppAccount[];
  selectedAccount: WhatsAppAccount;
  onAccountChange: (id: string) => void;
  onCreateClick: () => void;
}

export default function WhatsAppAccountsSection({
  accounts,
  selectedAccount,
  onAccountChange,
  onCreateClick,
}: WhatsAppAccountsSectionProps) {
  const icons = useSupabaseIcons();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNumbersModalOpen, setIsNumbersModalOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleAccountSelect = (id: string) => {
    onAccountChange(id);
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex flex-col gap-[1.2rem] mb-[2.4rem] px-[1.6rem] sm:px-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[1.6rem]">
          <Heading className="text-[1.6rem] font-bold">Manage Accounts</Heading>
          <span
            className="text-[1.3rem] text-brand-primary font-medium cursor-pointer underline"
            onClick={() => setIsNumbersModalOpen(true)}
          >
            Show connected numbers
          </span>
        </div>

        <Button
          variant="primary"
          className="hidden lg:flex bg-brand-gradient-2 font-[400] text-[1.4rem] px-[1.6rem] py-[0.8rem] whitespace-nowrap items-center"
          onClick={onCreateClick}
        >
          <ImageComponent
            src={icons.plusWhite}
            alt="plus"
            width={16}
            height={16}
            className="mr-[0.8rem]"
          />
          Create new template
        </Button>
      </div>

      <div className="relative w-full lg:w-[35rem]">
        <button
          ref={triggerRef}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full flex items-center justify-between px-[1.6rem] py-[1.2rem] bg-primary border border-input-stroke rounded-[0.8rem] text-left hover:border-gray-400 transition-colors"
        >
          <div className="flex items-center gap-[1.2rem]">
            <ImageComponent
              src={icons.whatsappIcon}
              alt="whatsapp"
              width={24}
              height={24}
              className="shrink-0"
            />
            <span className="text-[1.4rem] font-medium text-text-secondary">
              {selectedAccount.name}
            </span>
          </div>
          <ChevronDownIcon
            size={14}
            className={`text-text-primary transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        <SmartDropdown
          isOpen={isDropdownOpen}
          onClose={() => setIsDropdownOpen(false)}
          triggerRef={triggerRef}
        >
          <div className="flex flex-col py-[0.8rem]">
            {accounts.map((acc) => (
              <button
                key={acc.id}
                onClick={() => handleAccountSelect(acc.id)}
                className={`flex items-center gap-[1.2rem] px-[1.6rem] py-[1.2rem] text-left hover:bg-input-filled transition-colors ${
                  selectedAccount.id === acc.id ? "bg-brand-primary/5" : ""
                }`}
              >
                <ImageComponent
                  src={icons.whatsappIcon}
                  alt="whatsapp"
                  width={20}
                  height={20}
                  className="shrink-0"
                />
                <span className="text-[1.4rem] text-text-secondary">
                  {acc.name}
                </span>
              </button>
            ))}
          </div>
        </SmartDropdown>
      </div>

      <Button
        variant="primary"
        className="flex lg:hidden w-full bg-brand-gradient-2 font-[400] text-[1.4rem] px-[1.6rem] py-[1.2rem] justify-center items-center whitespace-nowrap"
        onClick={onCreateClick}
      >
        <ImageComponent
          src={icons.plusWhite}
          alt="plus"
          width={16}
          height={16}
          className="mr-[0.8rem]"
        />
        Create new template
      </Button>

      <ConnectedNumbersModal
        isOpen={isNumbersModalOpen}
        onClose={() => setIsNumbersModalOpen(false)}
        accountName={selectedAccount.name}
      />
    </div>
  );
}
