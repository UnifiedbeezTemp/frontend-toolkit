import React from "react";
import ImageComponent from "@/shared/src/components/ui/ImageComponent";

export const DUMMY_ACCOUNTS = [
  "Brian's Whatsapp Business",
  "Customer Support Team",
  "Sales Department",
];

interface AccountListItemsProps {
  onSelect: (acc: string) => void;
  icons: { whatsappIcon: string };
}

export function AccountListItems({ onSelect, icons }: AccountListItemsProps) {
  return (
    <>
      {DUMMY_ACCOUNTS.map((acc) => (
        <button
          key={acc}
          onClick={() => onSelect(acc)}
          className="w-full px-[1.2rem] py-[0.8rem] text-left text-[1.4rem] hover:bg-input-filled/50 flex items-center gap-[0.8rem] font-medium text-text-secondary"
        >
          <ImageComponent
            src={icons.whatsappIcon}
            alt="WA"
            width={20}
            height={20}
          />
          {acc}
        </button>
      ))}
    </>
  );
}
