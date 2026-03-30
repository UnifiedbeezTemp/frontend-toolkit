import { useAppQuery } from "@/shared/src/api/query";
import { APIError } from "@/shared/src/api/types";
import {
  fetchFollowUpContentTypesOptions,
  FollowUpContentTypesOptionsResponse,
} from "../configurationOptions";

export const useFollowUpContentTypesOptions = () => {
  return useAppQuery<FollowUpContentTypesOptionsResponse, APIError>(
    ["follow-up-content-types-options"],
    () => fetchFollowUpContentTypesOptions(),
  );
};

