"use client";

import Image from "next/image";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import { cn } from "../../lib/utils";

interface BadgeIconProps {
  icon: string | React.ElementType;
  iconSize?: number;
  iconColor?: string;
  hasPattern?: boolean;
  className?: string;
}

export default function BadgeIcon({
  icon: Icon,
  iconSize = 25,
  iconColor,
  hasPattern = false,
  className,
}: BadgeIconProps) {
  const supabaseIcons = useSupabaseIcons();

  const baseClasses =
    "rounded-[1.3rem] p-[1rem] relative overflow-hidden inline-flex items-center justify-center border border-border";

  const renderIcon = () => {
    if (typeof Icon === "string") {
      return (
        <Image alt="badge icon" src={Icon} width={iconSize} height={iconSize} />
      );
    }
    const IconComponent = Icon;
    return <IconComponent size={iconSize} color={iconColor} />;
  };

  return (
    <div className={cn(baseClasses, className)}>
      <div className="relative z-10 flex items-center justify-center">
        {renderIcon()}
      </div>
      {hasPattern && (
        <Image
          alt="pattern"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-100"
          src={supabaseIcons.pattern}
          width={100}
          height={100}
        />
      )}
    </div>
  );
}
