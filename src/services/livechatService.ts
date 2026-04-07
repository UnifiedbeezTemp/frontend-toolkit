import { api } from "../api";

export type LiveChatCreateRequest = FormData;

export interface LiveChatUpdateRequest {
  teamName: string;
  chatName: string;
  readReceipts: boolean;
}

export interface LiveChatCreateResponse {
  success: boolean;
  channel?: {
    id: number;
    isActive: boolean;
    connectedAt: string;
    websiteUrl?: string;
    teamName?: string;
    chatName?: string;
    readReceipts?: boolean;
    profilePic?: string | null;
  };
  message?: string;
}

export interface LiveChatUpdateResponse {
  success: boolean;
  channel?: {
    id: number;
    isActive: boolean;
    connectedAt: string;
    updatedAt: string;
    websiteUrl?: string;
    teamName?: string;
    chatName?: string;
    readReceipts?: boolean;
    profilePic?: string | null;
  };
  message?: string;
}

export const createLiveChat = async (
  data: LiveChatCreateRequest,
): Promise<LiveChatCreateResponse> => {
  const response = await api.post<
    LiveChatCreateRequest,
    LiveChatCreateResponse
  >("/livechat", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export const updateLiveChat = async (
  livechatId: number,
  data: LiveChatUpdateRequest,
): Promise<LiveChatUpdateResponse> => {
  const response = await api.patch<
    LiveChatUpdateRequest,
    LiveChatUpdateResponse
  >(`/livechat/${livechatId}`, data);
  return response;
};

export const uploadLiveChatProfilePic = async (
  livechatId: number,
  profilePic: File,
): Promise<LiveChatUpdateResponse> => {
  const formData = new FormData();
  formData.append("profilePic", profilePic);

  const response = await api.patch<FormData, LiveChatUpdateResponse>(
    `/livechat/${livechatId}/profile-pic`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response;
};

export interface LiveChatDeleteResponse {
  success: boolean;
  message?: string;
}

export const deleteLiveChat = async (
  livechatId: number,
): Promise<LiveChatDeleteResponse> => {
  const response = await api.delete<LiveChatDeleteResponse>(
    `/livechat/${livechatId}`,
  );
  return response;
};
