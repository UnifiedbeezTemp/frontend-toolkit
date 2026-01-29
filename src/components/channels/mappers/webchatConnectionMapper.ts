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

    if (!webchatConn.websiteUrl) {
      console.error("Connection missing websiteUrl:", webchatConn);
      return null;
    }

    return {
      id: webchatConn.id,
      title: webchatConn.websiteUrl || "Unknown Website",
      subtitle: webchatConn.connectedChannel?.channelName || "Web Chat",
      isActive: webchatConn.connectedChannel?.isActive ?? false,
      isConnected: webchatConn.connectedChannel?.isConnected ?? false,
      metadata: {
        websiteUrl: webchatConn.websiteUrl,
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

