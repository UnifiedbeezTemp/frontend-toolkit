import React from "react";
import ComparisonDesktop from "./ComparisonDesktop";
import ComparisonMobile from "./ComparisonMobile";
import { useComparisonPlans } from "./useComparisonPlans";
import { COMPARISON_FEATURES } from "./constants";
import { cn } from "../../lib/utils";

interface ComparisonTableProps {
  className?: string;
  onSelectPlan?: (planId: string) => void;
  onAddonsClick?: (planId?: string) => void;
}

export default function ComparisonTable({ className, onSelectPlan, onAddonsClick }: ComparisonTableProps) {
  const { plans, loading, error, icons } = useComparisonPlans();

  if (loading) {
    return (
      <div className={cn("w-screen h-full py-20 flex justify-center items-center", className)}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn("w-full py-20 text-center text-red-500", className)}>
        Failed to load comparison data.
      </div>
    );
  }

  if (!plans || plans.length === 0) {
    return null;
  }

  return (
    <div className={cn("w-full", className)}>
      <ComparisonDesktop 
        plans={plans} 
        features={COMPARISON_FEATURES} 
        icons={icons}
        onAddonsClick={onAddonsClick}
        onSelectPlan={onSelectPlan}
      />
      <ComparisonMobile 
        plans={plans} 
        features={COMPARISON_FEATURES} 
        onAddonsClick={onAddonsClick}
        icons={icons}
        onSelectPlan={onSelectPlan}
      />
    </div>
  );
}
