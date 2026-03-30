import React, { useRef, useState } from "react";
import { TemplateFormData, HandleChange } from "../../types";
import ImageComponent from "next/image";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";
import { cn } from "../../../../lib/utils";
import { SmartDropdown } from "../../../smart-dropdown";
import ConnectedNumbersModal, { ConnectedNumber } from "../ConnectedNumbersModal";

interface AccountSelectionProps {
  formData: TemplateFormData;
  handleChange: HandleChange;
  activeDropdown: string | null;
  toggleDropdown: (name: string) => void;
  setActiveDropdown: (name: string | null) => void;
  channelName?: string;
  accounts?: ConnectedNumber[];
}

export default function AccountSelection({
  formData,
  handleChange,
  activeDropdown,
  toggleDropdown,
  setActiveDropdown,
  channelName,
  accounts = [],
}: AccountSelectionProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const icons = useSupabaseIcons() as {
    whatsappIcon: string;
    gridDropdown: string;
  };
  const [isNumbersModalOpen, setIsNumbersModalOpen] = useState(false);

  const displayName = formData.account || channelName || "WhatsApp Business";

  return (
    <div className="flex flex-col gap-[0.8rem]">
      <label className="text-[1.4rem] font-bold text-text-secondary">
        WhatsApp account
      </label>
      <div className="relative">
        <button
          ref={triggerRef}
          onClick={() => toggleDropdown("account")}
          className="w-full h-[4rem] flex items-center justify-between px-[1.2rem] bg-primary border border-input-stroke rounded-[0.8rem] text-left"
        >
          <div className="flex items-center gap-[0.8rem]">
            <ImageComponent
              src={icons.whatsappIcon}
              alt="WA"
              width={20}
              height={20}
            />
            <span className="text-[1.4rem] text-text-secondary font-medium">
              {displayName}
            </span>
          </div>
          <ImageComponent
            src={icons.gridDropdown}
            alt="v"
            width={16}
            height={16}
            className={cn(
              "transition-transform duration-200",
              activeDropdown === "account" && "rotate-180",
            )}
          />
        </button>

        <SmartDropdown
          isOpen={activeDropdown === "account"}
          onClose={() => setActiveDropdown(null)}
          triggerRef={triggerRef}
        >
          {accounts.length > 0 ? (
            accounts.map((acc) => (
              <button
                key={acc.id}
                onClick={() => {
                  handleChange("account", acc.displayName);
                  setActiveDropdown(null);
                }}
                className="w-full px-[1.2rem] py-[0.8rem] text-left text-[1.4rem] hover:bg-input-filled/50 flex items-center gap-[0.8rem] font-medium text-text-secondary"
              >
                <ImageComponent
                  src={icons.whatsappIcon}
                  alt="WA"
                  width={20}
                  height={20}
                />
                {acc.displayName}
              </button>
            ))
          ) : (
            <div className="px-[1.2rem] py-[0.8rem] text-[1.4rem] text-text-secondary">
              No accounts available
            </div>
          )}
        </SmartDropdown>
      </div>
      <button
        type="button"
        onClick={() => setIsNumbersModalOpen(true)}
        className="text-[1.3rem] text-brand-primary font-bold underline w-fit text-left"
      >
        Show connected numbers
      </button>

      <ConnectedNumbersModal
        isOpen={isNumbersModalOpen}
        onClose={() => setIsNumbersModalOpen(false)}
        accountName={channelName ?? "WhatsApp Business"}
        numbers={accounts}
      />
    </div>
  );
}
