import { api } from "../api";

export type WebchatCreateRequest = FormData;

export interface WebchatUpdateRequest {
  teamName: string;
  chatName: string;
  readReceipts: boolean;
}

export interface WebchatCreateResponse {
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

export interface WebchatUpdateResponse {
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

export const createWebchat = async (
  data: WebchatCreateRequest
): Promise<WebchatCreateResponse> => {
  const response = await api.post<WebchatCreateRequest, WebchatCreateResponse>(
    "/webchat",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
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

export const uploadWebchatProfilePic = async (
  webchatId: number,
  profilePic: File
): Promise<WebchatUpdateResponse> => {
  const formData = new FormData();
  formData.append("profilePic", profilePic);

  const response = await api.post<FormData, WebchatUpdateResponse>(
    `/webchat/${webchatId}/upload-profile-pic`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
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
