"use client";

import Button from "../../../../../components/ui/Button";
import ChannelRequirements from "../../../preview/ChannelRequirements";
import { MicrosoftCalendarRequirementsProps } from "./shared/types";

export default function MicrosoftCalendarRequirements({
  onConnect,
  isLoading = false,
}: MicrosoftCalendarRequirementsProps) {
  return (
    <ChannelRequirements
      requirements={["Have a Microsoft account with Calendar access"]}
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

