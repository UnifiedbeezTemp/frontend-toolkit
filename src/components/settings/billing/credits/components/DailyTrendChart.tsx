"use client";

import { cn } from "../../../../../lib/utils";
import Heading from "../../../../ui/Heading";
import Text from "../../../../ui/Text";
import { DailyTrendDataPoint } from "../hooks/useCreditSettings";

interface DailyTrendChartProps {
  data: DailyTrendDataPoint[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function DailyTrendChart({
  data,
  activeFilter,
  onFilterChange,
}: DailyTrendChartProps) {
  const filters = ["Overview", "AI Agent", "Automation Tasks"];

  return (
    <div className="bg-primary border border-border rounded-[2rem] p-[2.4rem]">
      {/* Header & Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-[1.6rem] mb-[3.2rem]">
        <Heading className="text-[1.8rem] font-bold text-text-secondary">
          Daily Usage Trend
        </Heading>

        <div className="flex bg-input-filled/50 p-[0.4rem] rounded-full overflow-x-auto max-w-full">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => onFilterChange(filter)}
              className={cn(
                "px-[1.6rem] py-[0.6rem] rounded-full text-[1.2rem] font-bold transition-all whitespace-nowrap",
                activeFilter === filter
                  ? "bg-primary text-text-secondary shadow-sm"
                  : "text-text-primary hover:text-text-secondary",
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Legend & Chart Area */}
      <div className="relative w-[]">
        {/* Legend */}
        <div className="flex items-center gap-[2.4rem] mb-[2.4rem]">
          <div className="flex items-center gap-[0.8rem]">
            <div className="w-[0.8rem] h-[0.8rem] rounded-full bg-brand-primary" />
            <Text className="text-[1.2rem] text-text-primary font-medium">
              Credit 1
            </Text>
          </div>
          <div className="flex items-center gap-[0.8rem]">
            <div className="w-[0.8rem] h-[0.8rem] rounded-full bg-brand-primary/40" />
            <Text className="text-[1.2rem] text-text-primary font-medium">
              Credit 2
            </Text>
          </div>
          <div className="flex items-center gap-[0.8rem]">
            <div className="w-[0.8rem] h-[0.8rem] rounded-full bg-brand-primary/10" />
            <Text className="text-[1.2rem] text-text-primary font-medium">
              Total
            </Text>
          </div>
        </div>

        {/* Y-Axis Labels */}
        <div className="absolute left-0 bottom-[3.2rem] top-0 flex flex-col justify-between py-[0.4rem] text-[1.1rem] text-text-primary/40 font-bold z-10 w-[3rem]">
          <span>1.5</span>
          <span>1.25</span>
          <span>1</span>
          <span>0.75</span>
          <span>0.5</span>
          <span>0.25</span>
        </div>

        {/* Chart Container */}
        <div className="ml-[4rem]">
          <div className="relative h-[24rem] group/chart">
            {/* Horizontal Grid Lines */}
            <div className="absolute inset-x-0 bottom-[3.2rem] top-0 flex flex-col justify-between pointer-events-none">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-full border-t border-border/20" />
              ))}
            </div>

            {/* Bars Area */}
            <div className="absolute inset-x-0 bottom-[3.2rem] top-0 flex justify-between items-end gap-[0.8rem]">
              {data.map((item, index) => {
                const maxVal = 1.5;
                const h1 = (item.credit1 / maxVal) * 100;
                const h2 = (item.credit2 / maxVal) * 100;
                const h3 = (item.totalSegment / maxVal) * 100;
                const totalH = h1 + h2 + h3;

                return (
                  <div
                    key={index}
                    className="group relative flex-1 flex flex-col items-center max-w-[4rem] sm:min-w-[2.4rem] h-full justify-end"
                  >
                    {/* The Stacked Bar */}
                    <div
                      className="w-full flex flex-col justify-end overflow-hidden rounded-t-[0.4rem]"
                      style={{ height: `${totalH}%` }}
                    >
                      {/* Top Segment (Lightest Green - Total) */}
                      <div
                        className="w-full bg-brand-primary/10 transition-all duration-500 rounded-t-[1rem] mb-[-1rem]"
                        style={{ height: `${(h3 / totalH) * 100}%` }}
                      />
                      {/* Middle Segment (Mid Green - Credit 2) */}
                      <div
                        className="w-full bg-primary-40 transition-all rounded-t-[1rem] duration-500 mb-[-1rem]"
                        style={{ height: `${(h2 / totalH) * 100}%` }}
                      />
                      {/* Bottom Segment (Solid Green - Credit 1) */}
                      <div
                        className="w-full bg-brand-primary transition-all rounded-t-[1rem] duration-500"
                        style={{ height: `${(h1 / totalH) * 100}%` }}
                      />
                    </div>

                    {/* Tooltip */}
                    <div className="absolute bottom-[100%] left-1/2 -translate-x-1/2 mb-[1.2rem] bg-primary border border-border shadow-2xl rounded-[1.2rem] p-[1.6rem] w-[16.4rem] opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50">
                      <Text className="text-[1.2rem] font-bold text-text-secondary mb-[1.2rem] block text-left">
                        {item.label}
                      </Text>
                      <div className="space-y-[0.8rem]">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-[0.6rem]">
                            <div className="w-[0.6rem] h-[0.6rem] rounded-full bg-brand-primary" />
                            <span className="text-[1rem] text-text-primary font-bold uppercase">
                              Credit 1
                            </span>
                          </div>
                          <span className="text-[1.2rem] text-text-secondary font-bold">
                            {item.credit1.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-[0.6rem]">
                            <div className="w-[0.6rem] h-[0.6rem] rounded-full bg-brand-primary/40" />
                            <span className="text-[1rem] text-text-primary font-bold uppercase">
                              Credit 2
                            </span>
                          </div>
                          <span className="text-[1.2rem] text-text-secondary font-bold">
                            {item.credit2.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-[0.6rem]">
                            <div className="w-[0.6rem] h-[0.6rem] rounded-full bg-brand-primary/10" />
                            <span className="text-[1rem] text-text-primary font-bold uppercase">
                              Total
                            </span>
                          </div>
                          <span className="text-[1.2rem] text-text-secondary font-bold">
                            {item.totalSegment.toFixed(2)}
                          </span>
                        </div>
                        <div className="pt-[0.8rem] border-t border-border flex items-center justify-between">
                          <span className="text-[1rem] text-text-primary font-bold uppercase">
                            Grand Total
                          </span>
                          <span className="text-[1.2rem] text-text-secondary font-bold text-brand-secondary">
                            {(
                              item.credit1 +
                              item.credit2 +
                              item.totalSegment
                            ).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* X-Axis Label */}
                    <div className="absolute -bottom-[2.4rem] left-0 right-0 text-center text-[1rem] text-text-primary/40 font-bold whitespace-nowrap">
                      {item.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
