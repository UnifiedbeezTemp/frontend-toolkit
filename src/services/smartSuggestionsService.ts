import { api } from "../api";
import {
  AccountType,
  TimeUnit,
} from "../components/channel-account-ai-config/types/api";

export interface SmartSuggestionsParams {
  timezone: string;
  category?:
    | "main-config"
    | "escalation-rules"
    | "follow-up-triggers"
    | "ai-behaviour-settings";
  accountId?: number;
  accountType?: AccountType;
  webchatId?: number;
}

export interface MainConfigRecommendationsResponse {
  escalationEnabled: boolean;
  followUpEnabled: boolean;
  replyDelayAmount: number;
  replyDelayUnit: TimeUnit;
  teamAccess: string[];
}

export interface EscalationRecommendationsResponse {
  escalationEnabled: boolean;
  unansweredMessagesThreshold: number;
  escalationTimeAmount: number;
  escalationTimeUnit: TimeUnit;
  escalationKeywords: string[];
  escalationContacts: { email: string; fullName: string }[];
}

export interface FollowUpRecommendationsResponse {
  followUpEnabled: boolean;
  followUpDelayAmount: number;
  followUpDelayUnit: TimeUnit;
  followUpContentType: string;
}

export interface AIBehaviorRecommendationsResponse {
  replyDelayAmount: number;
  replyDelayUnit: TimeUnit;
  openingHour: number;
  closingHour: number;
  timezone: string;
  workingDays: string[];
}

export type SmartSuggestionsResponse =
  | MainConfigRecommendationsResponse
  | EscalationRecommendationsResponse
  | FollowUpRecommendationsResponse
  | AIBehaviorRecommendationsResponse;

export const getSmartSuggestions = async (
  channelId: number,
  aiId: number,
  params: SmartSuggestionsParams,
): Promise<SmartSuggestionsResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append("timezone", params.timezone);

  if (params.category) queryParams.append("category", params.category);
  if (params.accountId)
    queryParams.append("accountId", String(params.accountId));
  if (params.accountType) queryParams.append("accountType", params.accountType);
  if (params.webchatId)
    queryParams.append("webchatId", String(params.webchatId));

  const url = `/channels/${channelId}/ai-config/${aiId}/recommendations?${queryParams.toString()}`;
  return api.get(url);
};
