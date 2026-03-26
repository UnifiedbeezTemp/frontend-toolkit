"use client";

import Heading from "../../../../ui/Heading";
import Text from "../../../../ui/Text";
import { UsageBreakdownItem } from "../hooks/useCreditSettings";

interface UsageBreakdownProps {
  items: UsageBreakdownItem[];
}

export default function UsageBreakdown({ items }: UsageBreakdownProps) {
  return (
    <div className="bg-primary border border-border rounded-[2rem] p-[2.4rem] mt-[1.6rem]">
      <Heading className="text-[1.8rem] font-bold text-text-secondary mb-[2.4rem]">
        Usage Breakdown
      </Heading>

      <div className="space-y-[2.4rem]">
        {items.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-[1.2rem]">
              <div className="flex items-center gap-[1rem]">
                <div
                  className="w-[1rem] h-[1rem] rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <Text className="text-[1.4rem] font-bold text-text-secondary">
                  {item.name}
                </Text>
              </div>
              <div className="text-right">
                <Text className="text-[1.4rem] font-bold text-text-secondary leading-none">
                  {item.value.toLocaleString()}
                </Text>
                <Text className="text-[1.1rem] text-text-primary/40 font-bold mt-[0.2rem]">
                  {item.percentage}%
                </Text>
              </div>
            </div>

            <div className="w-full h-[0.8rem] bg-input-filled rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-500"
                style={{
                  backgroundColor: item.color,
                  width: `${item.percentage}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
