import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import ImageComponent from "../../ui/ImageComponent";
import { getChannelIconKey } from "../../../utils/channelMapping";

interface ChannelIconProps {
  channelName: string;
  className?: string;
}

export default function ChannelIcon({
  channelName,
  className,
}: ChannelIconProps) {
  const icons = useSupabaseIcons();
  const iconKey = getChannelIconKey(channelName);

  const icon = (icons as Record<string, string>)[iconKey] || icons.linkExternal;

  return (
    <div className={className}>
      <ImageComponent src={icon} alt={channelName} width={20} height={20} />
    </div>
  );
}
