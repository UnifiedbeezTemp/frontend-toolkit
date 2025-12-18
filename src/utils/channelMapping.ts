import { Channel } from "../store/onboarding/types/channelTypes";
import { BackendChannel, ChannelsApiResponse, SelectedChannelsResponse } from "../types/channelApiTypes";

interface ChannelIconMap {
  [key: string]: string;
}

const getChannelIconKey = (channelName: string): string => {
  const iconMap: ChannelIconMap = {
    whatsapp: "whatsappIcon",
    webchat: "websiteWebChat",
    facebook_messenger: "facebookMessengerLogo",
    instagram_direct: "instagramLogo",
    telegram: "telegramLogo",
    linkedin_messenger: "linkedinLogo",
    gmail: "google",
    outlook: "microsoft",
    custom_email: "emailRed",
    hubspot: "hubspotLogo",
    pipedrive: "pipedriveLogo",
    slack: "slackLogo",
    google_ads: "googleLogo",
    square: "squareLogo",
    shopify: "shopifyLogo",
    stripe: "stripeLogo",
    paypal: "paypalLogo",
  };

  return iconMap[channelName.toLowerCase()] || "linkExternal";
};


const mapCategoryToType = (category: string): string => {
  const categoryMap: Record<string, string> = {
    COMMUNICATION: "Communication Channels",
    CRM_CALENDAR: "CRM & Calendar Sync",
    ECOMMERCE: "Ecommerce & Payment",
    UPCOMING: "Coming Soon",
  };

  return categoryMap[category] || category;
};

/**
 * Formats plan requirements into info string
 */
const formatPlanInfo = (
  requiresPlan: string[],
  comingSoon: boolean,
  limits?: { remaining?: number; max?: number; unlimited?: boolean }
): string => {
  if (comingSoon) {
    return "Coming Soon";
  }

  if (limits?.unlimited) {
    return "Unlimited";
  }

  if (limits?.remaining !== undefined && limits?.max !== undefined) {
    return `${limits.remaining} of ${limits.max} available`;
  }

  if (requiresPlan.length === 0) {
    return "All Plans";
  }

  if (requiresPlan.length === 1) {
    return requiresPlan[0];
  }

  return requiresPlan.join(", ");
};

/**
 * Transforms backend channel data to UI Channel format
 */
export const transformBackendChannelToUI = (
  backendChannel: BackendChannel,
  assets: Record<string, string>,
  categoryLimits?: { remaining?: number; max?: number; unlimited?: boolean }
): Channel => {
  if (!backendChannel || !backendChannel.name) {
    throw new Error("Invalid channel data: missing name");
  }

  const iconKey = getChannelIconKey(backendChannel.name);
  const icon = assets[iconKey] || assets.linkExternal || "";

  return {
    id: String(backendChannel.id ?? backendChannel.name),
    name: backendChannel.displayName || backendChannel.name,
    description: backendChannel.description || "",
    info: formatPlanInfo(
      backendChannel.requiresPlan || [],
      backendChannel.comingSoon || false,
      categoryLimits
    ),
    icon,
    isSelected: false,
    hasBorder: backendChannel.name === "webchat",
    type: mapCategoryToType(backendChannel.category || "COMMUNICATION"),
    tags: backendChannel.isActive && !backendChannel.comingSoon ? ["popular"] : undefined,
    availableChannelId: backendChannel.id,
    availableChannelName: backendChannel.name,
  };
};

export const transformChannelsResponse = (
  response: ChannelsApiResponse | null | undefined,
  assets: Record<string, string>,
  selectedChannels?: SelectedChannelsResponse | null
): Channel[] => {
  if (!response || !response.categories) {
    return [];
  }

  const selectedChannelIds = new Set<number>();
  if (selectedChannels?.channels) {
    selectedChannels.channels.forEach((selected) => {
      if (selected.availableChannel?.id) {
        selectedChannelIds.add(selected.availableChannel.id);
      }
    });
  }

  const channels: Channel[] = [];

  try {
    if (response.categories.communication?.available?.length) {
      const commChannels = response.categories.communication.available
        .filter((channel) => channel && channel.name)
        .map((channel) => {
          const uiChannel = transformBackendChannelToUI(
            channel,
            assets,
            response.categories.communication.limits
          );
          uiChannel.isSelected = selectedChannelIds.has(channel.id);
          return uiChannel;
        });
      channels.push(...commChannels);
    }

    if (response.categories.crmCalendar?.available?.length) {
      const crmChannels = response.categories.crmCalendar.available
        .filter((channel) => channel && channel.name)
        .map((channel) => {
          const uiChannel = transformBackendChannelToUI(channel, assets);
          uiChannel.isSelected = selectedChannelIds.has(channel.id);
          return uiChannel;
        });
      channels.push(...crmChannels);
    }

    if (response.categories.ecommerce?.available?.length) {
      const ecomChannels = response.categories.ecommerce.available
        .filter((channel) => channel && channel.name)
        .map((channel) => {
          const uiChannel = transformBackendChannelToUI(channel, assets);
          uiChannel.isSelected = selectedChannelIds.has(channel.id);
          return uiChannel;
        });
      channels.push(...ecomChannels);
    }

    if (response.categories.upcoming?.available?.length) {
      const upcomingChannels = response.categories.upcoming.available
        .filter((channel) => channel && channel.name)
        .map((channel) => {
          const uiChannel = transformBackendChannelToUI(channel, assets);
          uiChannel.isSelected = selectedChannelIds.has(channel.id);
          return uiChannel;
        });
      channels.push(...upcomingChannels);
    }
  } catch (error) {
    console.error("Error transforming channels response:", error);
    return [];
  }

  return channels;
};

