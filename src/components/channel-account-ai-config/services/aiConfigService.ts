import { api } from "../../../api";
import {
  AIConfigResponse,
  UpdateAIConfigRequest,
  UpdateConfigResponse,
} from "../types/api";
import {
  isWebchatConnection,
  getAccountTypeFromProvider,
} from "../utils/configUtils";

export interface AIConfigParams {
  channelId: number;
  aiId: number;
  connectionId: number | string;
  metadata?: Record<string, unknown>;
}

function buildQueryParams(
  connectionId: number | string,
  metadata?: Record<string, unknown>,
): string {
  const params = new URLSearchParams();

  if (isWebchatConnection(metadata)) {
    params.append("webchatId", String(connectionId));
  } else {
    params.append("accountId", String(connectionId));
    const provider = metadata?.provider as string | undefined;
    params.append(
      "accountType",
      getAccountTypeFromProvider(provider || "email"),
    );
  }

  return params.toString();
}

export const aiConfigService = {
  getAIConfig: async (params: AIConfigParams): Promise<AIConfigResponse> => {
    const { channelId, aiId, connectionId, metadata } = params;
    const queryString = buildQueryParams(connectionId, metadata);
    const url = `/channels/${channelId}/ai-config/${aiId}${queryString ? `?${queryString}` : ""}`;
    return api.get<AIConfigResponse>(url);
  },

  updateAIConfig: async (
    params: AIConfigParams & { data: UpdateAIConfigRequest },
  ): Promise<UpdateConfigResponse> => {
    const { channelId, aiId, connectionId, metadata, data } = params;
    const queryString = buildQueryParams(connectionId, metadata);
    const url = `/channels/${channelId}/ai-config/${aiId}${queryString ? `?${queryString}` : ""}`;
    return api.patch<UpdateAIConfigRequest, UpdateConfigResponse>(url, data);
  },
};
