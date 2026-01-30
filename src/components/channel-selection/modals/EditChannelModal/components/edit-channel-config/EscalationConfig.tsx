import KeywordsField from "../../../../../channel-account-ai-config/escalation-rules/KeywordsField";
import NoReplyTimeField from "../../../../../channel-account-ai-config/escalation-rules/NoReplyTimeField";
import TeamMembersField from "../../../../../channel-account-ai-config/escalation-rules/TeamMembersField";
import UnansweredMessagesField from "../../../../../channel-account-ai-config/escalation-rules/UnansweredMessagesField";
import Heading from "../../../../../ui/Heading";
import { useEscalationRules } from "../../hooks/useEscalationRules";

export default function EscalationConfig() {
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
  } = useEscalationRules();

  return (
    <div className="space-y-[2.4rem] border-b border-input-stroke pb-[2.4rem]">
      <Heading className="text-[2rem]">Escalation Rules</Heading>

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
