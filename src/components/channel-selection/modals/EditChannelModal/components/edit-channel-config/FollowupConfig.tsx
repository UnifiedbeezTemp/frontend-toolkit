import DelayBeforeFollowUpField from "../../../../../channel-account-ai-config/followup-triggers/DelayBeforeFollowUpField";
import FollowUpContentTypeField from "../../../../../channel-account-ai-config/followup-triggers/FollowUpContentTypeField";
import Heading from "../../../../../ui/Heading";
import { useFollowupTriggers } from "../../hooks/useFollowupTriggers";

export default function FollowupConfig() {
  const {
    delayBeforeFollowup,
    followupContentType,
    handleDelayChange,
    handleContentTypeChange,
  } = useFollowupTriggers();

  return (
    <div className="space-y-[2.4rem] border-b border-input-stroke pb-[2.4rem]">
      <Heading className="text-[2rem]">
        Follow-Up Triggers (Keep Up conversation with client)
      </Heading>

      <DelayBeforeFollowUpField
        value={delayBeforeFollowup}
        onChange={handleDelayChange}
      />

      <FollowUpContentTypeField
        value={followupContentType}
        onChange={handleContentTypeChange}
      />
    </div>
  );
}
