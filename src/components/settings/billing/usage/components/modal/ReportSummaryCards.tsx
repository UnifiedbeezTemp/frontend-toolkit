"use client";

import Heading from "../../../../../ui/Heading";
import Text from "../../../../../ui/Text";
import { cn } from "../../../../../../lib/utils";

interface SummaryItem {
  label: string;
  value: string;
  colorClass: string;
}

interface ReportSummaryCardsProps {
  summaries: SummaryItem[];
}

export default function ReportSummaryCards({
  summaries,
}: ReportSummaryCardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-[1.2rem]">
      {summaries.map((item, index) => (
        <div
          key={index}
          className={cn(
            "p-[1.6rem] rounded-[1.2rem] flex flex-col gap-[0.4rem]",
            item.colorClass,
          )}
        >
          <Text className="text-[1.1rem] text-text-primary font-bold uppercase tracking-wider leading-none">
            {item.label}
          </Text>
          <Heading className="text-[2.4rem] font-bold text-text-secondary leading-tight">
            {item.value}
          </Heading>
          <Text className="text-[1rem] text-text-primary font-medium leading-none">
            usage rate
          </Text>
        </div>
      ))}
    </div>
  );
}
