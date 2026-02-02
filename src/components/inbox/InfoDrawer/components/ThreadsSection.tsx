import { Thread } from "../types";
import Text from "../../../ui/Text";

interface ThreadsSectionProps {
  threads: Thread[];
}

export default function ThreadsSection({ threads }: ThreadsSectionProps) {
  return (
    <div className="flex flex-col gap-2">
      {threads.map((thread) => (
        <div
          key={thread.id}
          className="bg-input-filled border-input-stroke border px-2 py-1 rounded-[0.8rem] hover:bg-black-5 transition-colors cursor-pointer"
        >
          <Text className="text-base font-medium text-dark-base-100 mb-1">
            {thread.title}
          </Text>
          <Text className="text-[1.2rem] text-dark-base-70">
            {thread.replyCount} replies • {thread.lastActivity}
          </Text>
        </div>
      ))}
    </div>
  );
}
