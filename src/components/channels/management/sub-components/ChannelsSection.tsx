"use client";

import { Channel } from "@/shared/src/store/slices/channelsSlice"; // Adjusted path
import Text from "@/shared/src/components/ui/Text";
import {
  ChannelsApiResponse,
  SelectedChannelsResponse,
} from "@/shared/src/types/channelApiTypes";
import { useChannelSelection } from "@/shared/src/components/channel-selection/hooks/useChannelSelection";
import ChannelTypeSection from "@/shared/src/components/channel-selection/ChannelTypeSection";

interface ChildProps {
  searchQuery: string;
  filter: string;
  channels?: Channel[];
  canEdit?: boolean;
  backendData?: ChannelsApiResponse | null;
  selectedChannels?: SelectedChannelsResponse | null;
  setSearchQuery?: (query: string) => void;
  setFilter?: (filter: string) => void;
}

export default function ChannelsSection({
  searchQuery,
  filter,
  channels,
  canEdit = false,
  backendData,
  selectedChannels,
  setSearchQuery,
  setFilter,
}: ChildProps) {
  const { filteredChannels, typeEntries, toggleChannel, isChannelLoading } =
    useChannelSelection({
      backendData,
      selectedChannels,
      searchQuery,
      filter,
      setSearchQuery,
      setFilter,
    });

  return (
    <div className="mt-[4rem] lg:mt-[1rem]">
      <div className="mt-[1.5rem]">
        {typeEntries.length > 0 ? (
          typeEntries.map(([type, typeChannels], index) => (
            <ChannelTypeSection
              key={type}
              type={type}
              channels={typeChannels}
              isLast={index === typeEntries.length - 1}
              onToggleChannel={toggleChannel}
              isChannelLoading={isChannelLoading}
              canEdit={canEdit}
            />
          ))
        ) : (
          <div className="text-center py-[4rem]">
            <Text size="base" className="text-secondary">
              No channels available at the moment.
            </Text>
          </div>
        )}
      </div>
    </div>
  );
}
