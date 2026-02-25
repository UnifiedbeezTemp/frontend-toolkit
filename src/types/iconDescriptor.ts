import { IconProps } from "../assets/icons/types";

export interface IconDescriptor {
  /** How this icon should be resolved */
  iconType: "svg" | "url" | "emoji" | "component";
  /** SUPABASE_ICONS key (for "svg" type) */
  icon?: string;
  /** Fallback SUPABASE_ICONS key if primary fails */
  fallbackIcon?: string;
  /** Emoji character (for "emoji" type) */
  emoji?: string;
  /** Supabase image key or raw URL (for "url" type) */
  imageUrl?: string;
  /** React component (for "component" type) */
  component?: React.ComponentType<IconProps>;
  /** Accessible label */
  label?: string;
  /** Container background class */
  bgColor?: string;
  /** Icon/text color class */
  color?: string;
}
