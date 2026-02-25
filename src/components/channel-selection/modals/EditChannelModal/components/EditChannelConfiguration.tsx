import SmartSuggestionsToggle from "../../../../smart-suggestions/SmartSuggestionsToggle";
import { Channel } from "../../../../../store/onboarding/types/channelTypes";
import { useSmartSuggestions } from "../hooks/useSmartSuggestions";
import AccountSelector from "./AccountSelector";
import AccessConfig from "./edit-channel-config/AccessConfig";
import AssistantConfig from "./edit-channel-config/AssistantConfig";
import BehaviorConfig from "./edit-channel-config/BehaviorConfig";
import EscalationConfig from "./edit-channel-config/EscalationConfig";
import FollowupConfig from "./edit-channel-config/FollowupConfig";
import PreLoader from "../../../../ui/PreLoader";
import { ConnectionDisplayData } from "../../../../channels/connections/types";
import { AIConfigParams } from "../../../../channel-account-ai-config/services/aiConfigService";
import {
  UnifiedSmartSuggestionsResponse,
  EscalationRecommendationsResponse,
  FollowUpRecommendationsResponse,
  AIBehaviorRecommendationsResponse,
} from "../../../../../services/smartSuggestionsService";
import { AIAssistant } from "../../../../../types/aiAssistantTypes";

interface EditChannelConfigurationProps {
  channel: Channel;
  connections: ConnectionDisplayData[];
  selectedConnectionId: string | number;
  onSelectConnection: (id: string | number) => void;
  isDropdownOpen: boolean;
  onToggleDropdown: () => void;
  onCloseDropdown: () => void;
  params: AIConfigParams;
  assistants: AIAssistant[];
  onAssistantChange: (id: number) => void;
  isLoadingConfig?: boolean;
}

export default function EditChannelConfiguration({
  channel,
  connections,
  selectedConnectionId,
  onSelectConnection,
  isDropdownOpen,
  onToggleDropdown,
  onCloseDropdown,
  params,
  assistants,
  onAssistantChange,
  isLoadingConfig = false,
}: EditChannelConfigurationProps) {
  const {
    isEnabled: smartSuggestionsEnabled,
    handleToggle: handleSmartSuggestionsToggle,
    recommendations,
  } = useSmartSuggestions({ params });

  if (isLoadingConfig) {
    return <PreLoader isPage={false} height={120} />;
  }

  return (
    <div className="space-y-[2.4rem]">
      <div className="space-y-[2.4rem] border-b border-input-stroke pb-[2.4rem]">
        <SmartSuggestionsToggle
          enabled={smartSuggestionsEnabled}
          onToggle={handleSmartSuggestionsToggle}
        />
        <AccountSelector
          channel={channel}
          connections={connections}
          selectedConnectionId={selectedConnectionId}
          onSelect={onSelectConnection}
          isDropdownOpen={isDropdownOpen}
          onToggle={onToggleDropdown}
          onClose={onCloseDropdown}
        />
        <AssistantConfig
          params={params}
          assistants={assistants}
          onAssistantChange={onAssistantChange}
        />
      </div>

      <EscalationConfig
        params={params}
        recommendations={
          smartSuggestionsEnabled
            ? (recommendations as EscalationRecommendationsResponse)
            : undefined
        }
      />
      <FollowupConfig
        params={params}
        recommendations={
          smartSuggestionsEnabled
            ? (recommendations as FollowUpRecommendationsResponse)
            : undefined
        }
      />
      <BehaviorConfig
        params={params}
        recommendations={
          smartSuggestionsEnabled
            ? (recommendations as AIBehaviorRecommendationsResponse)
            : undefined
        }
      />
      <AccessConfig channel={channel} params={params} />
    </div>
  );
}
