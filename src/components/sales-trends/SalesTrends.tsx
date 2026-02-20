"use client";

import React from "react";
import { useSalesTrends } from "./hooks/useSalesTrends";
import SalesTrendsHeader from "./sub-components/SalesTrendsHeader";
import SalesTrendsToolbar from "./sub-components/SalesTrendsToolbar";
import SalesTrendsStats from "./sub-components/SalesTrendsStats";
import SalesTrendsChart from "./sub-components/SalesTrendsChart";

export default function SalesTrends() {
  const {
    activeView,
    viewTabs,
    chartType,
    timeRange,
    chartData,
    metricCategories,
    selectedMetric,
    isMetricOpen,
    metricTriggerRef,
    handleViewChange,
    handleChartTypeChange,
    handleTimeRangeChange,
    handleMetricSelect: onSelectMetric,
    toggleMetricDropdown: onToggleMetric,
    closeMetricDropdown: onCloseMetric,
    statCards,
    chartTypeOptions,
    timeRanges,
  } = useSalesTrends();

  return (
    <div className="flex flex-col w-full lg:mt-[2rem] bg-primary border border-input-stroke rounded-[1.6rem] overflow-hidden">
      <SalesTrendsHeader
        activeView={activeView}
        viewTabs={viewTabs}
        onViewChange={handleViewChange}
      />

      <SalesTrendsToolbar
        chartType={chartType}
        timeRange={timeRange}
        timeRanges={timeRanges}
        chartTypeOptions={chartTypeOptions}
        selectedMetric={selectedMetric}
        metricCategories={metricCategories}
        isMetricOpen={isMetricOpen}
        metricTriggerRef={metricTriggerRef}
        onChartTypeChange={handleChartTypeChange}
        onTimeRangeChange={handleTimeRangeChange}
        onToggleMetric={onToggleMetric}
        onCloseMetric={onCloseMetric}
        onSelectMetric={onSelectMetric}
      />

      <SalesTrendsStats statCards={statCards} />

      <SalesTrendsChart chartType={chartType} data={chartData} />
    </div>
  );
}
