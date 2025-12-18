import { api } from "../api";

export interface BusinessEnhanceRequest {
  current_overview: string;
}

export interface BusinessEnhanceResponse {
  enhanced_overview: string;
  tokens_used: number;
  character_count: number;
  model: string;
  cost_estimate_usd: number;
}

export const enhanceBusinessDescription = async (
  currentOverview: string
): Promise<BusinessEnhanceResponse> => {
  const response = await api.post<BusinessEnhanceRequest, BusinessEnhanceResponse>(
    "/enhancement/enhance-business-overview",
    {
      current_overview: currentOverview,
    }
  );
  return response;
};

