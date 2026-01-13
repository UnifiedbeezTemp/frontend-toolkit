"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Plan } from "../../../api/services/plan/types";
import { Addon } from "../../../store/onboarding/types/addonTypes";
import { usePurchasedAddons } from "./usePurchasedAddons";
import { calculateTotalWithAddons } from "../../../utils/priceUtils";

interface UsePlanCardPreviewProps {
  plan: Plan | null;
  selectedAddons?: Addon[];
  monthlyPrice: number;
  isYearly?: boolean;
}

export const usePlanCardPreview = ({
  plan,
  selectedAddons,
  monthlyPrice,
  isYearly = false,
}: UsePlanCardPreviewProps) => {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddonsModalOpen, setIsAddonsModalOpen] = useState(false);

  const { purchasedAddons, isLoading: isPurchasedAddonsLoading } =
    usePurchasedAddons();

  const addonsToUse = selectedAddons || purchasedAddons;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleAddonsClick = () => {
    if (plan) {
      const params = new URLSearchParams();
      if (isYearly) {
        params.set("isYearly", "true");
      }
      const queryString = params.toString();
      router.push(`/addons${queryString ? `?${queryString}` : ""}`);
    } else {
      setIsAddonsModalOpen(true);
    }
  };

  const handleUpgradeClick = () => {
    router.push("/plans");
  };

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleSeeDetailsClick = () => {
    setIsModalOpen(true);
    setIsMenuOpen(false);
  };

  const addonsTotal = useMemo(() => {
    if (!addonsToUse || addonsToUse.length === 0) return 0;
    return addonsToUse.reduce((total, addon) => {
      return total + addon.price * (addon.used || 1);
    }, 0);
  }, [addonsToUse]);

  const totalPrice = calculateTotalWithAddons(
    monthlyPrice,
    addonsTotal,
    isYearly
  );
  const displayPrice = isYearly
    ? Math.floor(monthlyPrice * 12 * 0.85)
    : monthlyPrice;

  return {
    isMenuOpen,
    setIsMenuOpen,
    isModalOpen,
    setIsModalOpen,
    isAddonsModalOpen,
    setIsAddonsModalOpen,
    menuRef,
    handleAddonsClick,
    handleUpgradeClick,
    handleMenuToggle,
    handleSeeDetailsClick,
    addonsTotal,
    totalPrice,
    router,
    addonsToUse,
    isPurchasedAddonsLoading,
  };
};
