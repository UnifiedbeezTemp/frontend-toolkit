"use client";

import Heading from "../../../../components/ui/Heading";
import Text from "../../../../components/ui/Text";
import ImageComponent from "../../../../components/ui/ImageComponent";
import CloseModalButton from "../../../../components/modal/CloseModalButton";
import { Channel } from "../../../../store/onboarding/types/channelTypes";
import SearchBar from "./SearchBar";
import ChannelConnectionsList from "./ChannelConnectionsList/ChannelConnectionsList";
import { useChannelConnectionsData } from "../../hooks/useChannelConnectionsData";

interface ChannelsPreviewDesktopDetailsProps {
  channel: Channel;
  onClose: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function ChannelsPreviewDesktopDetails({
  channel,
  onClose,
  searchQuery,
  onSearchChange,
}: ChannelsPreviewDesktopDetailsProps) {
  // Fetch connections for this specific channel
  const { connections } = useChannelConnectionsData(channel);

  return (
    <>
      <div className="px-[1.6rem] py-[.55rem] border-b border-input-stroke flex-shrink-0">
        <div className="flex items-center justify-between mb-[1.6rem]">
          <div className="flex items-center gap-[1.2rem]">
            <ImageComponent
              src={channel.icon}
              alt={channel.name}
              width={32}
              height={32}
            />
            <div>
              <Heading className="text-[1.6rem] font-[700]">
                {channel.name}
              </Heading>
              <Text size="sm" className="text-text-secondary">
                Select a {channel.name} account to connect
              </Text>
            </div>
          </div>
          <CloseModalButton onClick={onClose} />
        </div>
      </div>

      <div className="overflow-y-auto flex-1 p-[1.6rem]">
        <SearchBar
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search"
        />

        <ChannelConnectionsList
          connections={connections}
          searchQuery={searchQuery}
          channelName={channel.name}
          channelIcon={channel.icon}
        />
      </div>
    </>
  );
}
