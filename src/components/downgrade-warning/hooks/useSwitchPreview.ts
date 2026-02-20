import { useState, useCallback } from "react";
import { accountSetupService } from "../../../api/services/auth/accountSetupService";
import { SwitchPreviewResponse } from "../types";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";

interface UseSwitchPreviewReturn {
  data: SwitchPreviewResponse | null;
  loading: boolean;
  error: string | null;
  fetchPreview: (targetPlan: string) => Promise<SwitchPreviewResponse | null>;
  reset: () => void;
}

export const useSwitchPreview = (): UseSwitchPreviewReturn => {
  const [data, setData] = useState<SwitchPreviewResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPreview = useCallback(
    async (targetPlan: string): Promise<SwitchPreviewResponse | null> => {
      setLoading(true);
      setError(null);

      try {
        const response = await accountSetupService.switchPreview(targetPlan);
        setData(response);
        return response;
      } catch (err) {
        const message = extractErrorMessage(
          err,
          "Failed to load switch preview",
        );
        setError(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, fetchPreview, reset };
};
