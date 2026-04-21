import { Socket } from "socket.io-client";
import { Conversation } from "../../types/conversationApiTypes";
import { InboxSocketEvents } from "../../hooks/inbox/useInboxEvents";

export type ConnectedPayload = {
  userId: string;
  timestamp: string | number;
};

export type SocketErrorPayload = {
  message: string;
};

export interface MessagesSocketContextValue extends InboxSocketEvents {
  socket: Socket | null;
  isConnected: boolean;
  markAsRead: (conversationId: string) => void;
  joinConversation: (conversationId: string) => void;
}
