"use client";

import ImageComponent from "next/image";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import Heading from "../../../../ui/Heading";
import Text from "../../../../ui/Text";
import LinkExternalIcon from "../../../../../assets/icons/LinkExternalIcon";
import { ArrowUpCircle } from "../../../../../assets/icons/ArrowUpCircle";
import ClockIcon from "../../../../../assets/icons/ClockIcon";

interface BudgetStatsProps {
  stats: {
    monthlyBudget: number;
    totalSpent: number;
    remaining: number;
    percentageUsed: number;
    savedThisMonth: number;
    savingsPercentage: number;
    avgSpending: number;
    perWeek: number;
    perDay: number;
    projectedSpend: number;
    daysRemaining: number;
  };
  onAdjustBudget: () => void;
}

export default function BudgetStats({
  stats,
  onAdjustBudget,
}: BudgetStatsProps) {
  const icons = useSupabaseIcons();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-[1.6rem]">
      {/* Monthly Budget Card */}
      <div className="bg-primary border border-border rounded-[2rem] p-[2.4rem] flex flex-col justify-between h-full min-h-[16rem]">
        <div className="mb-[2.4rem]">
          <Text className="text-[1.4rem] text-text-primary font-medium mb-[0.4rem]">
            Monthly Budget
          </Text>
          <Heading className="text-[3.2rem] font-bold text-text-secondary leading-none">
            £
            {stats.monthlyBudget.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Heading>
        </div>

        <div>
          <div className="flex justify-between items-center mb-[0.8rem]">
            <div className="flex flex-col">
              <Text className="text-[1.4rem] text-text-primary tracking-wider">
                Total Spent
              </Text>
            </div>
            <Text className="text-[1.4rem] text-text-secondary">
              £{stats.totalSpent.toFixed(2)}
            </Text>
          </div>

          <div className="relative w-full h-[1.2rem] bg-input-filled rounded-full overflow-hidden mb-[0.8rem]">
            <div
              className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary transition-all duration-500"
              style={{ width: `${stats.percentageUsed}%` }}
            />
          </div>

          <div className="flex justify-between items-center">
            <Text className="text-[1.2rem] text-text-primary font-bold">
              {stats.percentageUsed.toFixed(1)}% used
            </Text>
            <Text className="text-[1.2rem] text-text-primary font-medium">
              £{stats.remaining.toFixed(2)} remaining
            </Text>
          </div>
        </div>

        <button
          onClick={onAdjustBudget}
          className="text-[1.2rem] text-left mt-[1.6rem] font-medium text-brand-primary hover:opacity-80 transition-opacity"
        >
          Adjust Budget
        </button>
      </div>

      {/* Saved This Month Card */}
      <div className="bg-primary border border-border rounded-[2rem] p-[2.4rem] flex flex-col h-full min-h-[16rem] lg:col-span-1">
        <div className="flex items-center gap-[1.2rem] mb-[3.8rem]">
          <div className="w-[4.8rem] h-[4.8rem] rounded-[1.2rem] flex items-center justify-center bg-text-secondary/5">
            <ArrowUpCircle color="var(--text-secondary)" size={24} />
          </div>
          <div>
            <Text className="text-[1.4rem] text-text-primary font-medium mb-[0.4rem]">
              Saved This Month
            </Text>
            <Heading className="text-[2rem] lg:text-[2.4rem] font-bold text-text-secondary">
              £{stats.savedThisMonth.toFixed(2)}
            </Heading>
          </div>
        </div>

        <div className="border-t border-border pt-[1.6rem]">
          <div className="flex justify-between items-center mb-[0.8rem]">
            <Text className="text-[1.2rem] text-text-primary font-medium tracking-tight">
              Budget remaining
            </Text>
            <Text className="text-[1.2rem] font-bold text-text-secondary">
              {stats.savingsPercentage}.0%
            </Text>
          </div>
          <div className="w-full h-[1.2rem] bg-input-filled rounded-full overflow-hidden mb-[1.2rem]">
            <div
              className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary transition-all duration-500"
              style={{ width: `${stats.savingsPercentage}%` }}
            />
          </div>
          <div className="flex items-center gap-[0.6rem] text-text-primary font-medium text-[1.2rem]">
            <ImageComponent
              src={icons.checkMark}
              alt="spending"
              width={10}
              height={10}
              className="brightness-80"
            />
            Under budget this month
          </div>
        </div>
      </div>

      {/* Avg Spending Card */}
      <div className="bg-primary border border-border rounded-[2rem] p-[2.4rem] flex flex-col h-full min-h-[16rem] lg:col-span-1">
        <div className="flex items-center gap-[1.2rem] mb-[2rem]">
          <div className="w-[4.8rem] h-[4.8rem] rounded-[1.2rem] flex items-center justify-center bg-cyan-100/5">
            <LinkExternalIcon color="var(--cyan-100)" size={24} />
          </div>
          <div>
            <Text className="text-[1.4rem] text-text-primary font-medium mb-[0.4rem]">
              Avg Spending
            </Text>
            <Heading className="text-[2rem] lg:text-[2.4rem] font-bold text-text-secondary">
              £{stats.avgSpending.toFixed(2)}
            </Heading>
          </div>
        </div>

        <div className="border-t border-border pt-[1.6rem] mt-auto space-y-[0.8rem]">
          <div className="flex justify-between items-center">
            <Text className="text-[1.4rem] text-text-primary font-medium">
              Per week
            </Text>
            <Text className="text-[1.4rem] font-bold text-text-secondary">
              £{stats.perWeek.toFixed(2)}
            </Text>
          </div>
          <div className="flex justify-between items-center">
            <Text className="text-[1.4rem] text-text-primary font-medium">
              Per day
            </Text>
            <Text className="text-[1.4rem] font-bold text-text-secondary">
              £{stats.perDay.toFixed(2)}
            </Text>
          </div>
          <Text className="text-[1.4rem] text-text-primary font-medium pt-[0.4rem] block">
            Based on current usage pattern
          </Text>
        </div>
      </div>

      {/* Projected end of month spend section */}
      <div className="bg-primary border border-border rounded-[2rem] p-[2.4rem] flex flex-col h-full min-h-[16rem] lg:col-span-1">
        <div className="flex items-center gap-[1.2rem] mb-[2rem]">
          <div className="w-[4.8rem] h-[4.8rem] rounded-[1.2rem] flex items-center justify-center bg-purple-110/5">
            <ClockIcon color="var(--purple-110)" size={24} />
          </div>
          <div>
            <Text className="text-[1.4rem] text-text-primary font-medium mb-[0.4rem]">
              Projected End-of-Month Spend
            </Text>
            <Heading className="text-[2rem] lg:text-[2.4rem] font-bold text-text-secondary">
              £{stats.projectedSpend.toFixed(2)}
            </Heading>
          </div>
        </div>

        <div className="border-t border-border pt-[1.6rem] mt-auto space-y-[0.8rem]">
          <div className="flex justify-between items-center">
            <Text className="text-[1.4rem] text-text-primary font-medium">
              Daily average
            </Text>
            <Text className="text-[1.4rem] font-bold text-text-secondary">
              £{stats.perDay.toFixed(2)}
            </Text>
          </div>
          <div className="flex justify-between items-center">
            <Text className="text-[1.4rem] text-text-primary font-medium">
              Days remaining
            </Text>
            <Text className="text-[1.4rem] font-bold text-text-secondary">
              {stats.daysRemaining}
            </Text>
          </div>
          <Text className="text-[1.4rem] text-text-primary font-medium pt-[0.4rem] block">
            Based on current usage
          </Text>
        </div>
      </div>
    </div>
  );
}
