import { ReactNode } from "react";
import { cn } from "../../../lib/utils";

export default function InboxListContainer({
  header,
  body,
  className,
}: {
  header: ReactNode;
  body: ReactNode;
  className?: string;
}) {
  return (
    <>
      <div
        className={cn(
          "h-[calc(100dvh-16.5rem)] sm:h-[calc(100dvh-5.7rem)] overflow-auto w-full inset-0 bg-primary border-r border-gray-60",
          className
        )}
      >
        <div className="sticky top-0 bg-primary z-10 border-b border-b-gray-60">
          {header}
        </div>
        <div className="min-h-full z-5">{body}</div>
      </div>
    </>
  );
}
