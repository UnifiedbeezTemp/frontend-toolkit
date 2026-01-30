import { useCallback } from "react";
import SmartSuggestionsToggle from "../../../../smart-suggestions/SmartSuggestionsToggle";
import { Channel } from "../../../../../store/onboarding/types/channelTypes";
import { useChannelConnectionsData } from "../../../../channels/hooks/useChannelConnectionsData";
import AccountSelector from "./AccountSelector";
import AccessConfig from "./edit-channel-config/AccessConfig";
import AssistantConfig from "./edit-channel-config/AssistantConfig";
import BehaviorConfig from "./edit-channel-config/BehaviorConfig";
import EscalationConfig from "./edit-channel-config/EscalationConfig";
import FollowupConfig from "./edit-channel-config/FollowupConfig";

interface EditChannelConfigurationProps {
  channel: Channel;
}

export default function EditChannelConfiguration({
  channel,
}: EditChannelConfigurationProps) {
  const { connections } = useChannelConnectionsData(channel);
  const handleToggle = useCallback(() => {}, []);

  return (
    <div className="space-y-[2.4rem]">
      <div className="space-y-[2.4rem] border-b border-input-stroke pb-[2.4rem]">
        <SmartSuggestionsToggle enabled={false} onToggle={handleToggle} />
        <AccountSelector channel={channel} connections={connections} />
        <AssistantConfig />
      </div>

      <EscalationConfig />
      <FollowupConfig />
      <BehaviorConfig />
      <AccessConfig channel={channel} />
    </div>
  );
}
