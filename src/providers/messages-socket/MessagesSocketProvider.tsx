"use client";

import React, {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useState,
} from "react";
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
  const [isConnected, setIsConnected] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState<
    string | null
  >(null);
  const inboxEvents = useInboxEvents();

  const [socket] = useState<Socket | null>(() => {
    if (typeof window === "undefined") return null;
    return io(messagesSocketUrl, {
      withCredentials: true,
      autoConnect: true,
    });
  });

  // Attach/Detach listeners via modular hook
  useSocketListeners({
    socket,
    setIsConnected,
    setActiveConversationId,
    inboxEvents,
  });

  const markAsRead = useCallback(
    (conversationId: string) => {
      if (socket && isConnected) {
        socket.emit("mark_messages_read", { conversationId });
      }
    },
    [socket, isConnected],
  );

  const joinConversation = useCallback(
    (conversationId: string) => {
      if (socket && isConnected) {
        // Leave previous conversation if any (Automated Room Management)
        if (activeConversationId && activeConversationId !== conversationId) {
          socket.emit("leave_conversation", {
            conversationId: activeConversationId,
          });
        }

        socket.emit("join_conversation", { conversationId });
      }
    },
    [socket, isConnected, activeConversationId],
  );

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
