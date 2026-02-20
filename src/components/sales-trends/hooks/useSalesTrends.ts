import { ChartType, TimeRange, ViewTab, StatCardData } from "../types";
import {
  CHART_DATA,
  METRIC_CATEGORIES,
  STAT_VALUES,
  TIME_RANGES,
  VIEW_TABS,
} from "../utils/salesTrendsData";
import PoundSignIcon from "../../../assets/icons/PoundSignIcon";
import TargetIcon from "../../../assets/icons/TargetIcon";
import UliCart from "../../../assets/icons/UliCart";
import People16Regular from "../../../assets/icons/People16Regular";
import BarChartIcon from "../../../assets/icons/BarChartIcon";
import LineChartIcon from "../../../assets/icons/LineChartIcon";
import AreaChartIcon from "../../../assets/icons/AreaChartIcon";
import React from "react";
import { useCallback, useState, useRef } from "react";

export const useSalesTrends = () => {
  const [activeView, setActiveView] = useState<ViewTab>("sales");
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [timeRange, setTimeRange] = useState<TimeRange>("12m");
  const [selectedMetric, setSelectedMetric] = useState(METRIC_CATEGORIES[0]);
  const [isMetricOpen, setIsMetricOpen] = useState(false);
  const metricTriggerRef = useRef<HTMLButtonElement>(null);

  const handleViewChange = useCallback((view: string | number) => {
    setActiveView(view as ViewTab);
  }, []);

  const handleChartTypeChange = useCallback((type: ChartType) => {
    setChartType(type);
  }, []);

  const handleTimeRangeChange = useCallback((range: TimeRange) => {
    setTimeRange(range);
  }, []);

  const handleMetricSelect = useCallback((value: string) => {
    const metric = METRIC_CATEGORIES.find((m) => m.value === value);
    if (metric) {
      setSelectedMetric(metric);
    }
    setIsMetricOpen(false);
  }, []);

  const toggleMetricDropdown = useCallback(() => {
    setIsMetricOpen((prev) => !prev);
  }, []);

  const closeMetricDropdown = useCallback(() => {
    setIsMetricOpen(false);
  }, []);

  const statCards: StatCardData[] = [
    {
      id: "sales",
      label: "Sales",
      value: STAT_VALUES.sales,
      icon: React.createElement(PoundSignIcon, {
        size: 16,
        color: "var(--brand-primary)",
      }),
      iconBg: "",
      className: "bg-soft-green border-success/50",
    },
    {
      id: "average-sales",
      label: "Average Sales",
      value: STAT_VALUES.averageSales,
      icon: React.createElement(TargetIcon, {
        size: 20,
        color: "var(--primary-blue)",
      }),
      iconBg: "",
      className: "bg-primary-blue/10 border-primary-blue",
    },
    {
      id: "total-orders",
      label: "Total Orders",
      value: STAT_VALUES.totalOrders,
      icon: React.createElement(UliCart, {
        size: 24,
        color: "var(--destructive)",
      }),
      iconBg: "",
      className: "bg-destructive/10 border-destructive",
    },
    {
      id: "total-customers",
      label: "Total Customers",
      value: STAT_VALUES.totalCustomers,
      icon: React.createElement(People16Regular, {
        size: 22,
        color: "var(--warning)",
      }),
      iconBg: "",
      className: "bg-warning/10 border-warning",
    },
  ];

  const chartTypeOptions = [
    {
      type: "bar" as const,
      icon: React.createElement(BarChartIcon, { size: 18 }),
    },
    {
      type: "line" as const,
      icon: React.createElement(LineChartIcon, { size: 18 }),
    },
    {
      type: "area" as const,
      icon: React.createElement(AreaChartIcon, { size: 18 }),
    },
  ];

  const viewTabs = VIEW_TABS.map((tab) => ({
    label: tab.label,
    value: tab.value,
  }));

  return {
    activeView,
    viewTabs,
    chartType,
    timeRange,
    chartData: CHART_DATA,
    statCards,
    chartTypeOptions,
    timeRanges: TIME_RANGES,
    metricCategories: METRIC_CATEGORIES,
    selectedMetric,
    isMetricOpen,
    metricTriggerRef,
    handleViewChange,
    handleChartTypeChange,
    handleTimeRangeChange,
    handleMetricSelect,
    toggleMetricDropdown,
    closeMetricDropdown,
  };
};
