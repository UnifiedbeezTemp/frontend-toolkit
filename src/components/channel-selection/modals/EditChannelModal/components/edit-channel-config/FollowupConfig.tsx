import DelayBeforeFollowUpField from "../../../../../channel-account-ai-config/followup-triggers/DelayBeforeFollowUpField";
import FollowUpContentTypeField from "../../../../../channel-account-ai-config/followup-triggers/FollowUpContentTypeField";
import Heading from "../../../../../ui/Heading";
import Button from "../../../../../ui/Button";
import { useFollowupTriggers } from "../../hooks/useFollowupTriggers";
import { AIConfigParams } from "../../../../../channel-account-ai-config/services/aiConfigService";
import { FollowUpRecommendationsResponse } from "../../../../../../services/smartSuggestionsService";

interface FollowupConfigProps {
  params: AIConfigParams;
  recommendations?: FollowUpRecommendationsResponse;
}

export default function FollowupConfig({
  params,
  recommendations,
}: FollowupConfigProps) {
  const {
    delayBeforeFollowup,
    followupContentType,
    handleDelayChange,
    handleContentTypeChange,
    hasChanges,
    isSaving,
    save,
  } = useFollowupTriggers(params, recommendations);

  return (
    <div className="space-y-[2.4rem] border-b border-input-stroke pb-[2.4rem]">
      <div className="flex items-center justify-between">
        <Heading className="text-[2rem]">
          Follow-Up Triggers 
        </Heading>
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
