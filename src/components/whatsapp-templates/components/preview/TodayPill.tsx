import { cn } from "@/shared/src/lib/utils";

interface TodayPillProps {
  isThumbnail?: boolean;
}

export function TodayPill({ isThumbnail = false }: TodayPillProps) {
  return (
    <div
      className={cn(
        "bg-primary/90 backdrop-blur-sm rounded-[0.8rem] text-text-primary font-medium mb-[1.6rem] shadow-sm",
        isThumbnail
          ? "px-[0.8rem] py-[0.1rem] text-[0.8rem]"
          : "px-[1.2rem] py-[0.4rem] text-[1.1rem]",
      )}
    >
      Today
    </div>
  );
}
