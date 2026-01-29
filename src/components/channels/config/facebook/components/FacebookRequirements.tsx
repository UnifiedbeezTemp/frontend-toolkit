"use client";

import Button from "../../../../ui/Button";
import ChannelRequirements from "../../../preview/ChannelRequirements";

interface FacebookRequirementsProps {
  onContinue: () => void;
  isLoading?: boolean;
}

export default function FacebookRequirements({
  onContinue,
  isLoading = false,
}: FacebookRequirementsProps) {
  return (
    <ChannelRequirements
      requirements={["Have a Facebook Messenger account"]}
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
