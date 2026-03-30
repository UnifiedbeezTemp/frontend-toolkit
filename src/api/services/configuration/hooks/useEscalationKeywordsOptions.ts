import { useAppQuery } from "@/shared/src/api/query";
import { APIError } from "@/shared/src/api/types";
import {
  EscalationKeywordsOptionsResponse,
  fetchEscalationKeywordsOptions,
} from "../configurationOptions";

export const useEscalationKeywordsOptions = (industryType?: string) => {
  const normalizedIndustryType = industryType?.trim().toLowerCase() ?? "";

  return useAppQuery<EscalationKeywordsOptionsResponse, APIError>(
    ["escalation-keywords-options", normalizedIndustryType],
    () => fetchEscalationKeywordsOptions({ industryType: normalizedIndustryType }),
    { enabled: normalizedIndustryType.length > 0 },
  );
};

