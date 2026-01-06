import { useCallback } from 'react';
import { useSupabaseIcons } from '@/shared/src/lib/supabase/useSupabase';
import { Addon } from '@/shared/src/store/onboarding/types/addonTypes';

interface UseAddonItemProps {
  addon: Addon;
  onQuantityChange: (id: string, quantity: number) => void;
}

export const useAddonItem = ({ addon, onQuantityChange }: UseAddonItemProps) => {
  const icons = useSupabaseIcons();
  const canIncrease = (addon.used || 1) < addon.limit;

  const getButtonIcons = useCallback((type: "plus" | "minus") => {
    if (!canIncrease && type === "plus") {
      return icons.plusRed;
    }
    return type === "plus" ? icons.plus : icons.minus;
  }, [canIncrease, icons.plusRed, icons.plus, icons.minus]);

  const buttonVariant = !canIncrease ? "dangerReverse" : "secondary";
  const textColor = !canIncrease ? "text-destructive" : "text-text-secondary";

  const handleDecrease = useCallback(() => {
    onQuantityChange(addon.id, (addon.used || 1) - 1);
  }, [addon.id, addon.used, onQuantityChange]);

  const handleIncrease = useCallback(() => {
    onQuantityChange(addon.id, (addon.used || 1) + 1);
  }, [addon.id, addon.used, onQuantityChange]);

  const isAtMinimum = (addon.used || 1) <= 1;

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