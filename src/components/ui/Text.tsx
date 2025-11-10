import React from "react";
import { cn } from "../../lib/utils";

/**
 * REUSABLE TEXT COMPONENT
 *
 * USAGE:
 * <Text>Basic paragraph text</Text>
 * <Text size="sm" color="muted">Small muted text</Text>
 * <Text as="span" weight="medium" className="underline">Inline text</Text>
 *
 * PROPS:
 * - as: p | span | div (default: p)
 * - size: xs | sm | base | lg | xl (default: base)
 * - weight: normal | medium | semibold | bold (default: normal)
 * - color: primary | muted | brand (default: primary)
 * - align: left | center | right (default: left)
 * - className: Add custom styles
 * - style: CSS custom styles
 * - children: Text content
 *
 * DEFAULTS:
 * - Color: text-text-primary
 * - Align: left
 * - Weight: normal (400)
 */

interface TextProps {
  as?: "p" | "span" | "div";
  size?: "xs" | "sm" | "base" | "lg" | "xl";
  weight?: "normal" | "medium" | "semibold" | "bold";
  color?: "primary" | "muted" | "brand";
  align?: "left" | "center" | "right";
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const sizeClasses = {
  xs: "text-[1.2rem]",
  sm: "text-[1.4rem]",
  base: "text-[1.6rem]",
  lg: "text-[1.8rem]",
  xl: "text-[2rem]",
};

const weightClasses = {
  normal: "font-[400]",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const colorClasses = {
  primary: "text-text-primary",
  muted: "text-text-secondary",
  brand: "text-brand-primary",
};

const alignClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export default function Text({
  as: Component = "p",
  size = "base",
  weight = "normal",
  color = "primary",
  align = "left",
  children,
  className,
  style,
}: TextProps) {
  return (
    <Component
      className={cn(
        sizeClasses[size],
        weightClasses[weight],
        colorClasses[color],
        alignClasses[align],
        className
      )}
      style={style}
    >
      {children}
    </Component>
  );
}
