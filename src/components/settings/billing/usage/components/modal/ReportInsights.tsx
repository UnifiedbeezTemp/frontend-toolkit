"use client";

import Heading from "../../../../../ui/Heading";
import Text from "../../../../../ui/Text";
import { ReportInsight } from "../../hooks/useUsageSettings";

interface ReportInsightsProps {
  insights: ReportInsight[];
}

export default function ReportInsights({ insights }: ReportInsightsProps) {
  return (
    <div className="p-[2rem] border border-border rounded-[1.6rem] bg-input-filled mt-[1.6rem]">
      <Heading className="text-[1.4rem] font-bold text-text-secondary mb-[1.6rem]">
        Usage Insights & Recommendations
      </Heading>
      <div className="flex flex-col gap-[1.2rem]">
        {insights.map((insight, index) => (
          <div key={index} className="flex gap-[1.2rem] items-start">
            <div
              className="w-[0.8rem] h-[0.8rem] rounded-full mt-[0.6rem] shrink-0"
              style={{ backgroundColor: insight.color }}
            />
            <Text className="text-[1.2rem] text-text-primary font-medium leading-relaxed">
              {insight.content}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
}
