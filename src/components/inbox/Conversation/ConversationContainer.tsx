import { ReactNode, forwardRef } from "react";
import { cn } from "../../../lib/utils";

const ConversationContainer = forwardRef<
  HTMLDivElement,
  {
    header: ReactNode;
    pinnedBar?: ReactNode;
    body: ReactNode;
    composer: ReactNode;
    className?: string;
  }
>(({ header, pinnedBar, body, composer, className }, ref) => {
  return (
    <div className="absolute inset-0 h-[100dvh] sm:h-[calc(100dvh-5.7rem)] flex flex-col bg-primary shadow-sm transition-all overflow-hidden">
      <div className={cn("z-20 bg-primary transition-all shrink-0")}>
        <div className="border-b border-b-gray-60">{header}</div>
        {pinnedBar && <div className="w-full">{pinnedBar}</div>}
      </div>
      <div
        ref={ref}
        className="flex-1 overflow-y-auto overscroll-none px-4 scroll-smooth"
      >
        {body}
      </div>
      <div className="shrink-0 py-6 px-4 bg-primary z-10 border-t border-t-gray-60">
        {composer}
      </div>
    </div>
  );
});

ConversationContainer.displayName = "ConversationContainer";

export default ConversationContainer;
