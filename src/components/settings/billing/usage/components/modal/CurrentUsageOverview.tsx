"use client";

import Heading from "../../../../../ui/Heading";
import Text from "../../../../../ui/Text";
import Image from "next/image";
import { useSupabaseIcons } from "../../../../../../lib/supabase/useSupabase";
import { UsageMetric } from "../../hooks/useUsageSettings";

interface CurrentUsageOverviewProps {
  usage: UsageMetric;
}

export default function CurrentUsageOverview({
  usage,
}: CurrentUsageOverviewProps) {
  const icons = useSupabaseIcons();
  const remaining = usage.total - usage.used;

  return (
    <div className="p-[2rem] border border-border rounded-[1.6rem] bg-white">
      <div className="flex justify-between items-start mb-[1.2rem]">
        <div className="flex flex-col gap-[0.4rem]">
          <Text className="text-[1.2rem] text-text-primary font-bold">
            Current Usage
          </Text>
          <Heading className="text-[1.6rem] font-bold text-text-secondary">
            {usage.used.toLocaleString()} of {usage.total.toLocaleString()}{" "}
            messages
          </Heading>
        </div>
        <div className="flex flex-col gap-[0.4rem] text-right">
          <Text className="text-[1.2rem] text-text-primary font-bold">
            Remaining
          </Text>
          <Heading className="text-[1.6rem] font-bold text-warning">
            {remaining.toLocaleString()} messages
          </Heading>
        </div>
      </div>

      <div className="relative h-[0.8rem] bg-input-filled rounded-full mb-[1.2rem]">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand-secondary to-brand-primary rounded-full"
          style={{ width: `${usage.percentage}%` }}
        >
          <div className="absolute right-0 translate-x-[50%] -top-[1.2rem]">
            <Image
              src={icons.beeGreenRight}
              alt="progress"
              width={24}
              height={24}
            />
          </div>
        </div>
      </div>

      {usage.estimate && (
        <Text className="text-[1.2rem] text-text-primary">
          {usage.estimate}
        </Text>
      )}
    </div>
  );
}
