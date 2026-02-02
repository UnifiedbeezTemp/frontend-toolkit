"use client";

import Button from "../../../../../components/ui/Button";
import ChannelRequirements from "../../../preview/ChannelRequirements";

interface GoogleCalendarRequirementsProps {
  onConnect: () => void;
  isLoading?: boolean;
}

export default function GoogleCalendarRequirements({
  onConnect,
  isLoading = false,
}: GoogleCalendarRequirementsProps) {
  return (
    <ChannelRequirements
      requirements={["Have a Google account"]}
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

