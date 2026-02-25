"use client";

import { IconDescriptor } from "../../types/iconDescriptor";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import { cn } from "../../lib/utils";

interface IconRendererProps {
  descriptor: IconDescriptor;
  size?: number;
  className?: string;
  iconClassName?: string;
}

/**
 * Renders any IconDescriptor — handles component, url, svg (supabase), and emoji types.
 */
export default function IconRenderer({
  descriptor,
  size = 16,
  className,
  iconClassName,
}: IconRendererProps) {
  const icons = useSupabaseIcons();

  switch (descriptor.iconType) {
    case "component": {
      const Component = descriptor.component;
      if (!Component) return null;
      return (
        <span
          className={cn("inline-flex items-center justify-center shrink-0", className)}
        >
          <Component
            size={size}
            className={cn(descriptor.color, iconClassName)}
          />
        </span>
      );
    }

    case "url": {
      const src = descriptor.imageUrl?.startsWith("http")
        ? descriptor.imageUrl
        : descriptor.imageUrl
          ? icons[descriptor.imageUrl as keyof typeof icons]
          : undefined;

      if (!src) return null;
      return (
        <span
          className={cn("inline-flex items-center justify-center shrink-0", className)}
        >
          <img
            src={src}
            alt={descriptor.label ?? ""}
            width={size}
            height={size}
            className={cn("object-contain", iconClassName)}
          />
        </span>
      );
    }

    case "svg": {
      const key = descriptor.icon as keyof typeof icons;
      const src = icons[key];
      const fallbackKey = descriptor.fallbackIcon as keyof typeof icons;
      const finalSrc = src || (fallbackKey ? icons[fallbackKey] : undefined);

      if (!finalSrc) return null;
      return (
        <span
          className={cn("inline-flex items-center justify-center shrink-0", className)}
        >
          <img
            src={finalSrc}
            alt={descriptor.label ?? ""}
            width={size}
            height={size}
            className={cn("object-contain", iconClassName)}
          />
        </span>
      );
    }

    case "emoji": {
      return (
        <span
          className={cn("inline-flex items-center justify-center shrink-0", className)}
          style={{ fontSize: size }}
          role="img"
          aria-label={descriptor.label}
        >
          {descriptor.emoji}
        </span>
      );
    }

    default:
      return null;
  }
}
