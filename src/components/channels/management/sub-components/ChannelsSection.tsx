"use client";

import { Channel } from "../../../../store/onboarding/types/channelTypes";
import {
  ChannelsApiResponse,
  SelectedChannelsResponse,
} from "../../../../types/channelApiTypes";
import ChannelTypeSection from "../../../channel-selection/ChannelTypeSection";
import { useChannelSelection } from "../../../channel-selection/hooks/useChannelSelection";
import ChannelsEmptyState from "./ChannelsEmptyState";

interface ChildProps {
  searchQuery: string;
  filter: string;
  channels?: Channel[];
  canEdit?: boolean;
  backendData?: ChannelsApiResponse | null;
  selectedChannels?: SelectedChannelsResponse | null;
  setSearchQuery?: (query: string) => void;
  setFilter?: (filter: string) => void;
  onSwitchToAll?: () => void;
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
  onSwitchToAll,
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

  if (typeEntries.length === 0) {
    if (searchQuery || (filter && filter !== "Communication Channels")) {
      return (
        <ChannelsEmptyState
          title="No results found"
          description={`We couldn't find any channels matching "${searchQuery || filter}".`}
          actionText="Clear filters"
          onSwitchToAll={() => {
            setSearchQuery?.("");
            setFilter?.("Communication Channels");
          }}
        />
      );
    }

    return <ChannelsEmptyState onSwitchToAll={onSwitchToAll} />;
  }

  return (
    <div className="mt-[4rem] lg:mt-[1rem]">
      <div className="mt-[1.5rem]">
        {typeEntries.map(([type, typeChannels], index) => {
          if (typeChannels.length === 0) return null;

          return (
            <ChannelTypeSection
              key={type}
              type={type}
              channels={typeChannels}
              isLast={index === typeEntries.length - 1}
              onToggleChannel={toggleChannel}
              isChannelLoading={isChannelLoading}
              canEdit={canEdit}
            />
          );
        })}
      </div>
    </div>
  );
}
