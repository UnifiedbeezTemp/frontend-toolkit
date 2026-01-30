"use client";

import Button from "../../../../../components/ui/Button";
import ChannelRequirements from "../../../preview/ChannelRequirements";
import { OutlookRequirementsProps } from "./shared/types";

export default function OutlookRequirements({
  onConnect,
  isLoading,
}: OutlookRequirementsProps) {
  return (
    <ChannelRequirements
      requirements={["Have an Outlook account"]}
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
