"use client";

import Button from "../../../../../components/ui/Button";
import ChannelRequirements from "../../../preview/ChannelRequirements";

interface WhatsAppRequirementsProps {
  onContinue: () => void;
  isLoading?: boolean;
}

export default function WhatsAppRequirements({
  onContinue,
  isLoading = false,
}: WhatsAppRequirementsProps) {
  return (
    <ChannelRequirements
      requirements={[
        "You can receive a verification call on WhatsApp",
        "You're an Admin in your Facebook Business Manager",
      ]}
      footer={
        <Button
          className="w-full"
          onClick={onContinue}
          disabled={isLoading}
          loading={isLoading}
        >
          Connect
        </Button>
      }
    />
  );
}

