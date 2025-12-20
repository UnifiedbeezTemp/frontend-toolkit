import { api } from "../api";

export interface WebchatCreateRequest {
  connectedChannelId: number;
  websiteUrl: string;
}

export interface WebchatUpdateRequest {
  websiteUrl: string;
}

export interface WebchatCreateResponse {
  success: boolean;
  channel?: {
    id: number;
    websiteUrl: string;
    isActive: boolean;
    connectedAt: string;
  };
  message?: string;
}

export interface WebchatUpdateResponse {
  success: boolean;
  channel?: {
    id: number;
    websiteUrl: string;
    isActive: boolean;
    connectedAt: string;
    updatedAt: string;
  };
  message?: string;
}

export const createWebchat = async (
  data: WebchatCreateRequest
): Promise<WebchatCreateResponse> => {
  const response = await api.post<WebchatCreateRequest, WebchatCreateResponse>(
    "/webchat",
    data
  );
  return response;
};

export const updateWebchat = async (
  webchatId: number,
  data: WebchatUpdateRequest
): Promise<WebchatUpdateResponse> => {
  const response = await api.patch<WebchatUpdateRequest, WebchatUpdateResponse>(
    `/webchat/${webchatId}`,
    data
  );
  return response;
};

export interface WebchatDeleteResponse {
  success: boolean;
  message?: string;
}

export const deleteWebchat = async (
  webchatId: number
): Promise<WebchatDeleteResponse> => {
  const response = await api.delete<WebchatDeleteResponse>(
    `/webchat/${webchatId}`
  );
  return response;
};

