import { ChannelConnection } from "../../../types/channelConnectionTypes";
import { WebchatConnection } from "../connections/types";

export const mapWebchatConnectionToFormData = (
  connection: WebchatConnection
): ChannelConnection => {
  const teamName =
    connection.teamName ||
    connection.chatName ||
    connection.websiteUrl ||
    connection.connectedChannel?.channelName ||
    "Web Chat";

  return {
    id: String(connection.id),
    channelId: String(connection.connectedChannelId),
    name: teamName,
    configuration: {
      websiteUrl: connection.websiteUrl,
      connectedChannelId: connection.connectedChannelId,
      webchatId: connection.id,
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
