import {
  LiveChatConnection,
  ConnectionDisplayData,
} from "../connections/types";

export const mapLiveChatConnectionToDisplay = (
  connection: LiveChatConnection | unknown,
): ConnectionDisplayData | null => {
  try {
    if (!connection || typeof connection !== "object") {
      console.error("Invalid connection data:", connection);
      return null;
    }

    const livechatConn = connection as LiveChatConnection;

    if (!livechatConn.id && livechatConn.id !== 0) {
      return null;
    }

    const title =
      livechatConn.teamName ||
      livechatConn.chatName ||
      livechatConn.websiteUrl ||
      livechatConn.connectedChannel?.channelName ||
      "Live Chat";

    const subtitle =
      livechatConn.chatName ||
      livechatConn.websiteUrl ||
      livechatConn.connectedChannel?.channelName ||
      undefined;

    return {
      id: livechatConn.id,
      title,
      subtitle,
      isActive: livechatConn.connectedChannel?.isActive ?? false,
      isConnected: livechatConn.connectedChannel?.isConnected ?? false,
      metadata: {
        websiteUrl: livechatConn.websiteUrl,
        teamName: livechatConn.teamName,
        chatName: livechatConn.chatName,
        readReceipts: livechatConn.readReceipts,
        profilePic: livechatConn.profilePic,
        connectedChannelId: livechatConn.connectedChannelId,
        alignment: livechatConn.alignment,
        bubbleColor: livechatConn.bubbleColor,
      },
    };
  } catch (error) {
    console.error("Error mapping livechat connection:", error, connection);
    return null;
  }
};
