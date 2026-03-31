import { ChannelAccountConfigStatus } from "./channelAccountTypes";

export type TimeUnit = "MINUTES" | "HOURS" | "DAYS";

export interface ChannelAccountEscalationConfig {
  enabled: boolean;
  unansweredMessagesThreshold: number;
  timeAmount: number;
  timeUnit: TimeUnit;
  keywords: unknown[];
  contacts: unknown[];
  escalateToAllMembers: boolean;
}

export interface ChannelAccountFollowUpConfig {
  enabled: boolean;
  delayAmount: number;
  delayUnit: TimeUnit;
  contentType: string;
}

export interface ChannelAccountAIBehaviorConfig {
  replyDelayAmount: number;
  replyDelayUnit: TimeUnit;
  openingHour: number;
  closingHour: number;
  timezone: string;
  workingDays: unknown[];
}

export interface ChannelAccountAccessTeamMember {
  teamMemberId: number;
  fullName: string;
  email: string;
  canView: boolean;
  canModify: boolean;
  grantedAt: string;
}

export interface ChannelAccountAccessConfig {
  teamAccess: ChannelAccountAccessTeamMember[];
}

export interface ChannelAccountAccessTeamMemberUpdate {
  teamMemberId: number;
  canView?: boolean;
  canModify?: boolean;
}

export interface ChannelAccountConfiguration {
  configurationId: number;
  accountId: number;
  accountType: string;
  configStatus: ChannelAccountConfigStatus;
  isConfigured: boolean;
  aiAssistantId: number | null;
  escalation: ChannelAccountEscalationConfig;
  followUp: ChannelAccountFollowUpConfig;
  aiBehavior: ChannelAccountAIBehaviorConfig;
  access: ChannelAccountAccessConfig;
  updatedAt: string;
  createdAt: string;
}

export type ChannelAccountConfigurationResponse = ChannelAccountConfiguration | null;

export type UpdateChannelAccountConfigurationPayload = {
  aiAssistantId?: number;
  escalation?: Partial<ChannelAccountEscalationConfig>;
  followUp?: Partial<ChannelAccountFollowUpConfig>;
  aiBehavior?: Partial<ChannelAccountAIBehaviorConfig>;
  access?: {
    teamAccess?: ChannelAccountAccessTeamMemberUpdate[];
  };
};
