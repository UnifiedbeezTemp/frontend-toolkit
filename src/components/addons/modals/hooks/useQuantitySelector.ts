import { useMemo } from "react";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";

interface UseQuantitySelectorProps {
  isLimitReached: boolean;
  errorText?: string | null;
}

export const useQuantitySelector = ({
  isLimitReached,
  errorText,
}: UseQuantitySelectorProps) => {
  const icons = useSupabaseIcons();

  const buttonIcons = useMemo(() => {
    if (isLimitReached || errorText) {
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
    isLimitReached,
    errorText,
    icons.minus,
    icons.minusRed,
    icons.plus,
    icons.plusRed,
  ]);

  const textColor = useMemo(
    () =>
      isLimitReached || errorText ? "text-destructive" : "text-text-secondary",
    [isLimitReached, errorText],
  );

  const buttonVariant = useMemo(
    (): "dangerReverse" | "secondary" =>
      isLimitReached || errorText ? "dangerReverse" : "secondary",
    [isLimitReached, errorText],
  );

  return {
    buttonIcons,
    textColor,
    buttonVariant,
  };
};
