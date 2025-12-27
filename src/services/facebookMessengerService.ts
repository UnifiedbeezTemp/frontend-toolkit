import { api } from "../api";
import { apiBaseUrl } from "../api/rootUrls";

export interface SelectChannelRequest {
  availableChannelId: number;
}

export interface SelectChannelResponse {
  channel: {
    id: number;
    name: string;
    availableChannelId: number;
    channelName: string;
    isConnected: boolean;
  };
}

export interface MessengerChannel {
  id: number;
  channelName: string;
  pageName: string;
  pageId: string;
  isConnected: boolean;
  isActive: boolean;
  canReceive: boolean;
  canSend: boolean;
  connectedAt: string;
  hasInstagram: boolean;
  instagramAccountId?: string;
}

export interface SelectedChannelsResponse {
  channels: Array<{
    id: number;
    channelName: string;
    availableChannel: {
      channelType: string;
    };
    credentials?: {
      pageName?: string;
      pageId?: string;
      instagramAccountId?: string;
    };
    isConnected: boolean;
    isActive: boolean;
    canReceive: boolean;
    canSend: boolean;
    connectedAt: string;
  }>;
}

/**
 * Select a Facebook Messenger channel
 */
export const selectMessengerChannel = async (
  availableChannelId: number
): Promise<SelectChannelResponse> => {
  return api.post<SelectChannelRequest, SelectChannelResponse>(
    "/channels/select",
    {
      availableChannelId,
    }
  );
};

/**
 * Get connected Facebook Messenger channels
 */
export const getConnectedMessengerChannels = async (): Promise<
  MessengerChannel[]
> => {
  const response = await api.get<SelectedChannelsResponse>(
    "/channels/selected"
  );

  return response.channels
    .filter((ch) => ch.availableChannel.channelType === "FACEBOOK_MESSENGER")
    .map((ch) => ({
      id: ch.id,
      channelName: ch.channelName,
      pageName: ch.credentials?.pageName || "Unknown Page",
      pageId: ch.credentials?.pageId || "",
      isConnected: ch.isConnected,
      isActive: ch.isActive,
      canReceive: ch.canReceive,
      canSend: ch.canSend,
      connectedAt: ch.connectedAt,
      hasInstagram: !!ch.credentials?.instagramAccountId,
      instagramAccountId: ch.credentials?.instagramAccountId,
    }));
};

/**
 * Get the OAuth connect URL for Facebook Messenger
 */
export const getFacebookConnectUrl = (): string => {
  // Use the same base URL as the API
  return `${apiBaseUrl}/auth/facebook/connect?type=messenger`;
};

/**
 * Disconnect a Facebook Messenger connection from the backend
 */
export const disconnectFacebookMessenger = async (
  connectionId: number
): Promise<void> => {
  return api.delete(`/auth/facebook/disconnect/${connectionId}`);
};

/**
 * Disconnect a Facebook Messenger channel
 */
export const disconnectMessengerChannel = async (
  channelId: number
): Promise<void> => {
  return api.delete(`/channels/unselect/${channelId}`);
};
