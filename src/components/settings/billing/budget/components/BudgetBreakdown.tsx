"use client";

import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import { cn } from "../../../../../lib/utils";
import Heading from "../../../../ui/Heading";
import Text from "../../../../ui/Text";
import { BudgetCategory } from "../hooks/useBudgetSettings";

interface BudgetBreakdownProps {
  categories: BudgetCategory[];
  onViewDetails: (category: BudgetCategory) => void;
}

export default function BudgetBreakdown({
  categories,
  onViewDetails,
}: BudgetBreakdownProps) {
  const icons = useSupabaseIcons();

  return (
    <div className="mt-[2.4rem] p-[1.6rem] rounded-[1.6rem] border border-border bg-primary">
      <Heading className="text-[1.8rem] font-bold text-text-secondary mb-[1.6rem]">
        Budget Breakdown
      </Heading>

      <div className="grid grid-cols-1 gap-[1.6rem]">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-primary border border-border rounded-[2rem] p-[2.4rem] overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-[1.6rem]">
              <div className="flex flex-col gap-[0.4rem]">
                <div className="flex items-center gap-[0.8rem]">
                  <Text className="text-[1.8rem] font-bold text-text-secondary leading-none">
                    {category.name}
                  </Text>
                  <span className="px-[0.8rem] py-[0.2rem] border border-border rounded-full text-[1rem] text-text-primary/60 font-bold tracking-wider">
                    {category.tag}
                  </span>
                </div>
                <Text className="text-[1.2rem] text-text-primary/60 font-medium">
                  £{category.spent.toFixed(2)} of £
                  {category.allocated.toFixed(2)} allocated
                </Text>
              </div>
              <div className="text-right">
                <Text className="text-[2rem] font-bold text-text-secondary leading-none">
                  {category.percentageUsed}%
                </Text>
                <Text className="text-[1.2rem] text-text-primary/40 font-bold tracking-widest mt-[0.4rem]">
                  used
                </Text>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-[1.6rem] relative pt-[0.4rem]">
              <div className="w-full h-[1.2rem] bg-input-filled rounded-full relative">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-500 relative",
                    category.status === "active" &&
                      "bg-gradient-to-r from-brand-primary to-brand-secondary",
                    category.status === "warning" &&
                      "bg-gradient-to-r from-brand-primary to-brand-secondary",
                    category.status === "critical" &&
                      "bg-gradient-to-r from-brand-primary to-brand-secondary",
                  )}
                  style={{ width: `${category.percentageUsed}%` }}
                >
                  {/* Bee Icon at the end of progress */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
                    <img
                      src={icons.beeYellowRight}
                      alt="bee"
                      className="w-[2.4rem] h-[2.4rem] object-contain drop-shadow-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center pt-[0.8rem]">
              <Text className="text-[1.2rem] text-text-primary/60 font-medium">
                £{category.remaining.toFixed(2)} remaining
              </Text>
              <button
                onClick={() => onViewDetails(category)}
                className="text-[1.6rem] font-bold text-text-secondary hover:text-brand-primary transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
