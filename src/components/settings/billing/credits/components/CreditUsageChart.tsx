"use client";

import { cn } from "../../../../../lib/utils";
import Heading from "../../../../ui/Heading";
import Text from "../../../../ui/Text";
import { ChartDataPoint } from "../hooks/useCreditSettings";

interface CreditUsageChartProps {
  data: ChartDataPoint[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function CreditUsageChart({
  data,
  activeFilter,
  onFilterChange,
}: CreditUsageChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value));
  const filters = ["12M", "6M", "30D", "7D", "24H"];

  return (
    <div className="bg-primary border border-border rounded-[2rem] p-[2.4rem]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-[1.6rem] mb-[3.2rem]">
        <div>
          <Heading className="text-[1.8rem] font-bold text-text-secondary mb-[0.4rem]">
            Credit Usage
          </Heading>
          <Text className="text-[1.2rem] text-text-primary/60 font-medium">
            Track your credit consumption over time
          </Text>
        </div>

        <div className="flex bg-input-filled/50 p-[0.4rem] rounded-full">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => onFilterChange(filter)}
              className={cn(
                "px-[1.6rem] py-[0.6rem] rounded-full text-[1.2rem] font-bold transition-all",
                activeFilter === filter
                  ? "bg-primary text-text-secondary shadow-sm"
                  : "text-text-primary/60 hover:text-text-secondary",
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="relative h-[24rem] sm:w-full mt-[1.2rem]">
        {/* Y-Axis Labels */}
        <div className="absolute left-0 top-0 bottom-[2.4rem] flex flex-col justify-between py-[0.4rem] text-[1rem] text-text-primary/40 font-bold z-10 pr-[1rem] border-r border-border/10">
          {[maxValue, maxValue * 0.75, maxValue * 0.5, maxValue * 0.25, 0].map(
            (val, i) => (
              <span key={i}>{Math.round(val).toLocaleString()}</span>
            ),
          )}
        </div>

        {/* Chart Area */}
        <div className="ml-[4.8rem] h-full flex flex-col">
          <div className="flex-1 flex items-end justify-between gap-[0.8rem] pb-[2.4rem] relative">
            {/* Horizontal Grid Lines */}
            <div className="absolute inset-0 pb-[2.4rem] flex flex-col justify-between pointer-events-none">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="w-full border-t border-border/20" />
              ))}
            </div>

            {data.map((item, index) => {
              const heightPercentage = (item.value / maxValue) * 100;
              return (
                <div
                  key={index}
                  className="group relative flex-1 flex flex-col items-center h-full justify-end"
                >
                  <div
                    className="w-full max-w-[3.2rem] bg-[linear-gradient(120deg,var(--brand-primary)_0%,var(--brand-primary)_70%,var(--brand-secondary)_180%)] rounded-t-[0.6rem] transition-all duration-700 ease-out hover:opacity-80 cursor-pointer relative"
                    style={{ height: `${heightPercentage}%` }}
                  >
                    {/* Tooltip */}
                    <div className="absolute -top-[3.2rem] left-1/2 -translate-x-1/2 bg-text-secondary text-primary px-[0.8rem] py-[0.4rem] rounded-[0.4rem] text-[1rem] font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                      {item.value.toLocaleString()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* X-Axis Labels */}
          <div className="flex justify-between gap-[0.8rem]">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex-1 text-center text-[1rem] text-text-primary/40 font-bold uppercase tracking-wider"
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
