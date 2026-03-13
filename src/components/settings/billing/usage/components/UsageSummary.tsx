"use client";

import Heading from "../../../../ui/Heading";
import Text from "../../../../ui/Text";
import Button from "../../../../ui/Button";
import { UsageSummaryData } from "../hooks/useUsageSettings";

interface UsageSummaryProps {
  data: UsageSummaryData;
  onViewReport: () => void;
}

export default function UsageSummary({
  data,
  onViewReport,
}: UsageSummaryProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br grad-btn rounded-[2rem] p-[3.2rem] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-[2.4rem]">
      {/* Content */}
      <div className="flex flex-col gap-[2.4rem] max-w-[50rem]">
        <div>
          <Heading className="text-[2rem] font-bold text-white mb-[0.8rem]">
            Usage Summary
          </Heading>
          <Text className="text-[1.4rem] text-white/80 font-medium">
            {data.status}
          </Text>
        </div>

        <div className="flex items-center gap-[4rem]">
          <div className="flex flex-col gap-[0.4rem]">
            <Text className="text-[1.2rem] text-white/60 font-bold tracking-widest">
              Days Remaining
            </Text>
            <Heading className="text-[2.4rem] font-bold text-white">
              {data.daysRemaining}
            </Heading>
          </div>
          <div className="flex flex-col gap-[0.4rem]">
            <Text className="text-[1.2rem] text-white/60 font-bold tracking-widest">
              Month Progress
            </Text>
            <Heading className="text-[2.4rem] font-bold text-white">
              {data.monthProgress}%
            </Heading>
          </div>
        </div>
      </div>

      {/* Action */}
      <Button
        variant="ghost"
        className="bg-white text-brand-primary px-[2.4rem]"
        onClick={onViewReport}
      >
        View Full Report
      </Button>
    </div>
  );
}
