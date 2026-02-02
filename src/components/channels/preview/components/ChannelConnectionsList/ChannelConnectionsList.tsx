"use client";

import Checkbox from "../../../../../components/ui/CheckBox";
import Heading from "../../../../../components/ui/Heading";
import Text from "../../../../../components/ui/Text";
import DotsMenu from "../../../../../components/ui/DotsMenu";
import ImageComponent from "../../../../../components/ui/ImageComponent";
import { ChannelConnectionsListProps } from "../../types";
import { useChannelConnectionsList } from "./hooks/useChannelConnectionsList";

export default function ChannelConnectionsList({
  connections,
  searchQuery,
  channelName,
  channelIcon,
}: ChannelConnectionsListProps) {
  const { filteredConnections } = useChannelConnectionsList({
    connections,
    searchQuery,
  });

  if (filteredConnections.length === 0) {
    return (
      <div className="text-center py-[3.2rem]">
        <Text size="sm" className="text-text-secondary text-center">
          {searchQuery ? "No connections found" : "No connections available"}
        </Text>
      </div>
    );
  }

  return (
    <div className="border-x border-t border-input-stroke rounded-[0.8rem] overflow-hidden">
      <div className="p-[1.2rem] border-b border-input-stroke flex items-center gap-[1.2rem] text-text-primary bg-input-filled text-[1.6rem] font-[700]">
        <Checkbox
          size="sm"
          checked={false}
          onChange={() => {}}
          className="shrink-0"
        />
        Channels
      </div>
      {filteredConnections.map((connection) => {
        const displayName = connection.title;
        const subtitle = connection.subtitle;

        return (
          <div
            key={connection.id}
            className="flex items-center justify-between p-[1.2rem] bg-primary border-b border-input-stroke hover:bg-input-filled transition-colors"
          >
            <div className="flex items-center gap-[0.8rem] lg:gap-[1.2rem] flex-1 min-w-0">
              <Checkbox
                size="sm"
                checked={false}
                onChange={() => {}}
                className="shrink-0"
              />
              <ImageComponent
                src={channelIcon}
                alt="channel"
                width={25}
                height={25}
              />
              <div className="flex-1 min-w-0">
                <Heading size="xs" className="font-[700] truncate">
                  {displayName}
                </Heading>
                {subtitle && (
                  <Text size="sm" className="truncate">
                    {subtitle}
                  </Text>
                )}
              </div>
            </div>
            <DotsMenu />
          </div>
        );
      })}
    </div>
  );
}

