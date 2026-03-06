"use client";

import Text from "../../../../ui/Text";
import Heading from "../../../../ui/Heading";
import ImageComponent from "next/image";
import { cn } from "../../../../../lib/utils";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import TrendIcon from "../../../../../assets/icons/TrendIcon";

interface UsageStatusBarProps {
  name: string;
  used: number;
  total: number;
  percentage: number;
  estimate?: string;
  avgPerDay?: number;
  className?: string;
}

export default function UsageStatusBar({
  name,
  used,
  total,
  percentage,
  estimate,
  avgPerDay,
  className,
}: UsageStatusBarProps) {
  const icons = useSupabaseIcons();

  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between items-end mb-[1.2rem]">
        <div>
          <Heading className="text-[1.6rem] font-bold text-text-secondary mb-[0.4rem]">
            {name}
          </Heading>
          <Text className="text-[1.2rem] text-text-primary font-medium">
            {used.toLocaleString()} of {total.toLocaleString()} used
          </Text>
        </div>
        <div className="text-right">
          <Text className="text-[2rem] font-bold text-text-secondary leading-none">
            {percentage.toFixed(1)}%
          </Text>
          <Text className="text-[1.2rem] text-text-primary text-right font-bold tracking-wider mt-[0.2rem]">
            used
          </Text>
        </div>
      </div>

      <div className="relative h-[0.8rem] bg-input-filled rounded-full mb-[1.6rem]">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand-secondary to-brand-primary rounded-full transition-all duration-1000 ease-out flex items-center justify-end"
          style={{ width: `${percentage}%` }}
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

      {(estimate || avgPerDay) && (
        <div className="flex justify-between items-center text-[1.4rem] font-bold tracking-wider">
          <div className="flex items-center gap-[0.6rem] text-text-primary">
            {estimate && (
              <>
                <TrendIcon/>
                <span>{estimate}</span>
              </>
            )}
          </div>
          {avgPerDay && (
            <div className="text-text-primary">Avg: {avgPerDay} per day</div>
          )}
        </div>
      )}
    </div>
  );
}
