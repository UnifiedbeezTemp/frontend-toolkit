"use client";

import Heading from "../../../../../ui/Heading";
import Text from "../../../../../ui/Text";

interface BudgetBreakdownStatsProps {
  spent: number;
  allocated: number;
  remaining: number;
  percentageUsed: number;
}

export default function BudgetBreakdownStats({
  spent,
  allocated,
  remaining,
  percentageUsed,
}: BudgetBreakdownStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-[1.6rem]">
      <div className="bg-primary border border-border p-[2.1rem] rounded-[1.6rem]">
        <Text className="text-[1.2rem] text-text-primary/60 font-medium mb-[0.4rem]">
          Total Spent
        </Text>
        <Heading className="text-[2.4rem] font-bold text-text-secondary mb-[0.4rem]">
          £{spent.toFixed(2)}
        </Heading>
        <Text className="text-[1.1rem] text-text-primary font-medium whitespace-nowrap">
          of £{allocated.toFixed(2)} allocated
        </Text>
      </div>
      <div className="bg-primary border border-border p-[2.1rem] rounded-[1.6rem]">
        <Text className="text-[1.2rem] text-text-primary/60 font-medium mb-[0.4rem]">
          Usage Rate
        </Text>
        <Heading className="text-[2.4rem] font-bold text-text-secondary mb-[0.4rem]">
          {percentageUsed.toFixed(1)}%
        </Heading>
        <Text className="text-[1.1rem] text-text-primary font-medium whitespace-nowrap">
          of budget used
        </Text>
      </div>
      <div className="bg-primary border border-border p-[2.1rem] rounded-[1.6rem]">
        <Text className="text-[1.2rem] text-text-primary/60 font-medium mb-[0.4rem]">
          Remaining Budget
        </Text>
        <Heading className="text-[2.4rem] font-bold text-text-secondary mb-[0.4rem]">
          £{remaining.toFixed(2)}
        </Heading>
        <Text className="text-[1.1rem] text-text-primary font-medium whitespace-nowrap">
          available to spend
        </Text>
      </div>
    </div>
  );
}
