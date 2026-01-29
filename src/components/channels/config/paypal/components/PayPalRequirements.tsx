"use client";

import Button from "../../../../../components/ui/Button";
import ChannelRequirements from "../../../preview/ChannelRequirements";

interface PayPalRequirementsProps {
  onConnect: () => void;
  isLoading: boolean;
}

export default function PayPalRequirements({
  onConnect,
  isLoading,
}: PayPalRequirementsProps) {
  return (
    <ChannelRequirements
      requirements={[
        "Active PayPal Business account",
        "Account must be verified",
        "Admin permissions required",
      ]}
      footer={
        <Button
          className="w-full"
          onClick={onConnect}
          disabled={isLoading}
          loading={isLoading}
        >
          Connect
        </Button>
      }
    />
  );
}
