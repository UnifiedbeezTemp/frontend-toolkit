import React from "react";
import ChevronDownIcon from "../../../assets/icons/ChevronDownIcon";
import SmartDropdown from "../../smart-dropdown/SmartDropdown";
import { DropdownItem } from "../../smart-dropdown/DropdownItem";
import { ChartType, TimeRange, MetricCategory } from "../types";
import Text from "../../ui/Text";

interface ChartTypeOption {
  type: ChartType;
  icon: React.ReactNode;
}

interface SalesTrendsToolbarProps {
  chartType: ChartType;
  timeRange: TimeRange;
  timeRanges: readonly string[];
  chartTypeOptions: ChartTypeOption[];
  selectedMetric: MetricCategory;
  metricCategories: MetricCategory[];
  isMetricOpen: boolean;
  metricTriggerRef: React.RefObject<HTMLButtonElement | null>;
  onChartTypeChange: (type: ChartType) => void;
  onTimeRangeChange: (range: TimeRange) => void;
  onToggleMetric: () => void;
  onCloseMetric: () => void;
  onSelectMetric: (value: string) => void;
}

export default function SalesTrendsToolbar({
  chartType,
  timeRange,
  timeRanges,
  chartTypeOptions,
  selectedMetric,
  metricCategories,
  isMetricOpen,
  metricTriggerRef,
  onChartTypeChange,
  onTimeRangeChange,
  onToggleMetric,
  onCloseMetric,
  onSelectMetric,
}: SalesTrendsToolbarProps) {
  return (
    <div className="flex items-center justify-between px-[1rem] sm:px-[2rem] py-[1.2rem] flex-wrap gap-[1rem]">
      {/* Chart Type Icons */}
      <div className="flex items-center gap-[0.4rem] rounded-[0.8rem] p-[0.4rem]">
        <Text>Chart:</Text>
        {chartTypeOptions.map((option) => (
          <button
            key={option.type}
            onClick={() => onChartTypeChange(option.type)}
            className={`p-[0.6rem] rounded-[0.6rem] transition-colors border border-input-stroke cursor-pointer ${
              chartType === option.type
                ? "bg-input-filled text-input-stroke"
                : "text-input-stroke hover:bg-input-filled"
            }`}
          >
            {option.icon}
          </button>
        ))}
      </div>

      {/* Metric + Time Range */}
      <div className="flex items-center gap-[1.2rem] flex-wrap">
        {/* Metric Dropdown */}
        <div className="flex items-center gap-[0.6rem]">
          <span className="text-[1.4rem] text-text-primary">Metric:</span>
          <div className="relative">
            <button
              ref={metricTriggerRef}
              onClick={onToggleMetric}
              className="flex items-center gap-[0.6rem] px-[1.2rem] py-[0.6rem] border border-input-stroke rounded-[0.8rem] hover:scale-90 transition-all cursor-pointer"
            >
              <span className="text-[1.4rem] text-text-secondary font-bold">
                {selectedMetric.label}
              </span>
              <ChevronDownIcon
                className={`w-[1.6rem] h-[1.6rem] text-text-primary transition-transform ${
                  isMetricOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <SmartDropdown
              isOpen={isMetricOpen}
              onClose={onCloseMetric}
              triggerRef={metricTriggerRef}
              placement="bottom-end"
              maxHeight="20rem"
              className="!w-[20rem]"
            >
              {metricCategories.map((metric) => (
                <DropdownItem
                  key={metric.value}
                  onClick={() => onSelectMetric(metric.value)}
                  className={
                    selectedMetric.value === metric.value
                      ? "bg-input-filled font-bold"
                      : ""
                  }
                >
                  <span className="text-[1.4rem]">{metric.label}</span>
                </DropdownItem>
              ))}
            </SmartDropdown>
          </div>
        </div>

        <div className="flex items-center gap-[0.4rem] border border-input-stroke rounded-[0.8rem] overflow-hidden">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => onTimeRangeChange(range as TimeRange)}
              className={`px-[1rem] border-r border-border py-[0.4rem] last:border-0 text-[1.2rem] font-bold transition-colors cursor-pointer ${
                timeRange === range
                  ? "bg-input-filled text-text-primary"
                  : "text-text-primary bg-primary hover:bg-input-filled"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
