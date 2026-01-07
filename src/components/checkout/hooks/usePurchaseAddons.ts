import { useCallback } from "react";
import { useAppMutation } from "../../../api";
import {
  addonService,
  PurchaseBatchPayload,
  PurchaseBatchResponse,
} from "../../../api/services/addon/addonService";
import { useAddonsPage } from "../../addons";
import { useToast } from "../../ui/toast/ToastProvider";

export const usePurchaseAddons = () => {
  const { showToast } = useToast();
  const { selectedAddons, addons: availableAddons } = useAddonsPage();

  const mutation = useAppMutation<PurchaseBatchPayload, PurchaseBatchResponse>(
    (payload) => addonService.purchaseBatch(payload),
    {
      onSuccess: () => {
        // showToast({
        //   title: "Addons Purchased",
        //   description: "Your addons have been activated successfully.",
        //   variant: "success",
        // });
      },
      onError: () => {
        showToast({
          title: "Purchase Failed",
          description: "Failed to purchase addons. Please contact support.",
          variant: "error",
        });
      },
    }
  );

  const purchaseSelectedAddons = useCallback(async () => {
    if (selectedAddons.length === 0) return;

    const purchases = selectedAddons
      .map((addon) => {
        const type =
          addon.addonType ||
          availableAddons.find((a) => a.id === addon.id)?.addonType;
        return {
          addonType: type,
          quantity: addon.used || 1,
        };
      })
      .filter((p): p is { addonType: string; quantity: number } =>
        Boolean(p.addonType)
      );

    if (purchases.length > 0) {
      await mutation.mutateAsync({ purchases });
    }
  }, [selectedAddons, availableAddons, mutation]);

  return {
    ...mutation,
    purchaseSelectedAddons,
  };
};
