import { Channel } from "../types"
import ImageComponent from "../../../ui/ImageComponent"
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase"
import { cn } from "../../../../lib/utils"

interface ChannelListPanelProps {
  channels: Channel[]
  selectedChannelId?: string
  onChannelSelect: (channelId: string) => void
}

export default function ChannelListPanel({
  channels,
  selectedChannelId,
  onChannelSelect,
}: ChannelListPanelProps) {
  const icons = useSupabaseIcons()

  return (
    <div className="flex flex-col h-full">
      <div className="text-[1.8rem] font-bold text-text-primary mb-4 px-4">
        Connected Channels
      </div>
      <div className="flex-1 overflow-y-auto">
        {channels.map((channel) => {
          const iconKey = channel.icon as keyof typeof icons
          const channelIcon = icons[iconKey]
          const isSelected = selectedChannelId === channel.id

          return (
            <div
              key={channel.id}
              onClick={() => onChannelSelect(channel.id)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors",
                isSelected
                  ? "bg-green-50 border-l-4 border-green-500"
                  : "hover:bg-gray-50"
              )}
            >
              <div className="flex items-center gap-3 flex-1">
                <ImageComponent
                  src={channelIcon}
                  alt={channel.name}
                  width={25}
                  height={25}
                />
                <div className="flex-1">
                  <div className="text-[1.4rem] text-text-primary">
                    {channel.name}
                  </div>
                  <div className="text-[1.2rem] text-text-secondary">
                    {channel.identifier}
                  </div>
                </div>
              </div>
              <div
                className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                  isSelected
                    ? "border-green-500 bg-green-500"
                    : "border-gray-300"
                )}
              >
                {isSelected && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
