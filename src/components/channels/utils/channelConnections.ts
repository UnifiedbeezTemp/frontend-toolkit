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
] as const satisfies ReadonlyArray<keyof SelectedChannel>;

export const getChannelConnectionsCount = (channel: SelectedChannel): number => {
  return connectionArrayKeys.reduce((total, key) => {
    const value = channel[key];
    return total + (Array.isArray(value) ? value.length : 0);
  }, 0);
};

export const hasConnectedAccounts = (channel: SelectedChannel): boolean =>
  getChannelConnectionsCount(channel) > 0;
