"use client";

import Button from "../../../../../components/ui/Button";
import ChannelRequirements from "../../../preview/ChannelRequirements";

interface TelegramRequirementsProps {
  onContinue: () => void;
}

export default function TelegramRequirements({
  onContinue,
}: TelegramRequirementsProps) {
  return (
    <ChannelRequirements
      requirements={[
        "Active Telegram account",
        "Telegram App installed on your device",
        "Enable 2FA (recommended for security)",
      ]}
      footer={
        <Button className="w-full" onClick={onContinue}>
          Begin Setup
        </Button>
      }
    />
  );
}
