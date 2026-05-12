import { useAppQuery } from "../../../query";
import { OriginalplansService } from "../plansServices";
import { APIError } from "../../../types";
import { OriginalPlan } from "../types";
import { extractErrorMessage } from "../../../../utils/extractErrorMessage";

export const useUserPlan = (retry?: boolean) => {
  const { data, isLoading, error, refetch } = useAppQuery<OriginalPlan, APIError>(
    ["plans", "user"],
    () => OriginalplansService.getUserPlanFeatures(),
    {
      retry,
    }
  );

  const messageStatusCode =
    typeof error?.message === "object" ? error.message.statusCode : undefined;

  const isUnauthenticated =
    error?.status === 401 ||
    messageStatusCode === 401 ||
    error?.details?.statusCode === 401;

  const errorMessage = error
    ? extractErrorMessage(error, "An error occurred")
    : null;

  return {
    userPlan: data || null,
    loading: isLoading,
    error: isUnauthenticated ? null : errorMessage,
    isUnauthenticated,
    retry: refetch,
  };
};
