"use client";

import ChannelsPreviewDesktop from "./components/ChannelsPreviewDesktop";
import ChannelsPreviewMobile from "./components/ChannelsPreviewMobile";
import { useChannelsPreview } from "./hooks/useChannelsPreview";

export default function ChannelsPreview() {
  const {
    selectedChannels,
    activeChannelId,
    expandedChannelId,
    selectedChannelId,
    searchQuery,
    isDesktop,
    handleSelectChannel,
    handleToggleChannel,
    handleSearchChange,
  } = useChannelsPreview();

  if (isDesktop) {
    return (
      <ChannelsPreviewDesktop
        channels={selectedChannels}
        activeChannelId={activeChannelId}
        onSelectChannel={handleSelectChannel}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
    );
  }

  return (
    <ChannelsPreviewMobile
      channels={selectedChannels}
      expandedChannelId={expandedChannelId}
      selectedChannelId={selectedChannelId}
      onToggleChannel={handleToggleChannel}
      onSelectChannel={handleSelectChannel}
      searchQuery={searchQuery}
      onSearchChange={handleSearchChange}
    />
  );
}
