import React from "react";
import ComparisonDesktop from "./ComparisonDesktop";
import ComparisonMobile from "./ComparisonMobile";
import { useComparisonPlans } from "./useComparisonPlans";
import { COMPARISON_FEATURES } from "./constants";
import { cn } from "../../lib/utils";
import ComparisonSkeleton from "./ComparisonSkeleton";
import Heading from "../ui/Heading";
import Text from "../ui/Text";
import Button from "../ui/Button";

interface ComparisonTableProps {
  className?: string;
  onSelectPlan?: (planId: string) => void;
  onAddonsClick?: (planId?: string) => void;
}

export default function ComparisonTable({
  className,
  onSelectPlan,
  onAddonsClick,
}: ComparisonTableProps) {
  const { plans, loading, error, retry, icons } = useComparisonPlans();

  if (loading) {
    return <ComparisonSkeleton />;
  }

  if (error) {
    return (
      <div
        className={cn(
          "w-full py-32 flex flex-col items-center justify-center text-center px-6",
          className,
        )}
      >
        <div className="bg-destructive/10 p-6 rounded-full mb-6">
          <div className="w-12 h-12 text-destructive border-4 border-destructive rounded-full flex items-center justify-center font-bold text-2xl">
            !
          </div>
        </div>
        <Heading size="lg" className="mb-2 text-dark-base-100">
          Unable to Load Comparison
        </Heading>
        <Text color="muted" align="center" className="max-w-[40rem] mb-8">
          Something went wrong while fetching the plan data. This could be due
          to a connection issue. Please try again.
        </Text>
        <Button
          onClick={() => retry?.()}
          variant="secondary"
          className="px-12 py-3 rounded-xl border-input-stroke"
        >
          Try Again
        </Button>
      </div>
    );
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
