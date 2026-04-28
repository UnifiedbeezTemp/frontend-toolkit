"use client";

import Button from "../../../../../components/ui/Button";
import ChannelRequirements from "../../../components/ChannelRequirements";

interface LiveChatRequirementsProps {
  onContinue: () => void;
}

export default function LiveChatRequirements({
  onContinue,
}: LiveChatRequirementsProps) {
  return (
    <ChannelRequirements
      requirements={["Have a website"]}
      footer={
        <Button className="w-full" onClick={onContinue}>
          Connect
        </Button>
      }
    >
    </ChannelRequirements>
  );
}
