import { api } from "../api";
import {
  WabaCallbackRequest,
  WabaCallbackResponse,
  WabaConfigResponse,
  WabaSetupInitResponse,
} from "../types/channelApiTypes";

export const getWabaConfig = async (): Promise<WabaConfigResponse> => {
  return api.get<WabaConfigResponse>("/waba/config");
};

export const initWabaSetup = async (): Promise<WabaSetupInitResponse> => {
  return api.post<undefined, WabaSetupInitResponse>("/waba/setup/init");
};

export const completeWabaCallback = async (
  token: string,
  payload: WabaCallbackRequest
): Promise<WabaCallbackResponse> => {
  return api.post<WabaCallbackRequest, WabaCallbackResponse>(
    `/waba/callback?token=${token}`,
    payload
  );
};

