"use client";

import React from "react";
import ImageComponent from "./ImageComponent";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import { useRouter } from "next/navigation";
import { cn } from "../../lib/utils";

interface BackButtonProps {
  className?: string;
  onClick?: () => void;
}

export default function BackButton({ className, onClick }: BackButtonProps) {
  const icons = useSupabaseIcons();
  const router = useRouter();

  const handleBack = () => {
    if (onClick) {
      onClick();
    } else {
      router.back();
    }
  };

  return (
    <button
      onClick={handleBack}
      className={cn(
        "w-[3.2rem] h-[3.2rem] flex items-center justify-center rounded-[0.4rem] border border-input-stroke bg-primary hover:bg-input-filled transition-all",
        className,
      )}
    >
      <ImageComponent
        src={icons.arrowLeft1}
        alt="back"
        width={25}
        height={25}
      />
    </button>
  );
}
