"use client";

import { useState, useMemo } from "react";

export interface CreditStats {
  remaining: number;
  total: number;
  used: number;
  percentageUsed: number;
  resetDate: string;
  bonusCredits: number;
}

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface DailyTrendDataPoint {
  label: string;
  credit1: number;
  credit2: number;
  totalSegment: number;
}

export interface UsageBreakdownItem {
  name: string;
  value: number;
  color: string;
  percentage: number;
}

export interface CreditPackage {
  id: string;
  credits: number;
  bonusCredits: number;
  price: number;
  isPopular?: boolean;
}

export const useCreditSettings = () => {
  const [activeFilter, setActiveFilter] = useState("12M");
  const [dailyTrendFilter, setDailyTrendFilter] = useState("Overview");
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [purchaseStep, setPurchaseStep] = useState<
    "package" | "payment" | "success"
  >("package");
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(
    null,
  );

  const creditPackages: CreditPackage[] = [
    {
      id: "pkg-1",
      credits: 50000,
      bonusCredits: 10000,
      price: 49,
    },
    {
      id: "pkg-2",
      credits: 50000,
      bonusCredits: 10000,
      price: 399,
    },
    {
      id: "pkg-3",
      credits: 50000,
      bonusCredits: 10000,
      price: 399,
    },
    {
      id: "pkg-4",
      credits: 15000,
      bonusCredits: 2000,
      price: 129,
      isPopular: true,
    },
  ];

  const selectedPackage = useMemo(
    () => creditPackages.find((pkg) => pkg.id === selectedPackageId) || null,
    [selectedPackageId, creditPackages],
  );

  const creditStats: CreditStats = {
    remaining: 6750,
    total: 10000,
    used: 3250,
    percentageUsed: 32.5,
    resetDate: "March 1, 2026",
    bonusCredits: 2500,
  };

  const monthlyUsageData = useMemo(() => {
    switch (activeFilter) {
      case "12M":
        return [
          { label: "Apr", value: 3000 },
          { label: "May", value: 5500 },
          { label: "Jun", value: 8200 },
          { label: "Jul", value: 4800 },
          { label: "Aug", value: 7500 },
          { label: "Sep", value: 9500 },
          { label: "Oct", value: 4200 },
          { label: "Nov", value: 13500 },
          { label: "Dec", value: 6800 },
          { label: "Jan", value: 8000 },
          { label: "Feb", value: 5200 },
          { label: "Mar", value: 11000 },
        ];
      case "6M":
        return [
          { label: "Oct", value: 4200 },
          { label: "Nov", value: 13500 },
          { label: "Dec", value: 6800 },
          { label: "Jan", value: 8000 },
          { label: "Feb", value: 5200 },
          { label: "Mar", value: 11000 },
        ];
      case "30D":
        return [
          { label: "Feb 4-10", value: 12000 },
          { label: "Feb 11-17", value: 15400 },
          { label: "Feb 18-24", value: 9800 },
          { label: "Feb 25-Mar 4", value: 14200 },
        ];
      case "7D":
        return [
          { label: "Feb 26", value: 1800 },
          { label: "Feb 27", value: 2400 },
          { label: "Feb 28", value: 1600 },
          { label: "Mar 1", value: 2100 },
          { label: "Mar 2", value: 2800 },
          { label: "Mar 3", value: 1200 },
          { label: "Mar 4", value: 900 },
        ];
      case "24H":
        return [
          { label: "12PM", value: 450 },
          { label: "4PM", value: 300 },
          { label: "8PM", value: 800 },
          { label: "12AM", value: 1200 },
          { label: "4AM", value: 1500 },
          { label: "8AM", value: 1100 },
        ];
      default:
        return [];
    }
  }, [activeFilter]);

  const dailyTrendData = useMemo(() => {
    const labels = [];
    const today = new Date(2026, 2, 4); // March 4, 2026

    for (let i = 11; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const month = date.toLocaleString("en-US", { month: "short" });
      const day = date.getDate();
      labels.push(`${month} ${day}`);
    }

    return labels.map((label) => {
      const targetTotal = 0.75 + Math.random() * 0.75;
      const p1 = 0.2 + Math.random() * 0.3;
      const p2 = 0.2 + Math.random() * 0.3;
      const p3 = 1 - p1 - p2;

      const c1Raw =
        dailyTrendFilter === "Automation Tasks" ? 0 : targetTotal * p1;
      const c2Raw = dailyTrendFilter === "AI Agent" ? 0 : targetTotal * p2;
      const tSRaw = targetTotal * p3;

      return {
        label,
        credit1: Number(c1Raw.toFixed(2)),
        credit2: Number(c2Raw.toFixed(2)),
        totalSegment: Number(tSRaw.toFixed(2)),
      };
    });
  }, [dailyTrendFilter]);

  const usageBreakdown = useMemo(() => {
    switch (activeFilter) {
      case "12M":
        return [
          {
            name: "AI Agent Conversations",
            value: 2200,
            color: "var(--orange-100)",
            percentage: 67.7,
          },
          {
            name: "Automation Tasks",
            value: 1050,
            color: "var(--leaf-green-100)",
            percentage: 32.3,
          },
        ];
      case "6M":
        return [
          {
            name: "AI Agent Conversations",
            value: 1100,
            color: "var(--orange-100)",
            percentage: 64.5,
          },
          {
            name: "Automation Tasks",
            value: 605,
            color: "var(--leaf-green-100)",
            percentage: 35.5,
          },
        ];
      case "30D":
        return [
          {
            name: "AI Agent Conversations",
            value: 4500,
            color: "var(--orange-100)",
            percentage: 72.1,
          },
          {
            name: "Automation Tasks",
            value: 1740,
            color: "var(--leaf-green-100)",
            percentage: 27.9,
          },
        ];
      case "7D":
        return [
          {
            name: "AI Agent Conversations",
            value: 850,
            color: "var(--orange-100)",
            percentage: 68.3,
          },
          {
            name: "Automation Tasks",
            value: 395,
            color: "var(--leaf-green-100)",
            percentage: 31.7,
          },
        ];
      case "24H":
        return [
          {
            name: "AI Agent Conversations",
            value: 120,
            color: "var(--orange-100)",
            percentage: 75.0,
          },
          {
            name: "Automation Tasks",
            value: 40,
            color: "var(--leaf-green-100)",
            percentage: 25.0,
          },
        ];
      default:
        return [];
    }
  }, [activeFilter]);

  const handlePurchaseCredits = () => {
    setIsPurchaseModalOpen(true);
    setPurchaseStep("package");
  };

  const handleClosePurchaseModal = () => {
    setIsPurchaseModalOpen(false);
  };

  const handleContinuePurchase = () => {
    if (selectedPackageId) {
      setPurchaseStep("payment");
    }
  };

  const handleBackToPackages = () => {
    setPurchaseStep("package");
  };

  const handleCompletePurchase = () => {
    setPurchaseStep("success");
  };

  const handleDownloadReceipt = () => {
    setIsDownloadModalOpen(true);
  };

  const handleCloseDownloadModal = () => {
    setIsDownloadModalOpen(false);
  };

  const handleSelectPackage = (packageId: string) => {
    setSelectedPackageId(packageId);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleDailyTrendFilterChange = (filter: string) => {
    setDailyTrendFilter(filter);
  };

  return {
    creditStats,
    monthlyUsageData,
    dailyTrendData,
    usageBreakdown,
    activeFilter,
    dailyTrendFilter,
    creditPackages,
    isPurchaseModalOpen,
    purchaseStep,
    selectedPackageId,
    selectedPackage,
    isDownloadModalOpen,
    handlePurchaseCredits,
    handleClosePurchaseModal,
    handleContinuePurchase,
    handleBackToPackages,
    handleCompletePurchase,
    handleDownloadReceipt,
    handleCloseDownloadModal,
    handleSelectPackage,
    handleFilterChange,
    handleDailyTrendFilterChange,
  };
};
