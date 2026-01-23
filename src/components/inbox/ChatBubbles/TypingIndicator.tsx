import { cn } from "../../../lib/utils";

export function TypingIndicator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex gap-2 flex-col w-full justify-end items-start animate-in fade-in slide-in-from-bottom-2 duration-300",
        className,
      )}
    >
      <div
        className={cn(
          "text-md rounded-[1.6rem] rounded-bl-none bg-input-filled p-4 px-6",
          "text-dark-base-70 shadow-sm flex items-center gap-1",
        )}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-dark-base-40 animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-1.5 h-1.5 rounded-full bg-dark-base-40 animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-1.5 h-1.5 rounded-full bg-dark-base-40 animate-bounce"></span>
      </div>
    </div>
  );
}
