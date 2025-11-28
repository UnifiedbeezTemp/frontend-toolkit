import { useFetch } from "../../../hooks/useFetch";
import { planBaseUrl } from "../../../rootUrls";
import { OriginalPlan } from "../types";

export const usePlans = () => {
  const { data, loading, error, retry } = useFetch<OriginalPlan[]>(
    `${planBaseUrl}/all`
  );

  return {
    plans: data || [],
    loading,
    error,
    retry,
  };
};
