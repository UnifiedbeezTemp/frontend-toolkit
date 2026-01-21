import { Thread } from "../types"
import Text from "../../../ui/Text"

interface ThreadsSectionProps {
  threads: Thread[]
}

export default function ThreadsSection({ threads }: ThreadsSectionProps) {
  return (
    <div className="flex flex-col gap-2">
      {threads.map((thread) => (
        <div
          key={thread.id}
          className="bg-gray-50 rounded-[0.8rem] p-3 hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <Text className="text-[1.4rem] font-medium text-text-primary mb-1">
            {thread.title}
          </Text>
          <Text className="text-[1.2rem] text-text-secondary">
            {thread.replyCount} replies • {thread.lastActivity}
          </Text>
        </div>
      ))}
    </div>
  )
}
