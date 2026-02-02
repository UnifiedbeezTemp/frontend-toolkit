export type TimeUnit = "SECONDS" | "MINUTES" | "HOURS" | "DAYS";
export type WorkingDay =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";
export type FollowUpContentType =
  | "SALES"
  | "SUPPORT"
  | "BOOKING_REMINDER"
  | "COLD_LEAD_NUDGE"
  | "ABANDONED_CART"
  | "ONBOARDING_SETUP_HELP"
  | "ONBOARDING_SETUP_HELP"
  | "CUSTOM";

export type AccountType =
  | "whatsapp"
  | "facebook"
  | "email"
  | "sms"
  | "calendar"
  | "paypal"
  | "stripe"
  | "telegram"
  | "zoom"
  | "calendly";

export interface EscalationContact {
  email: string;
  fullName: string;
}

export interface TeamAccessEntry {
  teamMemberId: number;
  canView: boolean;
  canModify: boolean;
}

export interface AIConfigResponse {
  id: number;
  connectedChannelId: number;
  aiAssistantId: number;
  escalationEnabled: boolean;
  unansweredMessagesThreshold: number;
  escalationTimeAmount: number;
  escalationTimeUnit: TimeUnit;
  escalateToAllMembers: boolean;
  escalationKeywords: string[];
  escalationContacts: EscalationContact[];
  followUpEnabled: boolean;
  followUpDelayAmount: number;
  followUpDelayUnit: TimeUnit;
  followUpContentType: FollowUpContentType;
  replyDelayAmount: number;
  replyDelayUnit: TimeUnit;
  openingHour: number;
  closingHour: number;
  timezone: string;
  workingDays: WorkingDay[];
  industryType: string | null;
  teamAccess: TeamAccessEntry[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateConfigResponse {
  message: string;
  channelAiConfig: AIConfigResponse;
}

export interface UpdateAIConfigRequest {
  // Escalation
  escalationEnabled?: boolean;
  unansweredMessagesThreshold?: number;
  escalationTimeAmount?: number;
  escalationTimeUnit?: TimeUnit;
  escalateToAllMembers?: boolean;
  escalationKeywords?: string[];
  escalationContacts?: EscalationContact[];

  // Follow-up
  followUpEnabled?: boolean;
  followUpDelayAmount?: number;
  followUpDelayUnit?: TimeUnit;
  followUpContentType?: FollowUpContentType;

  // Behavior
  replyDelayAmount?: number;
  replyDelayUnit?: TimeUnit;
  openingHour?: number;
  closingHour?: number;
  timezone?: string;
  workingDays?: WorkingDay[];

  // Access
  teamAccess?: TeamAccessEntry[];
}
