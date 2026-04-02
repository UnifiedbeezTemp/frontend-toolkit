import { WebchatConnection, ConnectionDisplayData } from "../connections/types";

export const mapWebchatConnectionToDisplay = (
  connection: WebchatConnection | unknown
): ConnectionDisplayData | null => {
  try {
    if (!connection || typeof connection !== "object") {
      console.error("Invalid connection data:", connection);
      return null;
    }

    const webchatConn = connection as WebchatConnection;

    if (!webchatConn.id && webchatConn.id !== 0) {
      return null;
    }

    const title =
      webchatConn.teamName ||
      webchatConn.chatName ||
      webchatConn.websiteUrl ||
      webchatConn.connectedChannel?.channelName ||
      "Web Chat";

    const subtitle =
      webchatConn.chatName ||
      webchatConn.websiteUrl ||
      webchatConn.connectedChannel?.channelName ||
      undefined;

    return {
      id: webchatConn.id,
      title,
      subtitle,
      isActive: webchatConn.connectedChannel?.isActive ?? false,
      isConnected: webchatConn.connectedChannel?.isConnected ?? false,
      metadata: {
        websiteUrl: webchatConn.websiteUrl,
        teamName: webchatConn.teamName,
        chatName: webchatConn.chatName,
        readReceipts: webchatConn.readReceipts,
        profilePic: webchatConn.profilePic,
        connectedChannelId: webchatConn.connectedChannelId,
        alignment: webchatConn.alignment,
        bubbleColor: webchatConn.bubbleColor,
      },
    };
  } catch (error) {
    console.error("Error mapping webchat connection:", error, connection);
    return null;
  }
};
