import { ChannelConnection } from "../../../types/channelConnectionTypes";
import { WebchatConnection } from "../connections/types";

export const mapWebchatConnectionToFormData = (
  connection: WebchatConnection
): ChannelConnection => {
  return {
    id: String(connection.id),
    channelId: String(connection.connectedChannelId),
    name: connection.websiteUrl,
    configuration: {
      websiteUrl: connection.websiteUrl,
      connectedChannelId: connection.connectedChannelId,
      webchatId: connection.id, 
    },
    isActive: connection.connectedChannel?.isActive || false,
    createdAt: connection.createdAt,
    updatedAt: connection.updatedAt,
  };
};

