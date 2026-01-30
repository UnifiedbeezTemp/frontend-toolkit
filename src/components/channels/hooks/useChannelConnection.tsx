"use client";

import { useState, useEffect } from "react";
import { useChannelConnections } from "./useChannelConnections";
import { useChannels } from "../../channel-selection/hooks/useChannels";

export function useChannelConnection() {
  const { selectedChannels } = useChannels();
  const { hasConnections } = useChannelConnections();
  const [activeChannelId, setActiveChannelId] = useState<string | null>(null);

  const activeChannel = selectedChannels.find(
    (ch) => ch.id === activeChannelId
  );

  const handleConnect = (channelId: string) => {
    setActiveChannelId(channelId);
  };

  const handleSelectChannel = (channelId: string) => {
    setActiveChannelId(channelId);
  };

  const isChannelConnected = (channelId: string) => {
    return hasConnections(channelId);
  };

  return {
    selectedChannels,
    activeChannelId,
    activeChannel,
    isChannelConnected,
    handleConnect,
    handleSelectChannel,
    setActiveChannelId,
  };
}
