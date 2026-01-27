import InboxSearchBar from "../components/SearchBar";
import ChannelHeaderRow from "./ChannelHeaderRow";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";

import {
  connectedChannels,
  channelAccounts,
} from "../ConnectChannelsModal/constants";

export default function ChannelsList() {
  const icons = useSupabaseIcons();

  const extraPlatforms = [
    { id: "figma", label: "Figma", icon: icons.frameIcon },
    { id: "notion", label: "Notion", icon: icons.document },
    { id: "linear", label: "Linear", icon: icons.zap },
  ];

  const allPlatforms = [
    ...connectedChannels.map((c) => ({
      id: c.id,
      label: c.name,
      icon: icons[c.icon as keyof typeof icons] || icons.whatsappIcon,
    })),
    // ...extraPlatforms,
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="my-4">
        <InboxSearchBar value={""} onChange={() => {}} />
      </div>
      {allPlatforms.map((platform) => (
        <ChannelHeaderRow
          key={platform.id}
          channel={{
            id: platform.id,
            label: platform.label,
            icon: platform.icon,
          }}
          accounts={
            channelAccounts[platform.id] || [
              {
                id: `${platform.id}-1`,
                name: "Sample Account",
                isConnected: true,
                status: "connected",
              },
            ]
          }
        />
      ))}
    </div>
  );
}
