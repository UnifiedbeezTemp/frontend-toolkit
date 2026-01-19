import { useAppQuery } from "../../../query";
import { OriginalplansService } from "../plansServices";

export const usePlans = () => {
  const { data, isLoading, error, refetch } = useAppQuery(
    ["plans", "all"],
    () => OriginalplansService.getAllPlans()
  );

  const errorMessage = error ? (error.message?.message || "An error occurred") : null;

  return {
    plans: data || [],
    loading: isLoading,
    error: errorMessage,
    retry: refetch,
  };
};
