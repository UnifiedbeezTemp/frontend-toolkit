import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api, useAppMutation } from "../../../api";
import { usePurchasedAddons } from "../../plancard-preview/hooks/usePurchasedAddons";
import { useToast } from "../../ui/toast/ToastProvider";
import { useUser } from "../../../contexts/UserContext";
import { RootState } from "../../../store";
import { Addon } from "../../../store/onboarding/types/addonTypes";
import {
  openAddModal,
  closeAddModal,
  updateTempQuantity,
  addAddon,
  removeAddon,
  updateAddonQuantity,
  openCheckoutModal,
  closeCheckoutModal,
  hydrateAddons,
} from "../../../store/onboarding/slices/addonSlice";

export const useAddons = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const addonState = useSelector((state: RootState) => state.addons);
  const { selectedAddons } = addonState;
  const { showToast } = useToast();
  const { refetch: refetchUser } = useUser();
  const [removingId, setRemovingId] = useState<string | null>(null);

  const { purchasedAddons, refetch: refetchPurchased } = usePurchasedAddons();

  const cancelAddonMutation = useAppMutation(
    async ({
      addonType,
      quantity,
    }: {
      addonType: string;
      quantity: number;
    }) => {
      return await api.delete(`/addon/cancel/${addonType}`, {
        data: { quantity },
      });
    },
    {
      onSuccess: () => {
        refetchPurchased();
        refetchUser();
      },
      onError: (err: unknown) => {
        const errorMessage =
          err instanceof Error ? err.message : "Something went wrong.";
        showToast({
          title: "Failed to remove add-on",
          description: errorMessage,
          variant: "error",
        });
      },
    }
  );

  useEffect(() => {
    if (selectedAddons.length > 0) return;

    let initialAddons: Addon[] = [];

    const savedAddons = sessionStorage.getItem("selected_addons");
    if (savedAddons) {
      try {
        const parsed = JSON.parse(savedAddons);
        if (Array.isArray(parsed)) {
          initialAddons = parsed;
        }
      } catch (e) {
        console.error("Failed to parse saved addons", e);
      }
    }

    if (purchasedAddons.length > 0) {
      purchasedAddons.forEach((purchased) => {
        if (!initialAddons.some((a) => a.id === purchased.id)) {
          initialAddons.push(purchased);
        }
      });
    }

    if (initialAddons.length > 0) {
      dispatch(hydrateAddons(initialAddons));
    }
  }, [dispatch, selectedAddons.length, purchasedAddons]);

  useEffect(() => {
    if (selectedAddons.length > 0) {
      sessionStorage.setItem("selected_addons", JSON.stringify(selectedAddons));
    } else {
      if (sessionStorage.getItem("selected_addons")) {
        sessionStorage.removeItem("selected_addons");
      }
    }
  }, [selectedAddons]);

  const handleOpenAddModal = useCallback(
    (addon: Addon) => {
      dispatch(openAddModal(addon));
    },
    [dispatch]
  );

  const handleCloseAddModal = useCallback(() => {
    dispatch(closeAddModal());
  }, [dispatch]);

  const handleUpdateTempQuantity = useCallback(
    (quantity: number) => {
      dispatch(updateTempQuantity(quantity));
    },
    [dispatch]
  );

  const handleAddAddon = useCallback(
    (addon: Addon, quantity: number) => {
      dispatch(addAddon({ addon, quantity }));
      dispatch(closeAddModal());
    },
    [dispatch]
  );

  const handleRemoveAddon = useCallback(
    async (id: string) => {
      const addonToRemove = selectedAddons.find((a) => a.id === id);
      if (!addonToRemove) return;

      const isPurchased = purchasedAddons.some((a) => a.id === id);

      if (isPurchased) {
        setRemovingId(id);
        try {
          await cancelAddonMutation.mutateAsync({
            addonType: addonToRemove.addonType,
            quantity: addonToRemove.used || 1,
          });
          dispatch(removeAddon(id));
        } finally {
          setRemovingId(null);
        }
      } else {
        dispatch(removeAddon(id));
      }
    },
    [dispatch, selectedAddons, purchasedAddons, cancelAddonMutation]
  );

  const handleUpdateAddonQuantity = useCallback(
    (id: string, quantity: number) => {
      dispatch(updateAddonQuantity({ id, quantity }));
    },
    [dispatch]
  );

  const handleOpenCheckoutModal = useCallback(() => {
    dispatch(openCheckoutModal());
  }, [dispatch]);

  const handleCloseCheckoutModal = useCallback(() => {
    dispatch(closeCheckoutModal());
  }, [dispatch]);

  const handleBackNavigation = useCallback(() => {
    router.back();
  }, [router]);

  const handleContinueToCheckout = useCallback(
    (selectedAddons: Addon[]) => {
      if (selectedAddons.length > 0) {
        handleOpenCheckoutModal();
      }
    },
    [handleOpenCheckoutModal]
  );

  const getTotalPrice = useCallback((selectedAddons: Addon[]) => {
    return selectedAddons.reduce((total, addon) => {
      return total + addon.price * (addon.used || 1);
    }, 0);
  }, []);

  const canAddMore = useCallback((addon: Addon, currentQuantity: number) => {
    return currentQuantity < addon.limit;
  }, []);

  return {
    ...addonState,

    handleOpenAddModal,
    handleCloseAddModal,
    handleUpdateTempQuantity,
    handleAddAddon,
    handleRemoveAddon,
    handleUpdateAddonQuantity,
    handleOpenCheckoutModal,
    handleCloseCheckoutModal,
    handleBackNavigation,
    handleContinueToCheckout,

    getTotalPrice,
    canAddMore,
    removingId,
    isRemoving: !!removingId,
  };
};
