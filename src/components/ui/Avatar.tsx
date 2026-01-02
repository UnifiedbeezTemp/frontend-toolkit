import React from "react";
import ImageComponent from "./ImageComponent";
import { cn } from "../../lib/utils";

/**
 * REUSABLE AVATAR COMPONENT
 *
 * USAGE:
 * <Avatar src="/path/to/image.jpg" alt="User name" />
 * <Avatar src="/path/to/image.jpg" alt="User name" size="lg" />
 * <Avatar name="Ariana Grande" size="md" />
 * <Avatar src="/path/to/image.jpg" alt="User" showOnline />
 * <Avatar src="/path/to/image.jpg" alt="User" className="custom-styles" />
 *
 * PROPS:
 * - src: Image source URL (optional - uses fallback if not provided)
 * - alt: Alt text for image (required for accessibility)
 * - name: User name for fallback initials (optional)
 * - size: xs | sm | md | lg | xl (default: md)
 * - showOnline: boolean - shows green online indicator (default: false)
 * - onlineStatus: online | offline | away (default: online)
 * - className: Add custom styles
 * - onClick: Click handler function
 *
 * DEFAULTS:
 * - Circular shape
 * - Fallback to initials if no image
 * - Subtle border
 * - Hover scale effect (if onClick provided)
 */

export interface AvatarProps {
  src?: string;
  alt: string;
  name?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  showOnline?: boolean;
  onlineStatus?: "online" | "offline" | "away";
  className?: string;
  onClick?: () => void;
  imageContainerClassName?: string;
  initialsClassName?: string;
  hasBorder?: boolean;
  hideOverflow?: boolean;
}

const sizeClasses = {
  xs: "w-6 h-6 text-[10px]",
  sm: "w-8 h-8 text-[12px]",
  md: "w-[4rem] h-[4rem] text-[14px]",
  lg: "w-[8rem] h-[8rem] text-[18px]",
  xl: "w-24 h-24 text-[24px]",
};

const indicatorSizeClasses = {
  xs: "w-1.5 h-1.5 border",
  sm: "w-2 h-2 border",
  md: "w-2.5 h-2.5 border-2",
  lg: "w-3 h-3 border-2",
  xl: "w-4 h-4 border-2",
};

const statusColors = {
  online: "bg-input-stroke",
  offline: "bg-muted",
  away: "bg-warning",
};

// Get initial of the user name and use as fallback
const getInitials = (name: string): string => {
  const names = name.trim().split(" ");
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  }
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
};

export default function Avatar({
  src,
  alt,
  name,
  size = "md",
  showOnline = false,
  onlineStatus = "online",
  className = "",
  imageContainerClassName = "",
  initialsClassName = "",
  hasBorder = true,
  hideOverflow = true,
  onClick,
  onLoad,
}: AvatarProps & { onLoad?: () => void }) {
  const hasImage = !!src;
  const initials = name ? getInitials(name) : alt.charAt(0).toUpperCase();

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center shrink-0",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          "rounded-full bg-primary transition-all duration-200",
          sizeClasses[size],
          onClick && "hover:scale-105 active:scale-95",
          hasBorder && "border-border border",
          hideOverflow && "overflow-hidden",
          imageContainerClassName
        )}
      >
        {hasImage ? (
          <ImageComponent
            src={src}
            alt={alt}
            fill
            className="object-cover"
            containerClassName="w-full h-full"
            onLoad={onLoad}
          />
        ) : (
          <div
            className={cn(
              "w-full h-full flex items-center justify-center bg-brand-primary text-white font-bold",
              initialsClassName
            )}
          >
            {initials}
          </div>
        )}
      </div>

      {showOnline && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full border-primary",
            indicatorSizeClasses[size],
            statusColors[onlineStatus]
          )}
          aria-label={`Status: ${onlineStatus}`}
        />
      )}
    </div>
  );
}
