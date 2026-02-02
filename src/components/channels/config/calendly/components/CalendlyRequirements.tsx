"use client";

import Button from "../../../../ui/Button";
import ChannelRequirements from "../../../preview/ChannelRequirements";



interface CalendlyRequirementsProps {
  onConnect: () => void;
  isLoading: boolean;
}

export default function CalendlyRequirements({
  onConnect,
  isLoading,
}: CalendlyRequirementsProps) {

  return (
    <ChannelRequirements
      requirements={["Active Calendly account", "Admin permissions required"]}
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
