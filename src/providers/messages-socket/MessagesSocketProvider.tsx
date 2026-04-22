"use client";

import React, {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from "react";
import { useParams } from "next/navigation";
import { io, Socket } from "socket.io-client";
import { useInboxEvents } from "../../hooks/inbox/useInboxEvents";
import { messagesSocketUrl } from "../../api/rootUrls";
import { MessagesSocketContextValue } from "./types";
import { useSocketListeners } from "./useSocketListeners";

const MessagesSocketContext = createContext<
  MessagesSocketContextValue | undefined
>(undefined);

/**
 * Provider component that manages the global messages socket connection and interactions.
 */
export function MessagesSocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. URL & Infrastructure State
  const params = useParams();
  const conversationIdFromUrl = params.conversationId as string;
  const inboxEvents = useInboxEvents();

  const [isConnected, setIsConnected] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState<
    string | null
  >(null);

  // Initialize socket instance (Persistent State)
  const [socket] = useState<Socket | null>(() => {
    if (typeof window === "undefined") return null;
    return io(messagesSocketUrl, {
      withCredentials: true,
      autoConnect: true,
    });
  });

  // 2. State Synchronization: Link URL Path to Active Conversation State
  useEffect(() => {
    const targetId = conversationIdFromUrl || null;
    if (activeConversationId !== targetId) {
      setActiveConversationId(targetId);
    }
  }, [conversationIdFromUrl, activeConversationId]);

  // 3. Socket Action Callbacks
  const markAsRead = useCallback(
    (conversationId: string) => {
      if (socket?.connected) {
        socket.emit("mark_messages_read", { conversationId });
      }
    },
    [socket],
  );

  const joinConversation = useCallback(
    (conversationId: string) => {
      if (socket?.connected) {
        // Automatically leave previous conversation to maintain clean room state
        if (activeConversationId && activeConversationId !== conversationId) {
          socket.emit("leave_conversation", {
            conversationId: activeConversationId,
          });
        }
        socket.emit("join_conversation", { conversationId });
      }
    },
    [socket, activeConversationId],
  );

  // 4. Room Orchestration: Automated Rejoin on Connection Restore or URL Load
  useEffect(() => {
    if (isConnected && activeConversationId) {
      joinConversation(activeConversationId);
    }
  }, [isConnected, activeConversationId, joinConversation]);

  // 5. Attach Global Event Listeners
  useSocketListeners({
    socket,
    setIsConnected,
    activeConversationId,
    setActiveConversationId,
    inboxEvents,
  });

  // 6. Context Provisioning
  const value = useMemo(
    () => ({
      socket,
      isConnected,
      markAsRead,
      joinConversation,
      ...inboxEvents,
    }),
    [socket, isConnected, markAsRead, joinConversation, inboxEvents],
  );

  return (
    <MessagesSocketContext.Provider value={value}>
      {children}
    </MessagesSocketContext.Provider>
  );
}

/**
 * Hook to access the messages socket context.
 */
export function useMessagesSocket() {
  const ctx = useContext(MessagesSocketContext);
  if (!ctx) {
    throw new Error(
      "useMessagesSocket hook must be used within a MessagesSocketProvider",
    );
  }
  return ctx;
}
