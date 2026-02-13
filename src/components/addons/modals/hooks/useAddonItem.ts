import { useCallback } from "react";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";
import { Addon } from "../../../../store/onboarding/types/addonTypes";

interface UseAddonItemProps {
  addon: Addon;
  onQuantityChange: (id: string, quantity: number) => void;
  errorText?: string | null;
  purchasedQuantity?: number;
}

export const useAddonItem = ({
  addon,
  onQuantityChange,
  errorText,
  purchasedQuantity = 0,
}: UseAddonItemProps) => {
  const icons = useSupabaseIcons();
  const canIncrease = (addon.used || 1) < addon.limit;

  const getButtonIcons = useCallback(
    (type: "plus" | "minus") => {
      if ((!canIncrease && type === "plus") || errorText) {
        return type === "plus" ? icons.plusRed : icons.minusRed;
      }
      return type === "plus" ? icons.plus : icons.minus;
    },
    [
      canIncrease,
      icons.plusRed,
      icons.minusRed,
      icons.plus,
      icons.minus,
      errorText,
    ],
  );

  const buttonVariant =
    !canIncrease || errorText ? "dangerReverse" : "secondary";
  const textColor =
    !canIncrease || errorText ? "text-destructive" : "text-text-secondary";

  const handleDecrease = useCallback(() => {
    onQuantityChange(addon.id, (addon.used || 1) - 1);
  }, [addon.id, addon.used, onQuantityChange]);

  const handleIncrease = useCallback(() => {
    onQuantityChange(addon.id, (addon.used || 1) + 1);
  }, [addon.id, addon.used, onQuantityChange]);

  const isAtMinimum = (addon.used || 1) <= Math.max(1, purchasedQuantity);

  return {
    getButtonIcons,
    buttonVariant,
    textColor,
    handleDecrease,
    handleIncrease,
    isAtMinimum,
    canIncrease,
  };
};
