"use client";

import Heading from "../../../../../ui/Heading";
import Text from "../../../../../ui/Text";
import CloseModalButton from "../../../../../modal/CloseModalButton";

interface BuyMessagesHeaderProps {
  onClose: () => void;
}

export default function BuyMessagesHeader({ onClose }: BuyMessagesHeaderProps) {
  return (
    <div className="p-[1.6rem] sm:p-[2.4rem] sticky top-0">
      <div className="flex flex-col gap-[0.4rem]">
        <Heading className="text-[2rem] font-bold text-text-secondary">
          Buy More Messages
        </Heading>
        <Text className="text-[1.2rem] text-text-primary">
          Choose a message package to extend your SMS limit
        </Text>
      </div>
      <div className="absolute top-[2.4rem] right-[2.4rem]">
        <CloseModalButton onClick={onClose} className="border-0" />
      </div>
    </div>
  );
}
