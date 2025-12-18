import { api } from "../api";
import { SelectedChannelsResponse } from "../types/channelApiTypes";

interface SelectChannelRequest {
  availableChannelId: number;
}

interface SelectChannelResponse {
  success: boolean;
  message?: string;
}

export const selectChannel = async (
  channelId: number
): Promise<SelectChannelResponse> => {
  return api.post<SelectChannelRequest, SelectChannelResponse>(
    "/channels/select",
    { availableChannelId: channelId }
  );
};

interface UnselectChannelRequest {
  availableChannelId?: number;
  connectedChannelId?: number;
}

export const unselectChannel = async (
  availableChannelId?: number,
  connectedChannelId?: number
): Promise<SelectChannelResponse> => {
  const body: UnselectChannelRequest = {};
  if (connectedChannelId) {
    body.connectedChannelId = connectedChannelId;
  } else if (availableChannelId) {
    body.availableChannelId = availableChannelId;
  }
  
  return api.post<UnselectChannelRequest, SelectChannelResponse>(
    "/channels/unselect?availableChannelId=${channelId}",
    body
  );
};

export const getSelectedChannels = async (): Promise<SelectedChannelsResponse> => {
  return api.get<SelectedChannelsResponse>("/channels/selected");
};


