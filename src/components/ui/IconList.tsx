import React from "react";
import { cn } from "../../lib/utils";

/**
 * REUSABLE ICON LIST COMPONENT
 *
 * USAGE:
 * <IconList icons={[
 *   { icon: <WhatsAppIcon />, href: 'https://wa.me/...' },
 *   { icon: <FacebookIcon />, href: 'https://facebook.com/...' }
 * ]} />
 *
 * <IconList
 *   icons={socialIcons}
 *   layout="horizontal"
 *   size="lg"
 *   gap="md"
 * />
 *
 * PROPS:
 * - icons: Array of icon objects (required)
 *   - icon: React.ReactNode - The icon component
 *   - href?: string - Optional link
 *   - label?: string - Accessibility label
 *   - onClick?: () => void - Click handler
 * - layout: horizontal | vertical | grid (default: horizontal)
 * - size: xs | sm | md | lg | xl (default: md)
 * - gap: xs | sm | md | lg | xl (default: md)
 * - hover: boolean - Enable hover effects (default: true)
 * - rounded: boolean - Rounded icon backgrounds (default: false)
 * - background: boolean - Show background behind icons (default: false)
 * - className: string - Add custom styles
 *
 * DEFAULTS:
 * - Horizontal layout
 * - Medium size and spacing
 * - Hover scale effect
 * - Accessible with ARIA labels
 */

export interface IconItem {
  icon: React.ReactNode;
  href?: string;
  label?: string;
  onClick?: () => void;
}

interface IconListProps {
  icons: IconItem[];
  layout?: "horizontal" | "vertical" | "grid";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  gap?: "xs" | "sm" | "md" | "lg" | "xl";
  hover?: boolean;
  rounded?: boolean;
  background?: boolean;
  className?: string;
}

const layoutClasses = {
  horizontal: "flex flex-row items-center",
  vertical: "flex flex-col items-center",
  grid: "grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8",
};

const gapClasses = {
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-3",
  lg: "gap-4",
  xl: "gap-6",
};

const sizeClasses = {
  xs: "w-6 h-6",
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
};

export default function IconList({
  icons,
  layout = "horizontal",
  size = "md",
  gap = "md",
  hover = true,
  rounded = false,
  background = false,
  className = "",
}: IconListProps) {
  const handleIconClick = (iconItem: IconItem, e: React.MouseEvent) => {
    if (iconItem.onClick) {
      e.preventDefault();
      iconItem.onClick();
    }
  };

  const renderIcon = (iconItem: IconItem, index: number) => {
    const iconContent = (
      <div
        className={cn(
          "inline-flex items-center justify-center transition-all duration-200",
          sizeClasses[size],
          hover && "hover:scale-110 active:scale-95 cursor-pointer",
          rounded && "rounded-full",
          background && "bg-primary border border-border shadow-sm",
          background && rounded && "p-2"
        )}
        aria-label={iconItem.label || `Icon ${index + 1}`}
      >
        {iconItem.icon}
      </div>
    );

    if (iconItem.href) {
      return (
        <a
          key={index}
          href={iconItem.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => handleIconClick(iconItem, e)}
          className="inline-block"
        >
          {iconContent}
        </a>
      );
    }

    if (iconItem.onClick) {
      return (
        <button
          key={index}
          onClick={(e) => handleIconClick(iconItem, e)}
          className="inline-block border-0 bg-transparent p-0"
        >
          {iconContent}
        </button>
      );
    }

    return <div key={index}>{iconContent}</div>;
  };

  return (
    <div
      className={cn(layoutClasses[layout], gapClasses[gap], className)}
      role="list"
    >
      {icons.map((iconItem, index) => renderIcon(iconItem, index))}
    </div>
  );
}
