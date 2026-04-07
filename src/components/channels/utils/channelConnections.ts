import { Channel } from "../../../store/onboarding/types/channelTypes";

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
] as const satisfies ReadonlyArray<keyof Channel>;

export const getChannelConnectionsCount = (channel: Channel): number => {
  return connectionArrayKeys.reduce((total, key) => {
    const value = channel[key];
    return total + (Array.isArray(value) ? value.length : 0);
  }, 0);
};

export const hasConnectedAccounts = (channel: Channel): boolean =>
  getChannelConnectionsCount(channel) > 0;
