import { Channel } from "../store/onboarding/types/channelTypes";
import { BackendChannel, ChannelsApiResponse, SelectedChannelsResponse, SelectedChannel } from "../types/channelApiTypes";

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
    outlook: "microsoftCalendar",
    custom_email: "emailRed",
    hubspot: "hubspotLogo",
    pipedrive: "pipedriveLogo",
    slack: "slackLogo",
    google_ads: "googleLogo",
    square: "squareLogo",
    shopify: "shopifyLogo",
    stripe: "stripeLogo",
    paypal: "paypalLogo",
    calendly: "calendyLogo",
    zoom: "zoomLogo",
    microsoft_calendar: "microsoftCalendar",
    google_calendar: "googleCalendar",
    twilio_sms: "twilioSmsIcon",
    twilio_voice: "twilioPhoneIcon"
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
 * Transforms a selected channel from backend to UI Channel format, preserving all backend data
 */
export const transformSelectedChannelToUI = (
  selectedChannel: SelectedChannel,
  assets: Record<string, string>
): Channel => {
  if (!selectedChannel || !selectedChannel.availableChannel) {
    throw new Error("Invalid selected channel data: missing availableChannel");
  }

  const backendChannel = selectedChannel.availableChannel;
  const iconKey = getChannelIconKey(backendChannel.name);
  const icon = assets[iconKey] || assets.linkExternal || "";
  // console.log(backendChannel)


  // Preserve ALL backend data and just add UI-specific fields
  const { id, channelName, ...restSelectedChannel } = selectedChannel;
  return {
    ...restSelectedChannel, // Spread all SelectedChannel fields except id and channelName (userId, availableChannelId, isActive, isConnected, credentials, etc.)
    id: String(id), // Convert id to string for Redux compatibility
    name: channelName, // Map channelName to name for UI compatibility
    channelName, // Also keep channelName for backend compatibility
    description: backendChannel.description || "", // Use description from availableChannel
    icon, // Add icon
    hasBorder: backendChannel.name === "webchat",
    type: mapCategoryToType(backendChannel.category || "COMMUNICATION"),
    tags: backendChannel.isActive && !backendChannel.comingSoon ? ["popular"] : undefined,
    info: formatPlanInfo(
      backendChannel.requiresPlan || [],
      backendChannel.comingSoon || false
    ),
    isSelected: true, // Mark as selected since it's from selectedChannels
    // Preserve availableChannel with icon added
    availableChannel: {
      ...backendChannel,
      icon,
    },
  } as Channel;
};

/**
 * Transforms backend channel data to UI Channel format (for available channels)
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

  // Create a minimal SelectedChannel-like structure for available channels (not yet selected)
  return {
    id: String(backendChannel.id), // Use availableChannelId as string for id
    userId: 0, // Not available for unselected channels
    availableChannelId: backendChannel.id,
    channelName: backendChannel.displayName || backendChannel.name,
    name: backendChannel.displayName || backendChannel.name, // Map to name for UI compatibility
    description: backendChannel.description || "",
    isActive: false,
    isConnected: false,
    credentials: null,
    connectedAt: null,
    lastSyncAt: null,
    canReceive: false,
    canSend: false,
    verificationStatus: "PENDING",
    verificationStartedAt: null,
    verifiedAt: null,
    verificationExpiresAt: null,
    verificationError: null,
    verificationAttempts: 0,
    lastVerificationAttempt: null,
    verificationMetadata: null,
    credentialsEncrypted: false,
    encryptionIv: null,
    encryptionTag: null,
    provider: null,
    sharedCredentialId: null,
    whatsappAccounts: [],
    facebookAccounts: [],
    emailAccounts: [],
    smsAccounts: [],
    calendarAccounts: [],
    webchatConfigs: [],
    // UI-specific fields
    icon,
    hasBorder: backendChannel.name === "webchat",
    type: mapCategoryToType(backendChannel.category || "COMMUNICATION"),
    tags: backendChannel.isActive && !backendChannel.comingSoon ? ["popular"] : undefined,
    info: formatPlanInfo(
      backendChannel.requiresPlan || [],
      backendChannel.comingSoon || false,
      categoryLimits
    ),
    isSelected: false, // Not selected yet
    // Preserve availableChannel
    availableChannel: {
      ...backendChannel,
      icon,
    },
  } as unknown as Channel;
};

export const transformChannelsResponse = (
  response: ChannelsApiResponse | null | undefined,
  assets: Record<string, string>,
  selectedChannels?: SelectedChannelsResponse | null
): Channel[] => {
  if (!response || !response.categories) {
    return [];
  }

  const channels: Channel[] = [];
  const selectedChannelMap = new Map<number, SelectedChannel>();
  
  // Map selected channels by availableChannelId for quick lookup
  if (selectedChannels?.channels) {
    selectedChannels.channels.forEach((selected) => {
      if (selected.availableChannel?.id) {
        selectedChannelMap.set(selected.availableChannel.id, selected);
      }
    });
  }

  try {
    // Process communication channels
    if (response.categories.communication?.available?.length) {
      const commChannels = response.categories.communication.available
        .filter((channel) => channel && channel.name)
        .map((channel) => {
          const selected = selectedChannelMap.get(channel.id);
          if (selected) {
            // If channel is selected, use the full selected channel data
            return transformSelectedChannelToUI(selected, assets);
          } else {
            // If not selected, create minimal structure
            return transformBackendChannelToUI(
              channel,
              assets,
              response.categories.communication.limits
            );
          }
        });
      channels.push(...commChannels);
    }

    // Process CRM Calendar channels
    if (response.categories.crmCalendar?.available?.length) {
      const crmChannels = response.categories.crmCalendar.available
        .filter((channel) => channel && channel.name)
        .map((channel) => {
          const selected = selectedChannelMap.get(channel.id);
          if (selected) {
            return transformSelectedChannelToUI(selected, assets);
          } else {
            return transformBackendChannelToUI(channel, assets);
          }
        });
      channels.push(...crmChannels);
    }

    // Process Ecommerce channels
    if (response.categories.ecommerce?.available?.length) {
      const ecomChannels = response.categories.ecommerce.available
        .filter((channel) => channel && channel.name)
        .map((channel) => {
          const selected = selectedChannelMap.get(channel.id);
          if (selected) {
            return transformSelectedChannelToUI(selected, assets);
          } else {
            return transformBackendChannelToUI(channel, assets);
          }
        });
      channels.push(...ecomChannels);
    }

    // Process Upcoming channels
    if (response.categories.upcoming?.available?.length) {
      const upcomingChannels = response.categories.upcoming.available
        .filter((channel) => channel && channel.name)
        .map((channel) => {
          const selected = selectedChannelMap.get(channel.id);
          if (selected) {
            return transformSelectedChannelToUI(selected, assets);
          } else {
            return transformBackendChannelToUI(channel, assets);
          }
        });
      channels.push(...upcomingChannels);
    }
  } catch (error) {
    console.error("Error transforming channels response:", error);
    return [];
  }

  return channels;
};

