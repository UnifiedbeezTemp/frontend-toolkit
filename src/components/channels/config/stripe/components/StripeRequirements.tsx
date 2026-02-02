"use client";

import Button from "../../../../../components/ui/Button";
import ChannelRequirements from "../../../preview/ChannelRequirements";

interface StripeRequirementsProps {
  onConnect: () => void;
  isLoading: boolean;
}

export default function StripeRequirements({
  onConnect,
  isLoading,
}: StripeRequirementsProps) {
  return (
    <ChannelRequirements
      requirements={[
        "Active Stripe account",
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
