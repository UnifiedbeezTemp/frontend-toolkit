"use client";

import Heading from "../../../../components/ui/Heading";
import Text from "../../../../components/ui/Text";
import ImageComponent from "../../../../components/ui/ImageComponent";
import CloseModalButton from "../../../../components/modal/CloseModalButton";
import { Channel } from "../../../../store/onboarding/types/channelTypes";
import SearchBar from "./SearchBar";
import ChannelConnectionsList from "./ChannelConnectionsList/ChannelConnectionsList";
import { useChannelConnectionsData } from "../../hooks/useChannelConnectionsData";
import { SelectedChannel } from "../../../../types/channelApiTypes";
import { getChannelAccountsMetadata } from "../../../../utils/channels/getSelectedChannelAccountsMetadata";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";
import { useMemo } from "react";
import { getChannelIconKey } from "../../../../utils/channels/getChannelIconKey";

interface ChannelsPreviewDesktopDetailsProps {
  channel: SelectedChannel;
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
  const icons = useSupabaseIcons() as Record<string, string>;
  const { accounts } = getChannelAccountsMetadata(channel);

  const icon = useMemo(() => {
    const channelIconKey = getChannelIconKey(channel?.availableChannel.name);
    return icons[channelIconKey] || icons.linkExternal;
  }, [channel?.availableChannel.name, icons]);

  return (
    <>
      <div className="px-[1.6rem] py-[.55rem] border-b border-input-stroke flex-shrink-0">
        <div className="flex items-center justify-between mb-[1.6rem]">
          <div className="flex items-center gap-[1.2rem]">
            <ImageComponent
              src={icon}
              alt={channel.channelName}
              width={32}
              height={32}
            />
            <div>
              <Heading className="text-[1.6rem] font-[700]">
                {channel.channelName}
              </Heading>
              <Text size="sm" className="text-text-secondary">
                Select a {channel.channelName} account to connect
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
          connections={accounts}
          searchQuery={searchQuery}
          channelName={channel.channelName}
          channelIcon={icon}
        />
      </div>
    </>
  );
}
