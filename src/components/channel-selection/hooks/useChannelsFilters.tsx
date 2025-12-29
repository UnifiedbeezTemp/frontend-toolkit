import { useMemo } from "react";
import { Channel } from "../../../store/onboarding/types/channelTypes";

export const useChannelFilters = (
  channels: Channel[],
  searchQuery: string,
  filter: string
) => {
  const filteredChannels = useMemo(() => {
    return channels.filter((channel) => {
      const matchesSearch =
        channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        channel.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter =
        !filter ||
        (filter === "popular"
          ? channel.tags?.includes("popular")
          : channel.type === filter);

      return matchesSearch && matchesFilter;
    });
  }, [channels, searchQuery, filter]);

  const channelsByType = useMemo(() => {
    if (filter === "popular") {
      return { "Popular Channels": filteredChannels } as Record<
        string,
        Channel[]
      >;
    }

    return filteredChannels.reduce((acc, channel) => {
      if (!acc[channel.type]) {
        acc[channel.type] = [];
      }
      acc[channel.type].push(channel);
      return acc;
    }, {} as Record<string, Channel[]>);
  }, [filteredChannels, filter]);

  return {
    filteredChannels,
    channelsByType,
    typeEntries: Object.entries(channelsByType) as [string, Channel[]][],
  };
};
