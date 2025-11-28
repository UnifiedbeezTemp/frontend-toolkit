import { useFetch } from "../../../hooks/useFetch";
import { planBaseUrl } from "../../../rootUrls";
import { OriginalPlan } from "../types";

interface Props {
  planType?: string | null;
}

export const usePlan = ({ planType }: Props) => {
  const { data, loading, error, retry } = useFetch<OriginalPlan>(
    `${planBaseUrl}/${planType}`
  );

  return {
    plan: data || null,
    loading,
    error,
    retry,
  };
};
