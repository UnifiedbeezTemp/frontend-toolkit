"use client";

import { useState, useEffect } from "react";
import { useChannelConnections } from "./useChannelConnections";
import { useChannels } from "../../channel-selection/hooks/useChannels";

export function useChannelConnection() {
  const { selectedChannels } = useChannels();
  const { hasConnections } = useChannelConnections();
  const [activeChannelId, setActiveChannelId] = useState<string | null>(null);

  const activeChannel = selectedChannels.find(
    (ch) => ch.id === activeChannelId,
  );

  useEffect(() => {
    if (!activeChannelId && selectedChannels.length > 0) {
      setActiveChannelId(selectedChannels[0].id);
    }
  }, [selectedChannels, activeChannelId]);

  const handleConnect = (channelId: string) => {
    setActiveChannelId(channelId);
  };

  const handleSelectChannel = (channelId: string) => {
    setActiveChannelId(channelId);
  };

  const isChannelConnected = (channelId: string) => {
    const numericChannelId = Number.parseInt(channelId, 10);
    if (!Number.isFinite(numericChannelId)) return false;
    return hasConnections(numericChannelId);
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
