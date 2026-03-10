"use client";

import { AppsIcon } from "../../../../assets/icons/AppsIcon";
import Button from "../../../ui/Button";
import Heading from "../../../ui/Heading";
import Text from "../../../ui/Text";

interface ChannelsEmptyStateProps {
  onSwitchToAll?: () => void;
  title?: string;
  description?: string;
  actionText?: string;
}

export default function ChannelsEmptyState({
  onSwitchToAll,
  title = "No connected channels",
  description = "You haven't connected any channels yet. Connect a channel to start receiving notifications.",
  actionText = "Connect a channel",
}: ChannelsEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-[8rem] text-center max-w-[40rem] mx-auto gap-[2.4rem]">
      <div className="p-[2rem] bg-input-filled rounded-full">
        <AppsIcon size={48} className="text-inactive-color" />
      </div>
      <div className="flex flex-col gap-[0.8rem]">
        <Heading className="text-center">{title}</Heading>
        <Text className="text-text-primary text-[1.6rem] text-center">
          {description}
        </Text>
      </div>
      {onSwitchToAll && (
        <Button onClick={onSwitchToAll} className="highlight-inside border-0">
          {actionText}
        </Button>
      )}
    </div>
  );
}
