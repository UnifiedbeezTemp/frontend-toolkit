import React, { useRef } from "react";
import { TemplateFormData, HandleChange } from "../../types";
import { AccountListItems } from "./AccountListItems";
import ImageComponent from "next/image";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";
import { cn } from "../../../../lib/utils";
import { SmartDropdown } from "../../../smart-dropdown";

interface AccountSelectionProps {
  formData: TemplateFormData;
  handleChange: HandleChange;
  activeDropdown: string | null;
  toggleDropdown: (name: string) => void;
  setActiveDropdown: (name: string | null) => void;
}

export default function AccountSelection({
  formData,
  handleChange,
  activeDropdown,
  toggleDropdown,
  setActiveDropdown,
}: AccountSelectionProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const icons = useSupabaseIcons() as {
    whatsappIcon: string;
    gridDropdown: string;
  };

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
              {formData.account || "Brian's Whatsapp Business"}
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
          <AccountListItems
            onSelect={(acc) => {
              handleChange("account", acc);
              setActiveDropdown(null);
            }}
            icons={icons}
          />
        </SmartDropdown>
      </div>
      <button className="text-[1.3rem] text-brand-primary font-bold underline w-fit text-left">
        Show connected numbers
      </button>
    </div>
  );
}
