"use client";

import Heading from "../../../../components/ui/Heading";
import Text from "../../../../components/ui/Text";
import { ChannelsPreviewDesktopProps } from "../types";
import ChannelsPreviewSidebarItem from "./ChannelsPreviewSidebarItem";
import ChannelsPreviewDesktopDetails from "./ChannelsPreviewDesktopDetails";

export default function ChannelsPreviewDesktop({
  channels,
  activeChannelId,
  onSelectChannel,
  searchQuery,
  onSearchChange,
}: ChannelsPreviewDesktopProps) {
  const activeChannel = channels.find((ch) => ch.id === activeChannelId);

  return (
    <div className="grid grid-cols-10 bg-primary rounded-[0.8rem] h-[calc(100vh-10rem)]">
      <div className="col-span-4 border-r border-input-stroke flex flex-col overflow-hidden">
        <div className="p-[1.6rem] py-[2.4rem] border-b border-input-stroke flex-shrink-0">
          <Heading className="text-[1.6rem] font-[700]">
            Connected channels
          </Heading>
        </div>

        <div className="overflow-y-auto flex-1">
          <div className="p-[1.6rem] pt-[2.4rem] space-y-[1.8rem]">
            {channels.map((channel) => (
              <ChannelsPreviewSidebarItem
                key={channel.id}
                channel={channel}
                isActive={activeChannelId === channel.id}
                onClick={() => onSelectChannel(channel.id)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="col-span-6 flex flex-col overflow-hidden">
        {activeChannel ? (
          <ChannelsPreviewDesktopDetails
            channel={activeChannel}
            onClose={() => onSelectChannel("")}
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
          />
        ) : (
          <div className="flex flex-col h-full items-center justify-center p-[2.4rem]">
            <div className="text-center">
              <Heading className="text-[1.6rem] mb-[0.8rem] text-center">
                No channel selected
              </Heading>
              <Text size="sm" className="text-center">
                Select a channel from the list to view its connections
              </Text>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
