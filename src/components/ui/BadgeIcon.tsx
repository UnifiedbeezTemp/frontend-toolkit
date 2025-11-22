"use client";

import Image from "next/image";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import { cn } from "../../lib/utils";

interface BadgeIconProps {
  icon: string;
  hasPattern?: boolean;
  className?: string;
}

export default function BadgeIcon({ icon, hasPattern = false, className }: BadgeIconProps) {
  const supabaseIcons = useSupabaseIcons();

  const baseClasses = "rounded-[1.3rem] p-[1rem] relative overflow-hidden inline-block border border-border";

  return (
    <div className={cn(baseClasses, className)}>
      <Image
        alt="badge icon"
        src={icon}
        width={25}
        height={25}
      />
      {hasPattern && (
        <Image
          alt="pattern"
          className="absolute top-0 left-0"
          src={supabaseIcons.pattern}
          width={100}
          height={100}
        />
      )}
    </div>
  );
}