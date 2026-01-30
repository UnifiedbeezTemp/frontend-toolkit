import AIReplyDelayField from "../../../../../channel-account-ai-config/ai-behavior-settings/AIReplyDelayField";
import TimePicker from "../../../../../channel-account-ai-config/ai-behavior-settings/TimePicker";
import TimezoneField from "../../../../../channel-account-ai-config/ai-behavior-settings/TimezoneField";
import WorkingDaysField from "../../../../../channel-account-ai-config/ai-behavior-settings/WorkingDaysField";
import Heading from "../../../../../ui/Heading";
import Button from "../../../../../ui/Button";
import { useAIBehaviourSettings } from "../../hooks/useAIBehaviourSettings";
import { AIConfigParams } from "../../../../../channel-account-ai-config/services/aiConfigService";
import { AIBehaviorRecommendationsResponse } from "../../../../../../services/smartSuggestionsService";

interface BehaviorConfigProps {
  params: AIConfigParams;
  recommendations?: AIBehaviorRecommendationsResponse;
}

export default function BehaviorConfig({
  params,
  recommendations,
}: BehaviorConfigProps) {
  const {
    replyDelay,
    workingDays,
    timezone,
    openingTime,
    closingTime,
    handleReplyDelayChange,
    handleWorkingDaysChange,
    handleTimezoneChange,
    handleOpeningTimeChange,
    handleClosingTimeChange,
    hasChanges,
    isSaving,
    save,
  } = useAIBehaviourSettings(params, recommendations);

  return (
    <div className="space-y-[2.4rem] border-b border-input-stroke pb-[2.4rem]">
      <div className="flex items-center justify-between">
        <Heading className="text-[2rem]">AI Behavior Settings (Timing)</Heading>
        {hasChanges && (
          <Button
            onClick={save}
            disabled={isSaving}
            className="h-[3.2rem] px-[2rem]"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        )}
      </div>

      <AIReplyDelayField value={replyDelay} onChange={handleReplyDelayChange} />

      <WorkingDaysField
        value={workingDays}
        onChange={handleWorkingDaysChange}
      />

      <TimezoneField value={timezone} onChange={handleTimezoneChange} />

      <TimePicker
        label="Opening Hours"
        hours={openingTime.hours}
        minutes={openingTime.minutes}
        period={openingTime.period}
        onChange={handleOpeningTimeChange}
      />

      <TimePicker
        label="Closing Hours"
        hours={closingTime.hours}
        minutes={closingTime.minutes}
        period={closingTime.period}
        onChange={handleClosingTimeChange}
      />
    </div>
  );
}
