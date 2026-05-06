import { useAppQuery } from "../../../query";
import { extractErrorMessage } from "../../../../utils/extractErrorMessage";
import { OriginalplansService } from "../plansServices";

export const usePlans = () => {
  const { data, isLoading, error, refetch } = useAppQuery(
    ["plans", "all"],
    () => OriginalplansService.getAllPlans()
  );

  const errorMessage = error
    ? extractErrorMessage(error, "An error occurred")
    : null;

  return {
    plans: data || [],
    loading: isLoading,
    error: errorMessage,
    retry: refetch,
  };
};
