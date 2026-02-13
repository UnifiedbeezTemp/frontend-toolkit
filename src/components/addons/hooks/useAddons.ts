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
import { extractErrorMessage } from "../../../utils/extractErrorMessage";

export const useAddons = (planType?: string) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const addonState = useSelector((state: RootState) => state.addons);
  const { selectedAddons } = addonState;
  const { showToast } = useToast();
  const { refetch: refetchUser } = useUser();
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [addonErrors, setAddonErrors] = useState<Record<string, string | null>>(
    {},
  );

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
        showToast({
          title: "Failed to remove add-on",
          description: extractErrorMessage(err, "Something went wrong."),
          variant: "error",
          duration: 3000,
        });
      },
    },
  );

  useEffect(() => {
    if (purchasedAddons.length > 0) {
      dispatch(hydrateAddons(purchasedAddons));
    }
  }, [dispatch, purchasedAddons]);

  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

  const handleOpenAddModal = useCallback(
    (addon: Addon) => {
      if (addon.addonType === "MULTI_LANGUAGE_AI") {
        setIsLanguageModalOpen(true);
        dispatch(openAddModal(addon));
      } else {
        dispatch(openAddModal(addon));
      }
    },
    [dispatch],
  );

  const handleCloseAddModal = useCallback(() => {
    dispatch(closeAddModal());
  }, [dispatch]);

  const handleCloseLanguageModal = useCallback(() => {
    setIsLanguageModalOpen(false);
    dispatch(closeAddModal());
  }, [dispatch]);

  const handleUpdateTempQuantity = useCallback(
    (quantity: number) => {
      dispatch(updateTempQuantity(quantity));
    },
    [dispatch],
  );

  const handleAddAddon = useCallback(
    (addon: Addon, quantity: number) => {
      dispatch(addAddon({ addon, quantity }));
      dispatch(closeAddModal());
      setIsLanguageModalOpen(false);
    },
    [dispatch],
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
        } finally {
          setRemovingId(null);
        }
      } else {
        dispatch(removeAddon(id));
      }
    },
    [dispatch, selectedAddons, purchasedAddons, cancelAddonMutation],
  );

  const handleUpdateAddonQuantity = useCallback(
    (id: string, quantity: number) => {
      const purchasedAddon = purchasedAddons.find((a) => a.id === id);
      const purchasedQuantity = purchasedAddon?.used || 0;

      if (quantity < purchasedQuantity) {
        setAddonErrors((prev) => ({
          ...prev,
          [id]: "You cannot reduce this add-on below what is already saved. You can only schedule it for cancellation.",
        }));
        return;
      }

      setAddonErrors((prev) => ({
        ...prev,
        [id]: null,
      }));
      dispatch(updateAddonQuantity({ id, quantity }));
    },
    [dispatch, purchasedAddons],
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

  const { user } = useUser();

  const handleContinueToCheckout = useCallback(
    (selectedAddons: Addon[]) => {
      if (selectedAddons.length > 0) {
        if (user?.trialInfo) {
          const currentPurchases = purchasedAddons.map((a) => ({
            type: a.addonType,
            qty: a.used || 1,
          }));
          const nextPurchases = selectedAddons.map((a) => ({
            type: a.addonType,
            qty: a.used || 1,
          }));

          const hasChanged =
            currentPurchases.length !== nextPurchases.length ||
            nextPurchases.some((next) => {
              const current = currentPurchases.find(
                (c) => c.type === next.type,
              );
              return !current || current.qty !== next.qty;
            });

          if (!hasChanged) {
            router.back();
            return;
          }
        }
        handleOpenCheckoutModal();
      }
    },
    [handleOpenCheckoutModal, user?.trialInfo, purchasedAddons, router],
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
    handleCloseLanguageModal,
    isLanguageModalOpen,
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
    addonErrors,
  };
};
