"use client";

import Heading from "../../../../components/ui/Heading";
import Text from "../../../../components/ui/Text";
import { ChannelsPreviewMobileProps } from "../types";
import ChannelsPreviewItem from "./ChannelsPreviewItem/ChannelsPreviewItem";

export default function ChannelsPreviewMobile({
  channels,
  expandedChannelId,
  selectedChannelId,
  onToggleChannel,
  onSelectChannel,
  searchQuery,
  onSearchChange,
}: ChannelsPreviewMobileProps) {
  return (
    <div className="bg-primary rounded-[1.4rem] p-[1.6rem] sm:p-[2.4rem] mb-[2.4rem]">
      <div className="mb-[3.6rem]">
        <Heading className="text-[1.6rem] font-[700] mb-[0.8rem] text-text-primary sm:text-center">
          Connected channels
        </Heading>
      </div>

      <div className="space-y-[0.8rem]">
        {channels.length === 0 ? (
          <div className="text-center py-[3.2rem]">
            <Text size="sm" className="text-text-secondary">
              No channels connected yet.
            </Text>
          </div>
        ) : (
          channels.map((channel) => {
            const isExpanded = expandedChannelId === channel.id;
            const isSelected = selectedChannelId === channel.id;

            return (
              <ChannelsPreviewItem
                key={channel.id}
                channel={channel}
                isExpanded={isExpanded}
                isSelected={isSelected}
                onToggle={() => onToggleChannel(channel.id)}
                onSelect={() => onSelectChannel(channel.id)}
                searchQuery={searchQuery}
                onSearchChange={onSearchChange}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

