import { useState, useCallback, useEffect } from "react";
import { useAppSelector } from "../../../../../store/hooks/useRedux";
import { useTeamMembers } from "../../../../members/hooks/useTeamMembers";
import {
  useEscalationPersistence,
  EscalationRulesConfig,
  levelToString,
} from "../../../../channel-account-ai-config/hooks/useEscalationPersistence";
import { AIConfigParams } from "../../../../channel-account-ai-config/services/aiConfigService";
import { EscalationRecommendationsResponse } from "../../../../../services/smartSuggestionsService";
import { timeToString } from "../../../../channel-account-ai-config/utils/configUtils";
import { TeamMember } from "../../../../../store/onboarding/types/memberTypes";

function contactsToTeamMemberIds(
  contacts: { email: string; fullName: string }[],
  members: TeamMember[], 
): string[] {
  return contacts
    .map((contact) => {
      const member = members.find((m) => m.email === contact.email);
      return member?.id;
    })
    .filter((id): id is string => id !== undefined);
}

export function useEscalationRules(
  params: AIConfigParams,
  recommendations?: EscalationRecommendationsResponse,
) {
  const { refetchMembers } = useTeamMembers();
  const members = useAppSelector((state) => state.members.members);

  useEffect(() => {
    refetchMembers();
  }, []);

  const [localConfig, setLocalConfig] = useState<EscalationRulesConfig>({
    enabled: true,
    escalateAfterUnanswered: null,
    escalateOnKeywords: [],
    escalateAfterNoReply: null,
    backupEscalationContacts: [],
  });

  const updateLocalConfig = useCallback(
    (updates: Partial<EscalationRulesConfig>) => {
      setLocalConfig((prev) => ({ ...prev, ...updates }));
    },
    [],
  );

  useEffect(() => {
    if (recommendations && members.length > 0) {
      updateLocalConfig({
        enabled: recommendations.escalationEnabled,
        escalateAfterUnanswered: levelToString(
          recommendations.unansweredMessagesThreshold,
        ),
        escalateOnKeywords: recommendations.escalationKeywords,
        escalateAfterNoReply: timeToString(
          recommendations.escalationTimeAmount,
          recommendations.escalationTimeUnit,
        ),
        backupEscalationContacts: contactsToTeamMemberIds(
          recommendations.escalationContacts || [],
          members,
        ),
      });
    }
  }, [recommendations, members, updateLocalConfig]);

  const persistence = useEscalationPersistence(
    params,
    members,
    localConfig,
    updateLocalConfig,
  );

  const handleUnansweredChange = useCallback(
    (value: string) => {
      updateLocalConfig({ escalateAfterUnanswered: value });
    },
    [updateLocalConfig],
  );

  const handleKeywordsChange = useCallback(
    (newKeywords: string[]) => {
      updateLocalConfig({ escalateOnKeywords: newKeywords });
    },
    [updateLocalConfig],
  );

  const handleNoReplyTimeChange = useCallback(
    (value: string) => {
      updateLocalConfig({ escalateAfterNoReply: value });
    },
    [updateLocalConfig],
  );

  const handleBackupContactsChange = useCallback(
    (memberIds: string[]) => {
      updateLocalConfig({ backupEscalationContacts: memberIds });
    },
    [updateLocalConfig],
  );

  return {
    unansweredMessages: localConfig.escalateAfterUnanswered,
    keywords: localConfig.escalateOnKeywords,
    noReplyTime: localConfig.escalateAfterNoReply,
    backupContacts: localConfig.backupEscalationContacts,
    members,
    handleUnansweredChange,
    handleKeywordsChange,
    handleNoReplyTimeChange,
    handleBackupContactsChange,
    ...persistence,
  };
}
