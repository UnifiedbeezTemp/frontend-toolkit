export type ChannelAccountConnectionStatus =
  | "CONNECTED"
  | "DISCONNECTED"
  | "ERROR"
  | "REAUTH_REQUIRED";

export type ChannelAccountConfigStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "CONFIGURED"
  | "NEEDS_ATTENTION";

export interface ChannelAccountConfig {
  configurationId: number;
  configStatus: ChannelAccountConfigStatus;
  isConfigured: boolean;
  aiAssistantId: number | null;
  updatedAt: string;
}

export interface ChannelAccount {
  accountId: number;
  accountType: string;
  channelKey: string;
  iconKey: string;
  displayName: string;
  secondaryText?: string;
  status: ChannelAccountConnectionStatus;
  config: ChannelAccountConfig | null;
}

export interface ChannelAccountsResponse {
  accounts: ChannelAccount[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

