import { PropsWithChildren } from "react";
import { cn } from "../../../lib/utils";

export default function PanelShell({
  className,
  children,
  isOpen,
  isLiveDashboard,
}: PropsWithChildren & {
  className?: string;
  isOpen?: boolean;
  isLiveDashboard?: boolean;
}) {
  return (
    <div
      className={cn(
        isOpen
          ? "w-[90%] max-w-[24rem] border-r border-x border-x-input-stroke px-3 py-4"
          : "w-0 p-0",
        "transition-all duration-500 bg-input-filled",
        isOpen && isLiveDashboard && "sm:rounded-ss-[3rem]",
        "absolute xl:static top-0 left-0 z-50 h-full",
        "overflow-hidden",
        className,
      )}
    >
      {children}
    </div>
  );
}
