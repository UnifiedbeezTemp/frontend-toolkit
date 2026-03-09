"use client";

import Heading from "../../../../../ui/Heading";
import Text from "../../../../../ui/Text";
import CloseModalButton from "../../../../../modal/CloseModalButton";

interface BuyContactsHeaderProps {
  onClose: () => void;
}

export default function BuyContactsHeader({ onClose }: BuyContactsHeaderProps) {
  return (
    <div className="p-[1.6rem] sm:p-[2.4rem] sticky top-0 bg-primary z-10">
      <div className="flex flex-col gap-[0.4rem]">
        <Heading className="text-[2rem] font-bold text-text-secondary">
          Buy More Contacts
        </Heading>
        <Text className="text-[1.2rem] text-text-primary">
          Choose a contact package to increase your CRM capacity.
        </Text>
      </div>
      <div className="absolute top-[1.6rem] sm:top-[2.4rem] right-[1.6rem] sm:right-[2.4rem]">
        <CloseModalButton onClick={onClose} className="border-0" />
      </div>
    </div>
  );
}
