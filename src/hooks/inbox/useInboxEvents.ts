import { useState, useCallback } from "react";
import { Conversation, Message } from "../../types/conversationApiTypes";

export interface InboxSocketEvents {
  lastCreatedConversation: Conversation | null;
  lastUpdatedConversation: Conversation | null;
  lastJoinedConversationId: string | null;
  lastCreatedMessage: Message | null;
  setCreatedConversation: (conversation: Conversation) => void;
  setUpdatedConversation: (conversation: Conversation) => void;
  setJoinedConversationId: (conversationId: string) => void;
  setCreatedMessage: (message: Message) => void;
}

/**
 * A hook to manage ephemeral state for inbox-related socket events.
 * This is used primarily by the MessagesSocketProvider to broadcast
 * real-time updates to the Inbox UI.
 */
export const useInboxEvents = (): InboxSocketEvents => {
  const [lastCreatedConversation, setLastCreatedConversation] =
    useState<Conversation | null>(null);

  const [lastUpdatedConversation, setLastUpdatedConversation] =
    useState<Conversation | null>(null);

  const [lastJoinedConversationId, setLastJoinedConversationId] = useState<
    string | null
  >(null);

  const [lastCreatedMessage, setLastCreatedMessage] = useState<Message | null>(
    null,
  );

  const setCreatedConversation = useCallback((conversation: Conversation) => {
    setLastCreatedConversation(conversation);
  }, []);

  const setUpdatedConversation = useCallback((conversation: Conversation) => {
    setLastUpdatedConversation(conversation);
  }, []);

  const setJoinedConversationId = useCallback((conversationId: string) => {
    setLastJoinedConversationId(conversationId);
  }, []);

  const setCreatedMessage = useCallback((message: Message) => {
    setLastCreatedMessage(message);
  }, []);

  return {
    lastCreatedConversation,
    lastUpdatedConversation,
    lastJoinedConversationId,
    lastCreatedMessage,
    setCreatedConversation,
    setUpdatedConversation,
    setJoinedConversationId,
    setCreatedMessage,
  };
};
