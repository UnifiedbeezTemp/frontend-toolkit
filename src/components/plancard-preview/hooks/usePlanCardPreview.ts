"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Plan } from "../../../api/services/plan/types";
import { Addon } from "../../../store/onboarding/types/addonTypes";

interface UsePlanCardPreviewProps {
  plan: Plan | null;
  selectedAddons?: Addon[];
  displayPrice: number;
}

export const usePlanCardPreview = ({
  plan,
  selectedAddons,
  displayPrice,
}: UsePlanCardPreviewProps) => {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddonsModalOpen, setIsAddonsModalOpen] = useState(false);

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
      router.push("/addons");
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
    if (!selectedAddons || selectedAddons.length === 0) return 0;
    return selectedAddons.reduce((total, addon) => {
      return total + addon.price * (addon.used || 1);
    }, 0);
  }, [selectedAddons]);

  const totalPrice = displayPrice + addonsTotal;

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
  };
};
