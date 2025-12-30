import { useState } from "react";
import { useChannels } from "./useChannels";
import { useChannelsData } from "./useChannelsData";
import { useChannelFilters } from "./useChannelsFilters";
import { useChannelSelectionApi } from "./useChannelSelectionApi";
import {
  ChannelsApiResponse,
  SelectedChannelsResponse,
} from "../../../types/channelApiTypes";

interface UseChannelSelectionProps {
  backendData?: ChannelsApiResponse | null;
  selectedChannels?: SelectedChannelsResponse | null;
  searchQuery?: string;
  filter?: string;
  setSearchQuery?: (query: string) => void;
  setFilter?: (filter: string) => void;
}

export function useChannelSelection({
  backendData,
  selectedChannels,
  searchQuery = "",
  filter = "",
  setSearchQuery,
  setFilter,
}: UseChannelSelectionProps = {}) {
  const { assets, channelsToUse } = useChannelsData(
    backendData,
    selectedChannels
  );
  const {
    selectedChannels: selectedChannelsList,
    selectChannel: selectChannelLocal,
    unselectChannel: unselectChannelLocal,
  } = useChannels();
  const { filteredChannels, typeEntries } = useChannelFilters(
    channelsToUse,
    searchQuery,
    filter
  );

  const { handleSelectChannel, handleUnselectChannel, isChannelLoading } =
    useChannelSelectionApi({ backendData, selectedChannels });

  const handleToggleChannel = async (channelId: string) => {
    const channel = channelsToUse.find((c) => c.id === channelId);
    if (!channel) return;

    if (channel.isSelected) {
      unselectChannelLocal(channel.id);
      const success = await handleUnselectChannel({
        id: channel.id,
        name: channel.name,
      });
      if (!success) {
        selectChannelLocal(channel.id);
      }
    } else {
      selectChannelLocal(channel.id);
      const success = await handleSelectChannel({
        id: channel.id,
        name: channel.name,
      });
      if (!success) {
        unselectChannelLocal(channel.id);
      }
    }
  };

  return {
    selectedChannels: selectedChannelsList,
    filteredChannels,
    typeEntries,
    assets,
    searchQuery,
    setSearchQuery,
    filter,
    setFilter,
    toggleChannel: handleToggleChannel,
    isChannelLoading,
  };
}
