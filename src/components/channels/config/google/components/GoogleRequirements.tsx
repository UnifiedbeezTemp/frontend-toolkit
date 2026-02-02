"use client";

import Button from "../../../../../components/ui/Button";
import ChannelRequirements from "../../../preview/ChannelRequirements";

interface GoogleRequirementsProps {
  onConnect: () => void;
  isLoading?: boolean;
}

export default function GoogleRequirements({
  onConnect,
  isLoading = false,
}: GoogleRequirementsProps) {
  return (
    <ChannelRequirements
      requirements={["Have Google account"]}
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

