"use client";

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { ChartType, ChartDataPoint } from "../types";
import {
  CHART_COLORS,
  CHART_AXIS_STYLE,
  CHART_MARGINS,
} from "../utils/chartConfig";
import { CustomTooltip } from "./SalesTrendsTooltip";

interface SalesTrendsChartProps {
  chartType: ChartType;
  data: ChartDataPoint[];
}

export default function SalesTrendsChart({
  chartType,
  data,
}: SalesTrendsChartProps) {
  const commonXAxisProps = {
    dataKey: "month" as const,
    tick: CHART_AXIS_STYLE,
    axisLine: { stroke: CHART_COLORS.grid },
    tickLine: false,
  };

  const commonYAxisProps = {
    tick: CHART_AXIS_STYLE,
    axisLine: false,
    tickLine: false,
    tickFormatter: (value: number) => value.toLocaleString(),
  };

  const gridProps = {
    strokeDasharray: "3 3",
    stroke: CHART_COLORS.grid,
    vertical: false,
  };

  return (
    <div className="sm:px-[2rem] pb-[2rem] pt-[1rem]">
      <div className="h-[30rem]">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "bar" ? (
            <BarChart data={data} margin={CHART_MARGINS}>
              <CartesianGrid {...gridProps} />
              <XAxis {...commonXAxisProps} />
              <YAxis {...commonYAxisProps} />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="sales"
                fill={CHART_COLORS.bar}
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
              />
            </BarChart>
          ) : chartType === "line" ? (
            <LineChart data={data} margin={CHART_MARGINS}>
              <CartesianGrid {...gridProps} />
              <XAxis {...commonXAxisProps} />
              <YAxis {...commonYAxisProps} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="sales"
                stroke={CHART_COLORS.line}
                strokeWidth={2}
                dot={{ fill: CHART_COLORS.line, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          ) : (
            <AreaChart data={data} margin={CHART_MARGINS}>
              <CartesianGrid {...gridProps} />
              <XAxis {...commonXAxisProps} />
              <YAxis {...commonYAxisProps} />
              <Tooltip content={<CustomTooltip />} />
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor={CHART_COLORS.area}
                    stopOpacity={0.2}
                  />
                  <stop
                    offset="100%"
                    stopColor={CHART_COLORS.area}
                    stopOpacity={0.02}
                  />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="sales"
                stroke={CHART_COLORS.area}
                strokeWidth={2}
                fill="url(#salesGradient)"
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Axis Label */}
      <p className="text-center text-[1.2rem] text-text-primary mt-[0.4rem]">
        Month
      </p>
    </div>
  );
}
