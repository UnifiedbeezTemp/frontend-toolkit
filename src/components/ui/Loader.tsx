import React from "react";
import { cn } from "../../lib/utils";

export default function Loader({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-[2rem] h-[2rem] border border-current border-t-transparent rounded-full animate-spin",
        className
      )}
    />
  );
}
