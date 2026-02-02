import { useCallback } from "react";
import { useAIConfigPersistence } from "./useAIConfigPersistence";
import { AIConfigParams } from "../services/aiConfigService";
import { timeToString, parseTimeString } from "../utils/configUtils";
import {
  AIConfigResponse,
  UpdateAIConfigRequest,
  EscalationContact,
} from "../types/api";
import { TeamMember } from "../../../store/onboarding/types/memberTypes";

export interface EscalationRulesConfig {
  enabled: boolean;
  escalateAfterUnanswered: string | null;
  escalateOnKeywords: string[];
  escalateAfterNoReply: string | null;
  backupEscalationContacts: string[];
}

function parseThresholdString(value: string | null): number {
  if (!value) return 5;
  const match = value.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 5;
}

export function levelToString(value: number): string {
  return `${value} messages`;
}

function teamMemberIdsToContacts(
  memberIds: string[],
  members: TeamMember[],
): EscalationContact[] {
  return memberIds
    .map((id) => {
      const member = members.find((m) => m.id === id);
      if (!member) return null;
      return {
        email: member.email,
        fullName: member.fullName || member.email.split("@")[0],
      };
    })
    .filter((c): c is EscalationContact => c !== null);
}

function contactsToTeamMemberIds(
  contacts: EscalationContact[],
  members: TeamMember[],
): string[] {
  return contacts
    .map((contact) => {
      const member = members.find((m) => m.email === contact.email);
      return member?.id;
    })
    .filter((id): id is string => id !== undefined);
}

export function useEscalationPersistence(
  params: AIConfigParams,
  members: TeamMember[],
  config: EscalationRulesConfig,
  updateLocalConfig: (updates: Partial<EscalationRulesConfig>) => void,
) {
  const syncFromApi = useCallback(
    (apiConfig: AIConfigResponse): Partial<EscalationRulesConfig> => {
      return {
        enabled: apiConfig.escalationEnabled,
        escalateAfterUnanswered: levelToString(
          apiConfig.unansweredMessagesThreshold,
        ),
        escalateOnKeywords: apiConfig.escalationKeywords || [],
        escalateAfterNoReply: timeToString(
          apiConfig.escalationTimeAmount,
          apiConfig.escalationTimeUnit,
        ),
        backupEscalationContacts: contactsToTeamMemberIds(
          apiConfig.escalationContacts || [],
          members,
        ),
      };
    },
    [members],
  );

  const compareConfigs = useCallback(
    (current: EscalationRulesConfig, api: AIConfigResponse): boolean => {
      const apiThreshold = levelToString(api.unansweredMessagesThreshold);
      const apiDelay = timeToString(
        api.escalationTimeAmount,
        api.escalationTimeUnit,
      );
      const apiMemberIds = contactsToTeamMemberIds(
        api.escalationContacts || [],
        members,
      );

      return (
        current.enabled !== api.escalationEnabled ||
        current.escalateAfterUnanswered !== apiThreshold ||
        JSON.stringify(current.escalateOnKeywords) !==
          JSON.stringify(api.escalationKeywords || []) ||
        current.escalateAfterNoReply !== apiDelay ||
        JSON.stringify([...current.backupEscalationContacts].sort()) !==
          JSON.stringify([...apiMemberIds].sort())
      );
    },
    [members],
  );

  const transformToApi = useCallback(
    (current: EscalationRulesConfig): UpdateAIConfigRequest => {
      const { amount, unit } = parseTimeString(current.escalateAfterNoReply);
      return {
        escalationEnabled: current.enabled,
        unansweredMessagesThreshold: parseThresholdString(
          current.escalateAfterUnanswered,
        ),
        escalationTimeAmount: amount,
        escalationTimeUnit: unit,
        escalateToAllMembers:
          current.backupEscalationContacts.length === members.length &&
          members.length > 0,
        escalationKeywords: current.escalateOnKeywords,
        escalationContacts: teamMemberIdsToContacts(
          current.backupEscalationContacts,
          members,
        ),
      };
    },
    [members],
  );

  return useAIConfigPersistence({
    params,
    config,
    updateLocalConfig,
    syncFromApi,
    compareConfigs,
    transformToApi,
    sectionName: "Escalation Rules",
  });
}
