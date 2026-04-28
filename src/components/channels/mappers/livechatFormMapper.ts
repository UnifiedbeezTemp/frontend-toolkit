import { ChannelConnection } from "../../../types/channelConnectionTypes";
import { LiveChatConnection } from "../connections/types";

export const mapLiveChatConnectionToFormData = (
  connection: LiveChatConnection,
): ChannelConnection => {
  const teamName =
    connection.teamName ||
    connection.chatName ||
    connection.websiteUrl ||
    connection.connectedChannel?.channelName ||
    "Live Chat";

  return {
    id: String(connection.id),
    channelId: String(connection.connectedChannelId),
    name: teamName,
    configuration: {
      websiteUrl: connection.websiteUrl,
      connectedChannelId: connection.connectedChannelId,
      livechatId: connection.id,
      teamName,
      chatName: connection.chatName,
      readReceipts: connection.readReceipts,
      profilePic: connection.profilePic,
    },
    isActive: connection.connectedChannel?.isActive || false,
    createdAt: connection.createdAt,
    updatedAt: connection.updatedAt,
  };
};
