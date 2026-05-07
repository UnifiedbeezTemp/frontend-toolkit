import { SelectedChannel } from "../../../types/channelApiTypes";

const connectionArrayKeys = [
  "whatsappAccounts",
  "facebookAccounts",
  "emailAccounts",
  "smsAccounts",
  "calendarAccounts",
  "webchatConfigs",
  "liveChatConfigs",
  "telegramAccounts",
  "paypalAccounts",
  "calendlyAccounts",
  "zoomAccounts",
  "shopifyAccounts",
  "stripeAccounts",
] as const satisfies ReadonlyArray<keyof SelectedChannel>;

export const getChannelConnectionsCount = (channel: SelectedChannel): number => {
  return connectionArrayKeys.reduce((total, key) => {
    const value = channel[key];
    return total + (Array.isArray(value) ? value.length : 0);
  }, 0);
};

export const hasConnectedAccounts = (channel: SelectedChannel): boolean =>
  getChannelConnectionsCount(channel) > 0;

export const isConnectedChannel = (channel: SelectedChannel): boolean =>
  Boolean(channel.isConnected) || hasConnectedAccounts(channel);

export const isLiveChatChannel = (channel: SelectedChannel): boolean => {
  const channelName = channel.availableChannel?.name?.toLowerCase();
  const channelType = channel.availableChannel?.channelType?.toUpperCase();

  return (
    channelType === "LIVECHAT" ||
    channelName === "webchat" ||
    channelName === "livechat"
  );
};

export const getLiveChatConnectionsCount = (
  channel: SelectedChannel,
): number => {
  const liveChatConfigs = Array.isArray(channel.liveChatConfigs)
    ? channel.liveChatConfigs.length
    : 0;
  const webchatConfigs = Array.isArray(channel.webchatConfigs)
    ? channel.webchatConfigs.length
    : 0;

  return liveChatConfigs + webchatConfigs;
};

export const hasSetupLiveChat = (channel: SelectedChannel): boolean =>
  isLiveChatChannel(channel) &&
  (Boolean(channel.isConnected) || getLiveChatConnectionsCount(channel) > 0);
