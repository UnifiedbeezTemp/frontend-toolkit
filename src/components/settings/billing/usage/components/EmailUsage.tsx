"use client";

import Heading from "../../../../ui/Heading";
import Text from "../../../../ui/Text";
import UsageStatusBar from "./UsageStatusBar";
import OutlineMail from "../../../../../assets/icons/OutlineMail";
import { EmailUsageData } from "../hooks/useUsageSettings";
import Button from "../../../../ui/Button";
import { cn } from "../../../../../lib/utils";

interface EmailUsageProps {
  data: EmailUsageData;
  onBuyMore: () => void;
}

export default function EmailUsage({ data, onBuyMore }: EmailUsageProps) {
  const maxSends = Math.max(...data.dailySends.map((d) => d.value));

  return (
    <div className="bg-primary border border-border rounded-[2rem] p-[2.4rem] flex flex-col gap-[3.2rem]">
      {/* Section Header */}
      <div className="flex items-center gap-[1.2rem]">
        <div className="w-[4.4rem] h-[4.4rem] bg-input-filled rounded-[1.2rem] flex items-center justify-center">
          <OutlineMail size={24} color="var(--text-primary)" />
        </div>
        <Heading className="text-[1.8rem] font-bold text-text-secondary">
          Email Usage
        </Heading>
      </div>

      {/* Monthly Email Sends */}
      <div>
        <UsageStatusBar
          name={data.monthlySends.name}
          used={data.monthlySends.used}
          total={data.monthlySends.total}
          percentage={data.monthlySends.percentage}
          avgPerDay={data.avgPerDay}
        />
        <div className="mt-[-2rem] flex items-center gap-[0.6rem] text-[1.1rem] font-bold uppercase tracking-wider text-text-primary">
          <span>Projected end-of-month:</span>
          <span className="text-text-secondary">
            {data.projectedTotal.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Daily Email Sends Chart */}
      <div className="p-[2.4rem] rounded-[1.2rem] border border-border bg-primary/30 relative overflow-hidden">
        <div className="flex justify-between items-center mb-[2.4rem]">
          <Heading className="text-[1.4rem] font-bold text-text-secondary">
            Daily Email Sends (Last 28 Days)
          </Heading>
        </div>

        <div className="relative h-[12rem] w-full group/chart">
          {/* Subtle Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            <div className="w-full border-t border-border/5" />
            <div className="w-full border-t border-border/5" />
            <div className="w-full border-t border-border/5" />
            <div className="w-full border-t border-border/5" />
          </div>

          <div className="relative h-full w-full flex items-end justify-between gap-[0.2rem]">
            {data.dailySends.map((item, index) => {
              const heightPercentage = (item.value / maxSends) * 100;
              const isWeekend = item.isWeekend;

              return (
                <div
                  key={index}
                  className="relative flex-1 group/bar cursor-pointer h-full flex flex-col justify-end"
                >
                  <div
                    className={cn(
                      "w-full rounded-t-[0.2rem] transition-all duration-300",
                      isWeekend
                        ? "bg-primary-40 hover:bg-primary-40/80"
                        : "bg-brand-primary hover:bg-brand-primary/80",
                    )}
                    style={{ height: `${heightPercentage}%` }}
                  />

                  {/* Simplified Tooltip */}
                  <div className="absolute -top-[3.5rem] left-1/2 -translate-x-1/2 bg-text-secondary text-primary px-[0.8rem] py-[0.4rem] rounded-[0.6rem] text-[1.1rem] font-bold opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-xl border border-border/10">
                    {item.value} sends
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* X-Axis dates */}
        <div className="mt-[1.6rem] relative px-[0.4rem] h-[1.2rem] text-[1rem] font-bold text-text-primary leading-none">
          <span className="absolute left-[0.4rem]">
            {data.dailySends[0].label}
          </span>
          <span className="absolute left-1/2 -translate-x-1/2">
            {data.dailySends[Math.floor(data.dailySends.length / 2)].label}
          </span>
          <span className="absolute right-[0.4rem]">
            {data.dailySends[data.dailySends.length - 1].label}
          </span>
        </div>

        {/* Legend */}
        <div className="mt-[3.2rem] flex justify-center items-center gap-[2.4rem]">
          <div className="flex items-center gap-[0.8rem]">
            <div className="w-[1rem] h-[1rem] rounded-[0.2rem] bg-brand-primary" />
            <Text className="text-[1.1rem] text-text-primary font-bold uppercase tracking-wider">
              Weekday
            </Text>
          </div>
          <div className="flex items-center gap-[0.8rem]">
            <div className="w-[1rem] h-[1rem] rounded-[0.2rem] bg-primary-40" />
            <Text className="text-[1.1rem] text-text-primary font-bold uppercase tracking-wider">
              Weekend
            </Text>
          </div>
        </div>
      </div>

      <Button
        variant="ghost"
        className="mt-[0.8rem] border border-brand-primary px-[1.6rem] py-[0.8rem] h-auto text-[1.4rem] font-bold text-brand-primary hover:bg-input-filled transition-colors w-fit"
        onClick={onBuyMore}
      >
        Buy more email sends
      </Button>
    </div>
  );
}
