"use client";

import { useMemo } from "react";
import { getAvailableAndSelectedChannels } from "../../../utils/channels/getAvailableAndSelectedChannels";
import {
  hasSetupLiveChat,
  isConnectedChannel,
} from "../utils/channelConnections";

export function useChannelSetupStatus() {
  const { selectedChannels, isLoading, isFetching, error, refetch } =
    getAvailableAndSelectedChannels();

  const channels = selectedChannels?.channels ?? [];

  const connectedChannels = useMemo(
    () => channels.filter(isConnectedChannel),
    [channels],
  );

  const setupLivechatChannels = useMemo(
    () => channels.filter(hasSetupLiveChat),
    [channels],
  );

  return {
    selectedChannels,
    connectedChannels,
    setupLivechatChannels,
    hasConnectedChannel: connectedChannels.length > 0,
    hasSetupLivechat: setupLivechatChannels.length > 0,
    hasSetupLiveChat: setupLivechatChannels.length > 0,
    connectedChannelsCount: connectedChannels.length,
    setupLivechatCount: setupLivechatChannels.length,
    setupLiveChatCount: setupLivechatChannels.length,
    isLoading,
    isFetching,
    error,
    refetch,
  };
}
