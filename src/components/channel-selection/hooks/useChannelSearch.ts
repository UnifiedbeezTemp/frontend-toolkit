import { useState, useMemo } from "react";
import { BackendChannel, ChannelCategory, ChannelsApiResponse } from "../../../types/channelApiTypes";

export function useChannelSearch(
  backendData: ChannelsApiResponse | null | undefined,
) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");

  const filteredData = useMemo(() => {
    if (!backendData) return null;

    const { categories, ...rest } = backendData;
    const entries = Object.entries(categories);

    const filteredEntries = entries.filter(([categoryName]) => {
      if (!filter) return true;

      if (filter === "upcoming") {
        return (
          categoryName === "upcoming"
        );
      }

      return categoryName === filter;
    });

    const resultCategories: Record<string, ChannelCategory> = {};

    filteredEntries.forEach(([categoryName, categoryData]) => {
      if (!categoryData?.channels) return;

      const filteredChannels = categoryData.channels.filter(
        (channel: BackendChannel) => {
          if (!searchQuery) return true;

          const query = searchQuery.toLowerCase();
          return (
            channel.displayName?.toLowerCase().includes(query) ||
            channel.description?.toLowerCase().includes(query) ||
            channel.name?.toLowerCase().includes(query)
          );
        },
      );

      if (filteredChannels.length > 0) {
        resultCategories[categoryName] = {
          ...categoryData,
          channels: filteredChannels,
        };
      }
    });

    return {
      ...rest,
      categories: resultCategories,
    } as ChannelsApiResponse;
  }, [backendData, searchQuery, filter]);

  const hasResults =
    filteredData && Object.keys(filteredData.categories).length > 0;

  return {
    searchQuery,
    setSearchQuery,
    filter,
    setFilter,
    filteredData,
    hasResults,
  };
}
