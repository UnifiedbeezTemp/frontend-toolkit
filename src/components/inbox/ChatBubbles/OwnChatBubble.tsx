import { cn } from "../../../lib/utils";
import { formatBubbleTime } from "../../../utils/formatChatTime";
import LinkifiedText from "./LinkifiedText";

export function OwnChatBubble({
  children,
  className,
  timestamp,
  maxWidthClass = "max-w-[38rem]",
}: {
  children: string;
  className?: string;
  timestamp?: string;
  maxWidthClass?: string;
}) {
  return (
    <div
      className={cn(
        "flex gap-2 flex-col w-full justify-end items-end",
        className,
      )}
    >
      <div
        className={cn(
          "rounded-[1.6rem] rounded-br-none p-4",
          "text-md lg:text-base text-primary",
          "bg-[linear-gradient(143deg,var(--brand-primary)_21.47%,var(--yellow-100)_289.64%)]",
          maxWidthClass,
        )}
      >
        <LinkifiedText
          text={children}
          linkClassName="text-white hover:text-white/80 underline"
        />
      </div>
      <span className="text-xs text-dark-base-50 font-normal">
        {formatBubbleTime(timestamp)}
      </span>
    </div>
  );
}
