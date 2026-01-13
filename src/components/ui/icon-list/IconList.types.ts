import React from "react";

export interface IconItem {
  icon: React.ReactNode;
  href?: string;
  label?: string;
  onClick?: () => void;
}

export interface IconListProps {
  icons: IconItem[];
  layout?: "horizontal" | "vertical" | "grid" | "marquee";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  gap?: "xs" | "sm" | "md" | "lg" | "xl";
  hover?: boolean;
  rounded?: boolean;
  background?: boolean;
  className?: string;
}

export type IconSize = NonNullable<IconListProps["size"]>;
export type IconGap = NonNullable<IconListProps["gap"]>;
export type IconLayout = NonNullable<IconListProps["layout"]>;
