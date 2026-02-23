export const CHART_COLORS = {
  bar: "var(--brand-primary)",
  line: "var(--brand-primary)",
  area: "var(--brand-primary)",
  areaFill: "var(--green-10)",
  grid: "var(--input-stroke)",
  axisText: "var(--text-primary)",
  tooltipBg: "var(--primary)",
  tooltipBorder: "var(--input-stroke)",
} as const;

export const CHART_AXIS_STYLE = {
  fontSize: "1.2rem",
  fontFamily: "SK Modernist, sans-serif",
  fill: "var(--text-primary)",
} as const;

export const CHART_MARGINS = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20,
} as const;
