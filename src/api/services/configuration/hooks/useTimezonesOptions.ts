import { useAppQuery } from "@/shared/src/api/query";
import { APIError } from "@/shared/src/api/types";
import { fetchTimezonesOptions, TimezonesOptionsResponse } from "../configurationOptions";

export const useTimezonesOptions = () => {
  return useAppQuery<TimezonesOptionsResponse, APIError>(
    ["timezones-options"],
    () => fetchTimezonesOptions(),
  );
};

