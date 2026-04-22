import { useEffect, useRef } from "react";
import { Socket } from "socket.io-client";
import { ConnectedPayload, SocketErrorPayload } from "./types";
import { InboxSocketEvents } from "../../hooks/inbox/useInboxEvents";
import { Conversation, Message } from "../../types/conversationApiTypes";
import { useQueryClient } from "@tanstack/react-query";
import { conversationsService } from "../../api/services/inbox/conversations/conversationsService";
import { redirectToLogin } from "../../utils/redirectToLogin";

interface UseSocketListenersParams {
  socket: Socket | null;
  setIsConnected: (connected: boolean) => void;
  activeConversationId: string | null;
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
  activeConversationId,
  setActiveConversationId,
  inboxEvents,
}: UseSocketListenersParams) => {
  const queryClient = useQueryClient();

  // Use a ref to track the active ID without triggering effect re-runs
  const activeIdRef = useRef(activeConversationId);

  useEffect(() => {
    activeIdRef.current = activeConversationId;
  }, [activeConversationId]);

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
      // console.log(payload)
      setActiveConversationId(payload.conversationId);
      inboxEvents.setJoinedConversationId(payload.conversationId);
    };

    const messageReceipt = async (message: Message) => {
      inboxEvents.setCreatedMessage(message);

      // Automated Mark as Read and Refetch using the ref for the active conversation
      if (String(message.conversationId) === String(activeIdRef.current)) {
        try {
         await conversationsService.markAsRead(message.conversationId);
          queryClient.invalidateQueries({ queryKey: ["conversations"] });
        } catch (error) {
          console.error("Failed to mark auto-received message as read:", error);
        }
      }
    };

    const otherUserTyping = () => {
      console.log("typing")
    }

    // Base connection
    socket.on("connected", onConnected);
    socket.on("error", onError);
    socket.on("disconnect", onDisconnect);

    // Conversation events
    socket.on("conversation.created", conversationCreated);
    socket.on("conversation.updated", conversationUpdated);
    socket.on("conversation_joined", conversationJoined);

    // Message events
    socket.on("message.created", messageReceipt);

    //Typing
    socket.on("user_typing", otherUserTyping);

    socket.connect();

    return () => {
      socket.off("connected", onConnected);
      socket.off("error", onError);
      socket.off("disconnect", onDisconnect);
      socket.off("conversation.created", conversationCreated);
      socket.off("conversation.updated", conversationUpdated);
      socket.off("conversation_joined", conversationJoined);
      socket.off("message.created", messageReceipt);
      socket.off("user_typing", otherUserTyping);
      socket.disconnect();
    };
  }, [socket, queryClient]); 
};
