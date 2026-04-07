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
    <>
      <div
        ref={ref}
        className="absolute h-[calc(100dvh-16.5rem)] sm:h-[calc(100dvh-5.7rem)] overflow-auto overscroll-none w-full inset-0 bg-primary shadow-sm transition-all"
      >
        <div className={cn("sticky top-0 z-20 bg-primary transition-all")}>
          <div className="border-b border-b-gray-60">{header}</div>
          {pinnedBar && <div className="w-full">{pinnedBar}</div>}
        </div>
        <div className="min-h-full px-4">{body}</div>
        <div className="sticky bottom-0 py-6 px-4 bg-primary z-10">
          {composer}
        </div>
      </div>
    </>
  );
});

ConversationContainer.displayName = "ConversationContainer";

export default ConversationContainer;
