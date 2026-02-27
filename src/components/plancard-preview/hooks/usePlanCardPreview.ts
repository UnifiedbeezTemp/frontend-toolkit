"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Plan } from "../../../api/services/plan/types";
import { Addon } from "../../../store/onboarding/types/addonTypes";
import { usePurchasedAddons } from "./usePurchasedAddons";
import { calculateTotalWithAddons } from "../../../utils/priceUtils";
import { useAddonsAccess } from "../../../hooks/useAddonsAccess";

interface UsePlanCardPreviewProps {
  plan: Plan | null;
  selectedAddons?: Addon[];
  monthlyPrice: number;
  isYearly?: boolean;
  enableReturnTo?: boolean;
  onSelectPlan?: (planId: string) => void;
}

export const usePlanCardPreview = ({
  plan,
  selectedAddons,
  monthlyPrice,
  isYearly = false,
  enableReturnTo = false,
  onSelectPlan,
}: UsePlanCardPreviewProps) => {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddonsModalOpen, setIsAddonsModalOpen] = useState(false);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);

  const { purchasedAddons, isLoading: isPurchasedAddonsLoading } =
    usePurchasedAddons();

  const addonsToUse =
    selectedAddons && selectedAddons.length > 0
      ? selectedAddons
      : purchasedAddons;

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

  const { verifyAccess } = useAddonsAccess();

  const handleAddonsClick = (targetPlanId?: string) => {
    if (!verifyAccess(targetPlanId)) return;

    if (plan) {
      setIsModalOpen(false);
      setIsComparisonModalOpen(false);
      const params = new URLSearchParams();
      if (isYearly) {
        params.set("isYearly", "true");
      }
      if (enableReturnTo && typeof window !== "undefined") {
        const fullUrl = window.location.href;
        params.set("returnTo", fullUrl);
      }
      const baseUrl = enableReturnTo ? process.env.NEXT_PUBLIC_BASE || "" : "";
      const queryString = params.toString();
      router.push(`${baseUrl}/addons${queryString ? `?${queryString}` : ""}`);
    } else {
      setIsAddonsModalOpen(true);
    }
  };

  const handleUpgradeClick = () => {
    if (enableReturnTo && typeof window !== "undefined") {
      const fullUrl = window.location.href;
      const baseUrl = process.env.NEXT_PUBLIC_BASE || "";
      router.push(`${baseUrl}/plans?returnTo=${encodeURIComponent(fullUrl)}`);
    } else {
      router.push("/plans");
    }
  };

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleSeeDetailsClick = () => {
    setIsModalOpen(true);
    setIsMenuOpen(false);
  };

  const handleComparePlansClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setIsComparisonModalOpen(true);
  };

  const handlePlanSelect = (planId: string) => {
    setIsComparisonModalOpen(false);
    if (onSelectPlan) {
      onSelectPlan(planId);
    } else {
      if (enableReturnTo && typeof window !== "undefined") {
        const fullUrl = window.location.href;
        const baseUrl = process.env.NEXT_PUBLIC_BASE || "";
        router.push(`${baseUrl}/plans?returnTo=${encodeURIComponent(fullUrl)}`);
      } else {
        router.push("/plans");
      }
    }
  };

  const addonsTotal = useMemo(() => {
    if (!addonsToUse || addonsToUse.length === 0) return 0;
    return addonsToUse.reduce((total, addon) => {
      return total + addon.price * (addon.used || 1);
    }, 0);
  }, [addonsToUse]);

  const yearlyPriceEur = plan?.originalPlan?.yearlyPriceEur;

  const displayPrice = isYearly
    ? yearlyPriceEur
      ? yearlyPriceEur
      : Math.floor(monthlyPrice * 12 * 0.85)
    : monthlyPrice;

  const totalPrice = isYearly
    ? displayPrice + addonsTotal * 12
    : displayPrice + addonsTotal;

  const isHighestPlan =
    plan?.originalPlan?.planType?.toLowerCase() === "organisation";

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
    handleComparePlansClick,
    handlePlanSelect,
    isComparisonModalOpen,
    setIsComparisonModalOpen,
    addonsTotal,
    totalPrice,
    router,
    addonsToUse,
    isPurchasedAddonsLoading,
    isHighestPlan,
  };
};
