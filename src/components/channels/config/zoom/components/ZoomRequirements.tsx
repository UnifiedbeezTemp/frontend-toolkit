"use client";

import Button from "../../../../../components/ui/Button";
import ChannelRequirements from "../../../preview/ChannelRequirements";

interface ZoomRequirementsProps {
  onConnect: () => void;
  isLoading: boolean;
}

export default function ZoomRequirements({
  onConnect,
  isLoading,
}: ZoomRequirementsProps) {
  return (
    <ChannelRequirements
      requirements={[
        "Active Zoom account",
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
