"use client";

import { useSupabaseIcons } from "../../../../../../lib/supabase/useSupabase";
import Heading from "../../../../../ui/Heading";
import Text from "../../../../../ui/Text";

interface BreakdownItem {
  name: string;
  subtext: string;
  amount: number;
  percentage: number;
}

interface BudgetBreakdownListProps {
  items: BreakdownItem[];
}

export default function BudgetBreakdownList({
  items,
}: BudgetBreakdownListProps) {
  const icons = useSupabaseIcons();

  return (
    <div className="border rounded-[1rem] p-[1rem] lg:p-[2.1rem] border-border">
      <Heading className="text-[1.6rem] font-bold text-text-secondary mb-[2rem]">
        Service Breakdown
      </Heading>
      <div className="space-y-[2.4rem]">
        {items.map((item, idx) => (
          <div key={idx} className="space-y-[1.2rem]">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-[0.4rem]">
                <Text className="text-[1.4rem] font-bold text-text-secondary">
                  {item.name}
                </Text>
                <Text className="text-[1.2rem] text-text-primary font-medium">
                  {item.subtext}
                </Text>
              </div>
              <div className="text-right">
                <Text className="text-[1.4rem] font-bold text-text-secondary">
                  £{item.amount.toFixed(2)}
                </Text>
                <Text className="text-[1.2rem] text-text-primary font-medium">
                  {item.percentage.toFixed(1)}%
                </Text>
              </div>
            </div>
            <div className="relative pt-[0.4rem]">
              <div className="w-full h-[1.2rem] bg-input-filled rounded-full relative">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary transition-all duration-500 relative"
                  style={{ width: `${item.percentage}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 scale-90">
                    <img
                      src={icons.beeYellowRight}
                      alt="bee"
                      className="w-[2.4rem] h-[2.4rem] object-contain drop-shadow-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
