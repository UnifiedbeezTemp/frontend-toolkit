import { ReactNode } from "react";

export default function ConversationContainer({
  header,
  pinnedBar,
  body,
  composer,
}: {
  header: ReactNode;
  pinnedBar?: ReactNode;
  body: ReactNode;
  composer: ReactNode;
}) {
  return (
    <>
      <div className="absolute h-[calc(100dvh-16.5rem)] sm:h-[calc(100dvh-5.7rem)] overflow-auto w-full inset-0 bg-primary">
        <div className="sticky top-0 z-20 bg-primary">
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
}
