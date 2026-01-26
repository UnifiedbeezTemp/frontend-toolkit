import { useAppQuery } from "../../../query";
import { OriginalplansService } from "../plansServices";
import { APIError } from "../../../types";
import { OriginalPlan } from "../types";

export const useUserPlan = (retry?: boolean) => {
  const { data, isLoading, error, refetch } = useAppQuery<OriginalPlan, APIError>(
    ["plans", "user"],
    () => OriginalplansService.getUserPlanFeatures(),
    {
      retry,
    }
  );

  const isUnauthenticated = 
    error?.status === 401 || 
    error?.message?.statusCode === 401 ||
    error?.details?.statusCode === 401;

  const errorMessage = error ? (error.message?.message || "An error occurred") : null;

  return {
    userPlan: data || null,
    loading: isLoading,
    error: isUnauthenticated ? null : errorMessage,
    isUnauthenticated,
    retry: refetch,
  };
};
