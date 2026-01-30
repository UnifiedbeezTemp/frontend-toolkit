import AIReplyDelayField from "../../../../../channel-account-ai-config/ai-behavior-settings/AIReplyDelayField";
import TimePicker from "../../../../../channel-account-ai-config/ai-behavior-settings/TimePicker";
import TimezoneField from "../../../../../channel-account-ai-config/ai-behavior-settings/TimezoneField";
import WorkingDaysField from "../../../../../channel-account-ai-config/ai-behavior-settings/WorkingDaysField";
import Heading from "../../../../../ui/Heading";
import { useAIBehaviourSettings } from "../../hooks/useAIBehaviourSettings";

export default function BehaviorConfig() {
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
  } = useAIBehaviourSettings();

  return (
    <div className="space-y-[2.4rem] border-b border-input-stroke pb-[2.4rem]">
      <Heading className="text-[2rem]">AI Behavior Settings (Timing)</Heading>

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
