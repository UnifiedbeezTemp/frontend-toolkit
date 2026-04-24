import { ChannelConnection } from "../../../types/channelConnectionTypes";

export interface LiveChatConnection {
  id: number;
  teamName: string;
  provider: string;
  email: string;
  displayName: string;
  connectedChannelId: number | null;
  customDomain: string;
  isActive: boolean;
  canReceive: boolean;
  canSend: boolean;
  createdAt: string;
  updatedAt: string;
  chatName: string;
  profilePic: string | null;
  readReceipts: boolean;
  connectedChannel: {
    id: number;
    userId: number;
    availableChannelId: number;
    channelName: string;
    isActive: boolean;
    isConnected: boolean;
    credentials: unknown,
  };
}

export const mapLiveChatConnectionToFormData = (
  connection: LiveChatConnection,
): ChannelConnection => {
  const teamName = connection.teamName || connection.chatName || "Live Chat";

  return {
    id: String(connection.id),
    channelId: String(connection.connectedChannelId),
    name: teamName,
    configuration: {
      connectedChannelId: connection.connectedChannelId,
      livechatId: connection.id,
      teamName,
      chatName: connection.chatName,
      readReceipts: connection.readReceipts,
      profilePic: connection.profilePic,
    },
    isActive: connection?.isActive || false,
    createdAt: connection.createdAt,
    updatedAt: connection.updatedAt,
  };
};
