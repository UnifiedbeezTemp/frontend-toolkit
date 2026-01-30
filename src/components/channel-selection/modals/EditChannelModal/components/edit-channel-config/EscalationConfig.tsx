import KeywordsField from "../../../../../channel-account-ai-config/escalation-rules/KeywordsField";
import NoReplyTimeField from "../../../../../channel-account-ai-config/escalation-rules/NoReplyTimeField";
import TeamMembersField from "../../../../../channel-account-ai-config/escalation-rules/TeamMembersField";
import UnansweredMessagesField from "../../../../../channel-account-ai-config/escalation-rules/UnansweredMessagesField";
import Heading from "../../../../../ui/Heading";
import Button from "../../../../../ui/Button";
import { useEscalationRules } from "../../hooks/useEscalationRules";
import { AIConfigParams } from "../../../../../channel-account-ai-config/services/aiConfigService";
import { EscalationRecommendationsResponse } from "../../../../../../services/smartSuggestionsService";

interface EscalationConfigProps {
  params: AIConfigParams;
  recommendations?: EscalationRecommendationsResponse;
}

export default function EscalationConfig({
  params,
  recommendations,
}: EscalationConfigProps) {
  const {
    unansweredMessages,
    keywords,
    noReplyTime,
    backupContacts,
    members,
    handleUnansweredChange,
    handleKeywordsChange,
    handleNoReplyTimeChange,
    handleBackupContactsChange,
    hasChanges,
    isSaving,
    save,
  } = useEscalationRules(params, recommendations);

  return (
    <div className="space-y-[2.4rem] border-b border-input-stroke pb-[2.4rem]">
      <div className="flex items-center justify-between">
        <Heading className="text-[2rem]">Escalation Rules</Heading>
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

      <UnansweredMessagesField
        value={unansweredMessages}
        onChange={handleUnansweredChange}
      />

      <KeywordsField value={keywords} onChange={handleKeywordsChange} />

      <NoReplyTimeField
        value={noReplyTime}
        onChange={handleNoReplyTimeChange}
      />

      <TeamMembersField
        value={backupContacts}
        onChange={handleBackupContactsChange}
        members={members}
      />
    </div>
  );
}
