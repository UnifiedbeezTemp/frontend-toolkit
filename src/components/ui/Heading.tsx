import React from "react";
import { cn } from "../../lib/utils";

/**
 * REUSABLE HEADING COMPONENT
 *
 * USAGE:
 * <Heading>Basic heading (h2, medium)</Heading>
 * <Heading as="h1" size="2xl" align="center">Main Title</Heading>
 * <Heading size="sm" className="text-brand-primary">Subtitle</Heading>
 *
 * PROPS:
 * - as: h1 | h2 | h3 | h4 | h5 | h6 (default: h2)
 * - size: xs | sm | md | lg | xl | 2xl | 3xl (default: md)
 * - align: left | center | right (default: left)
 * - className: Add custom styles
 * - style: CSS custom styles
 * - children: Heading text
 *
 * DEFAULTS:
 * - Font weight: 700 (bold)
 * - Color: text-text-secondary
 * - Fully customizable via className
 */

interface HeadingProps {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  align?: "left" | "center" | "right";
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const sizeClasses = {
  xs: "text-[1.4rem]",
  sm: "text-[1.6rem]",
  md: "text-[2rem]",
  lg: "text-[2.4rem]",
  xl: "text-[3.2rem]",
  "2xl": "text-[4rem]",
  "3xl": "text-[4.8rem]",
};

const alignClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export default function Heading({
  as: Component = "h2",
  size = "md",
  align = "left",
  children,
  className,
  style,
}: HeadingProps) {
  return (
    <Component
      className={cn(
        "font-[700] text-text-secondary",
        sizeClasses[size],
        alignClasses[align],
        className,
        style,
      )}
    >
      {children}
    </Component>
  );
}
