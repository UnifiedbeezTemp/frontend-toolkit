"use client";

import { useState, useCallback } from "react";

interface ChannelState {
  isExpanded: boolean;
  isConnected: boolean;
  isSettingsOpen: boolean;
}

export function useChannelState(channelId: string) {
  const [states, setStates] = useState<Record<string, ChannelState>>({
    [channelId]: {
      isExpanded: false,
      isConnected: false,
      isSettingsOpen: false
    }
  });

  const state = states[channelId];

  const toggleExpand = useCallback(() => {
    setStates(prev => ({
      ...prev,
      [channelId]: {
        ...prev[channelId],
        isExpanded: !prev[channelId]?.isExpanded
      }
    }));
  }, [channelId]);

  const handleConnect = useCallback(() => {
    setStates(prev => ({
      ...prev,
      [channelId]: {
        ...prev[channelId],
        isConnected: true,
        isExpanded: false,
        isSettingsOpen: true
      }
    }));
  }, [channelId]);

  const toggleSettings = useCallback(() => {
    setStates(prev => ({
      ...prev,
      [channelId]: {
        ...prev[channelId],
        isSettingsOpen: !prev[channelId]?.isSettingsOpen
      }
    }));
  }, [channelId]);

  return {
    isExpanded: state?.isExpanded || false,
    isConnected: state?.isConnected || false,
    isSettingsOpen: state?.isSettingsOpen || false,
    toggleExpand,
    handleConnect,
    toggleSettings
  };
}