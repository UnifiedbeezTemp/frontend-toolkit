import { useMemo } from "react";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";

interface UseQuantitySelectorProps {
  isLimitReached: boolean;
  limit?: number;
  errorText?: string | null;
}

export const useQuantitySelector = ({
  isLimitReached,
  limit,
  errorText,
}: UseQuantitySelectorProps) => {
  const icons = useSupabaseIcons();

  const isDestructive = (isLimitReached || !!errorText) && limit !== 1;

  const buttonIcons = useMemo(() => {
    if (isDestructive || errorText) {
      return {
        minus: icons.minusRed,
        plus: icons.plusRed,
      };
    }
    return {
      minus: icons.minus,
      plus: icons.plus,
    };
  }, [
    isDestructive,
    errorText,
    icons.minus,
    icons.minusRed,
    icons.plus,
    icons.plusRed,
  ]);

  const textColor = useMemo(
    () =>
      isDestructive || errorText ? "text-destructive" : "text-text-secondary",
    [isDestructive, errorText],
  );

  const buttonVariant = useMemo(
    (): "dangerReverse" | "secondary" =>
      isDestructive || errorText ? "dangerReverse" : "secondary",
    [isDestructive, errorText],
  );

  return {
    buttonIcons,
    textColor,
    buttonVariant,
  };
};
