"use client";

import Heading from "../../../../ui/Heading";
import Text from "../../../../ui/Text";
import Button from "../../../../ui/Button";
import ImageComponent from "next/image";
import { cn } from "../../../../../lib/utils";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import BotIcon from "../../../../../assets/icons/BotIcon";
import { TeamUsageData, UsageMetric } from "../hooks/useUsageSettings";

interface TeamUsageProps {
  data: TeamUsageData;
}

const TeamMetricCard = ({
  metric,
  unit,
}: {
  metric: UsageMetric;
  unit: string;
}) => {
  const icons = useSupabaseIcons();

  return (
    <div className="">
      <Heading className="mb-[1rem] text-[1.8rem]">
        {metric.name.split(" ")[0]} {unit}
      </Heading>
      <div className="bg-primary border border-border rounded-[1.6rem] p-[2.4rem] flex flex-col gap-[2.4rem] flex-1">
        <div className="flex justify-between items-center text-[1.4rem] font-bold text-text-primary">
          <span>Active {unit}</span>
          <span>Limit</span>
        </div>

        <div className="flex justify-between items-end leading-none">
          <Heading className="text-[4rem] font-bold text-text-secondary">
            {metric.used}
          </Heading>
          <Heading className="text-[4rem] font-bold text-text-secondary">
            {metric.total}
          </Heading>
        </div>

        <div className="relative h-[0.8rem] bg-input-filled rounded-full">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand-secondary to-brand-primary rounded-full transition-all duration-1000 ease-out flex items-center justify-end"
            style={{ width: `${metric.percentage}%` }}
          >
            {/* Progress Pointer (Bee Icon) */}
            <div className="absolute right-0 translate-x-[50%] -top-[1.2rem]">
              <ImageComponent
                src={icons.beeGreenRight}
                alt="progress"
                width={24}
                height={24}
                className="drop-shadow-sm"
              />
            </div>
          </div>
        </div>

        <Text className="text-[1.2rem] text-text-primary font-medium">
          {metric.used} of {metric.total} {unit.toLowerCase()} used
        </Text>
      </div>
    </div>
  );
};

export default function TeamUsage({ data }: TeamUsageProps) {
  return (
    <div className="bg-primary border border-border rounded-[2rem] p-[2.4rem] flex flex-col gap-[3.2rem]">
      {/* Section Header */}
      <div className="flex items-center gap-[1.2rem]">
        <div className="w-[4.4rem] h-[4.4rem] bg-input-filled rounded-[1.2rem] flex items-center justify-center">
          <BotIcon size={24} color="var(--text-primary)" />
        </div>
        <Heading className="text-[1.8rem] font-bold text-text-secondary">
          Team Usage
        </Heading>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[2rem]">
        <TeamMetricCard metric={data.users} unit="Seats" />
        <TeamMetricCard metric={data.aiAssistants} unit="Assistants" />
      </div>

      <Button
        variant="ghost"
        className="mt-[0.8rem] border border-brand-primary px-[1.6rem] py-[0.8rem] h-auto text-[1.4rem] font-bold text-brand-primary hover:bg-input-filled transition-colors w-fit"
      >
        Upgrade Plan
      </Button>
    </div>
  );
}
