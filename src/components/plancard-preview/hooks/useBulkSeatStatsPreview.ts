import { useMemo } from "react";
import { useAppQuery } from "../../../api";
import { addonService } from "../../../api/services/addon/addonService";

export function useBulkSeatStatsPreview({
  enabled,
}: {
  enabled: boolean;
}) {
  const { data, isLoading, error } = useAppQuery(
    ["bulkSeats"],
    () => addonService.getBulkSeats(),
    {
      enabled,
      retry: false,
    },
  );

  const bulkSeatsCount = useMemo(() => {
    const stats = data?.stats;
    if (!stats) return 0;
    return stats?.bulkSeats || 0;
  }, [data?.stats]);

  const hasActiveBulkSeats = useMemo(() => {
    const list = data?.bulkSeats ?? [];
    return list?.some((s) => s?.isActive);
  }, [data?.bulkSeats]);

  const bulkSeatsMonthlyTotal = useMemo(() => {
    return data?.stats?.billing?.monthlyTotal ?? 0;
  }, [data?.stats?.billing?.monthlyTotal]);

  return {
    bulkSeatsCount,
    hasActiveBulkSeats,
    bulkSeatsMonthlyTotal,
    isLoading,
    error,
  };
}

