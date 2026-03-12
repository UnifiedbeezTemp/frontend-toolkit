import { useState, useMemo } from "react";

export interface BudgetCategory {
  id: string;
  name: string;
  tag: string;
  description: string;
  spent: number;
  allocated: number;
  remaining: number;
  percentageUsed: number;
  status: "active" | "warning" | "critical";
  breakdown?: {
    name: string;
    subtext: string;
    amount: number;
    percentage: number;
  }[];
  transactions?: {
    id: number;
    description: string;
    date: string;
    amount: number;
  }[];
  budgetAlerts: boolean;
  autoAdjustBudget: boolean;
}

export const useBudgetSettings = () => {
  const [monthlyLimit, setMonthlyLimit] = useState(500);
  const [budgetAlerts, setBudgetAlerts] = useState(true);
  const [autoAdjustBudget, setAutoAdjustBudget] = useState(false);

  const [budgetBreakdown, setBudgetBreakdown] = useState<BudgetCategory[]>([
    {
      id: "1",
      name: "Messaging Costs",
      tag: "Core",
      description: "Total costs for messaging services across all channels",
      spent: 219.2,
      allocated: 220,
      remaining: 0.8,
      percentageUsed: 100,
      status: "critical",
      budgetAlerts: true,
      autoAdjustBudget: false,
      breakdown: [
        {
          name: "WhatsApp Business API",
          subtext: "48,423 messages · £0.0030 per message",
          amount: 145.3,
          percentage: 66.3,
        },
        {
          name: "SMS Gateway",
          subtext: "2,620 messages · £0.0200 per message",
          amount: 52.4,
          percentage: 23.9,
        },
        {
          name: "Push Notifications",
          subtext: "107,500 messages · £0.0002 per message",
          amount: 21.5,
          percentage: 9.8,
        },
      ],
      transactions: [
        {
          id: 1,
          description: "WhatsApp API - Daily usage",
          date: "Feb 18, 2026",
          amount: 8.2,
        },
        {
          id: 2,
          description: "SMS Gateway - Campaign",
          date: "Feb 17, 2026",
          amount: 15.6,
        },
        {
          id: 3,
          description: "WhatsApp API - Daily usage",
          date: "Feb 16, 2026",
          amount: 7.9,
        },
        {
          id: 4,
          description: "Push Notifications - Batch",
          date: "Feb 15, 2026",
          amount: 2.1,
        },
        {
          id: 5,
          description: "WhatsApp API - Daily usage",
          date: "Feb 14, 2026",
          amount: 8.5,
        },
      ],
    },
    {
      id: "2",
      name: "WhatsApp Messages",
      tag: "Communication",
      description: "WhatsApp specific message billing and usage",
      spent: 45.5,
      allocated: 100,
      remaining: 54.5,
      percentageUsed: 46,
      status: "active",
      budgetAlerts: true,
      autoAdjustBudget: false,
      breakdown: [
        {
          name: "Service Window Messages",
          subtext: "1,240 messages · £0.0150 per message",
          amount: 18.6,
          percentage: 40.9,
        },
        {
          name: "Template Messages",
          subtext: "850 messages · £0.0300 per message",
          amount: 25.5,
          percentage: 56.0,
        },
        {
          name: "Media Storage",
          subtext: "1.4GB · £1.00 per GB",
          amount: 1.4,
          percentage: 3.1,
        },
      ],
      transactions: [
        {
          id: 6,
          description: "WhatsApp Template - Welcome",
          date: "Feb 18, 2026",
          amount: 4.2,
        },
        {
          id: 7,
          description: "WhatsApp Service - Support",
          date: "Feb 17, 2026",
          amount: 2.6,
        },
        {
          id: 8,
          description: "WhatsApp Template - Order Conf",
          date: "Feb 16, 2026",
          amount: 5.9,
        },
        {
          id: 9,
          description: "WhatsApp Service - Support",
          date: "Feb 15, 2026",
          amount: 3.1,
        },
        {
          id: 10,
          description: "WhatsApp Template - Promo",
          date: "Feb 14, 2026",
          amount: 8.5,
        },
        {
          id: 11,
          description: "WhatsApp Service - Support",
          date: "Feb 13, 2026",
          amount: 2.5,
        },
        {
          id: 12,
          description: "WhatsApp Template - Update",
          date: "Feb 12, 2026",
          amount: 4.5,
        },
        {
          id: 13,
          description: "WhatsApp Service - Support",
          date: "Feb 11, 2026",
          amount: 2.2,
        },
      ],
    },
    {
      id: "3",
      name: "AI Assistant Costs",
      tag: "AI Services",
      description: "Tokens and processing costs for AI agents",
      spent: 98.3,
      allocated: 150,
      remaining: 51.7,
      percentageUsed: 66,
      status: "active",
      budgetAlerts: false,
      autoAdjustBudget: false,
      breakdown: [
        {
          name: "GPT-4o Tokens",
          subtext: "2.4M tokens · £0.0250 per 1k",
          amount: 60.0,
          percentage: 61.0,
        },
        {
          name: "Llama 3 Processing",
          subtext: "850 hours · £0.0400 per hour",
          amount: 34.0,
          percentage: 34.6,
        },
        {
          name: "Embeddings API",
          subtext: "1.2M tokens · £0.0035 per 1k",
          amount: 4.3,
          percentage: 4.4,
        },
      ],
      transactions: [
        {
          id: 14,
          description: "AI Token Usage - GPT-4o",
          date: "Feb 18, 2026",
          amount: 14.2,
        },
        {
          id: 15,
          description: "AI Processing - Llama 3",
          date: "Feb 17, 2026",
          amount: 8.6,
        },
        {
          id: 16,
          description: "AI Token Usage - GPT-4o",
          date: "Feb 16, 2026",
          amount: 12.9,
        },
        {
          id: 17,
          description: "AI Embeddings API",
          date: "Feb 15, 2026",
          amount: 2.1,
        },
        {
          id: 18,
          description: "AI Token Usage - GPT-4o",
          date: "Feb 14, 2026",
          amount: 18.5,
        },
      ],
    },
    {
      id: "4",
      name: "Infrastructure Costs",
      tag: "Infrastructure",
      description: "Cloud storage and server resource allocation",
      spent: 22,
      allocated: 30,
      remaining: 8,
      percentageUsed: 73,
      status: "warning",
      budgetAlerts: true,
      autoAdjustBudget: true,
      breakdown: [
        {
          name: "Cloud Storage",
          subtext: "450GB · £0.0350 per GB",
          amount: 15.75,
          percentage: 71.6,
        },
        {
          name: "CDN Traffic",
          subtext: "1.2TB · £0.0050 per GB",
          amount: 6.0,
          percentage: 27.3,
        },
        {
          name: "Database Queries",
          subtext: "250k queries · £0.0010 per 1k",
          amount: 0.25,
          percentage: 1.1,
        },
      ],
      transactions: [
        {
          id: 19,
          description: "Storage Expansion Fee",
          date: "Feb 18, 2026",
          amount: 5.25,
        },
        {
          id: 20,
          description: "Monthly Storage Base",
          date: "Feb 01, 2026",
          amount: 10.5,
        },
        {
          id: 21,
          description: "CDN Overages",
          date: "Jan 31, 2026",
          amount: 6.25,
        },
      ],
    },
  ]);

  const budgetStats = useMemo(() => {
    const totalSpent = budgetBreakdown.reduce((sum, cat) => sum + cat.spent, 0);
    const remaining = Math.max(0, monthlyLimit - totalSpent);
    const percentageUsed = (totalSpent / monthlyLimit) * 100;
    const daysConsumed = 20; // Mock current day of month
    const totalDays = 30;
    const perDay = totalSpent / daysConsumed;
    const projectedSpend = perDay * totalDays;

    return {
      monthlyBudget: monthlyLimit,
      totalSpent,
      remaining,
      percentageUsed: Math.min(percentageUsed, 100),
      savedThisMonth: remaining,
      savingsPercentage: Math.max(0, 100 - percentageUsed),
      avgSpending: totalSpent / 2, // Mock 2 weeks
      perWeek: (totalSpent / daysConsumed) * 7,
      perDay,
      projectedSpend,
      daysRemaining: totalDays - daysConsumed,
    };
  }, [monthlyLimit, budgetBreakdown]);

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const [isBreakdownModalOpen, setIsBreakdownModalOpen] = useState(false);

  const selectedCategory = useMemo(() => {
    return budgetBreakdown.find((cat) => cat.id === selectedCategoryId) || null;
  }, [budgetBreakdown, selectedCategoryId]);

  const handleUpdateLimit = (newLimit: number) => {
    setMonthlyLimit(newLimit);
    // In a real app, this would be an API call
    console.log(`Budget limit updated to: £${newLimit}`);
  };

  const handleUpdateCategoryLimit = (categoryId: string, newLimit: number) => {
    setBudgetBreakdown((prev) =>
      prev.map((cat) => {
        if (cat.id === categoryId) {
          const remaining = Number((newLimit - cat.spent).toFixed(2));
          const pUsed = Number(((cat.spent / newLimit) * 100).toFixed(1));
          return {
            ...cat,
            allocated: newLimit,
            remaining: remaining > 0 ? remaining : 0,
            percentageUsed: Math.min(pUsed, 100),
            status: pUsed > 90 ? "critical" : pUsed > 70 ? "warning" : "active",
          };
        }
        return cat;
      }),
    );
    console.log(`Category ${categoryId} limit updated to: £${newLimit}`);
  };

  const handleToggleCategoryAlerts = (categoryId: string) => {
    setBudgetBreakdown((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? { ...cat, budgetAlerts: !cat.budgetAlerts }
          : cat,
      ),
    );
  };

  const handleToggleCategoryAutoAdjust = (categoryId: string) => {
    setBudgetBreakdown((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? { ...cat, autoAdjustBudget: !cat.autoAdjustBudget }
          : cat,
      ),
    );
  };

  const handleToggleAlerts = () => {
    setBudgetAlerts((prev) => !prev);
  };

  const handleToggleAutoAdjust = () => {
    setAutoAdjustBudget((prev) => !prev);
  };

  const handleOpenBreakdown = (category: BudgetCategory) => {
    setSelectedCategoryId(category.id);
    setIsBreakdownModalOpen(true);
  };

  const handleCloseBreakdown = () => {
    setIsBreakdownModalOpen(false);
    setSelectedCategoryId(null);
  };

  return {
    monthlyLimit,
    setMonthlyLimit,
    budgetAlerts,
    autoAdjustBudget,
    budgetStats,
    budgetBreakdown,
    selectedCategory,
    isBreakdownModalOpen,
    handleUpdateLimit,
    handleToggleAlerts,
    handleToggleAutoAdjust,
    handleOpenBreakdown,
    handleCloseBreakdown,
    handleUpdateCategoryLimit,
    handleToggleCategoryAlerts,
    handleToggleCategoryAutoAdjust,
  };
};
