import { useEffect } from "react";
import { Socket } from "socket.io-client";
import { ConnectedPayload, SocketErrorPayload } from "./types";
import { InboxSocketEvents } from "../../hooks/inbox/useInboxEvents";
import { redirectToLogin } from "../../utils/redirectToLogin";
import { Conversation } from "../../types/conversationApiTypes";

interface UseSocketListenersParams {
  socket: Socket | null;
  setIsConnected: (connected: boolean) => void;
  setActiveConversationId: (id: string | null) => void;
  inboxEvents: InboxSocketEvents;
}

/**
 * Hook to manage socket event listeners.
 * Orchestrates the connection, error, and conversation events.
 */
export const useSocketListeners = ({
  socket,
  setIsConnected,
  setActiveConversationId,
  inboxEvents,
}: UseSocketListenersParams) => {
  useEffect(() => {
    if (!socket) return;

    const onConnected = (payload: ConnectedPayload) => {
      setIsConnected(true);
    };

    const onError = (payload: SocketErrorPayload) => {
      if (payload?.message === "Unauthorized") redirectToLogin();
    };

    const onDisconnect = (reason: string) => {
      setIsConnected(false);
      if (reason !== "io client disconnect") socket.connect();
    };

    const conversationCreated = (conversation: Conversation) => {
      inboxEvents.setCreatedConversation(conversation);
    };

    const conversationUpdated = (conversation: Conversation) => {
      if (conversation.lastMessage) {
        inboxEvents.setUpdatedConversation(conversation);
      }
    };

    const conversationJoined = (payload: { conversationId: string }) => {
      console.log("coversation joined")
      setActiveConversationId(payload.conversationId);
      inboxEvents.setJoinedConversationId(payload.conversationId);
    };

    const messageReceipt = () => {
      console.log("new nessage")
    };

    // Base connection
    socket.on("connected", onConnected);
    socket.on("error", onError);
    socket.on("disconnect", onDisconnect);

    // Conversation events
    socket.on("conversation.created", conversationCreated);
    socket.on("conversation.updated", conversationUpdated);
    socket.on("conversation_joined", conversationJoined);

    //Message events 
    socket.on("message.created", messageReceipt);

    socket.connect();

    return () => {
      socket.off("connected", onConnected);
      socket.off("error", onError);
      socket.off("disconnect", onDisconnect);
      socket.off("conversation.created", conversationCreated);
      socket.off("conversation.updated", conversationUpdated);
      socket.off("conversation_joined", conversationJoined);
      socket.disconnect();
    };
  }, [socket, setIsConnected, setActiveConversationId, inboxEvents]);
};
