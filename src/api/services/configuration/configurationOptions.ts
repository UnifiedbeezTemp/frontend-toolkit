import { api } from "@/shared/src/api";

export type EscalationKeywordsOptionsResponse = {
  industryType: string;
  keywords: string[];
};

export type FollowUpContentTypeOption = {
  code: string;
  label: string;
};

export type FollowUpContentTypesOptionsResponse = {
  contentTypes: FollowUpContentTypeOption[];
};

export type TimezoneOption = {
  value: string;
  label: string;
};

export type TimezonesOptionsResponse = {
  timezones: TimezoneOption[];
  defaultTimezone: string;
};

export const fetchEscalationKeywordsOptions = async (params: {
  industryType: string;
}): Promise<EscalationKeywordsOptionsResponse> => {
  const query = new URLSearchParams({ industryType: params.industryType });
  return api.get(`/configuration/options/escalation-keywords?${query.toString()}`);
};

export const fetchFollowUpContentTypesOptions =
  async (): Promise<FollowUpContentTypesOptionsResponse> => {
    return api.get("/configuration/options/follow-up-content-types");
  };

export const fetchTimezonesOptions = async (): Promise<TimezonesOptionsResponse> => {
  return api.get("/configuration/options/timezones");
};
