export interface ChannelConnection {
  id: string;
  channelId: string;
  name: string;
  configuration: Record<string, unknown>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ChannelConnectionFormData {
  [key: string]: unknown;
}

