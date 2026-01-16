"use client";

import Image from "next/image";
import Button from "@shared/components/ui/Button";
import { useSupabaseIcons } from "@shared/lib/supabase/useSupabase";
import { cn } from "@shared/lib/utils";

interface AppDownloadButtonsProps {
  className?: string;
}

export default function AppDownloadButtons({
  className,
}: AppDownloadButtonsProps) {
  const icons = useSupabaseIcons();

  return (
    <div className={cn("flex gap-2", className)}>
      <Button className="rounded-lg border border-dark-base-50 flex items-center justify-center hover:bg-black bg-black py-1 px-2 gap-2 transition-transform hover:scale-105">
        <Image src={icons.appstore} alt="appstore" width={19} height={21} />
        <span className="text-xs flex flex-col items-start text-left leading-tight">
          <span className="text-[.9rem] text-primary">Download on the</span>
          <span className="text-[1.2rem] text-primary">App Store</span>
        </span>
      </Button>
      <Button className="rounded-lg border border-dark-base-50 flex items-center justify-center hover:bg-black bg-black py-1 px-2 gap-2 transition-transform hover:scale-105">
        <Image src={icons.playstore} alt="playstore" width={19} height={21} />
        <span className="text-xs flex flex-col items-start text-left leading-tight">
          <span className="uppercase text-[.9rem] text-primary">Get it on</span>
          <span className="text-[1.2rem] text-primary">Google Play</span>
        </span>
      </Button>
    </div>
  );
}
