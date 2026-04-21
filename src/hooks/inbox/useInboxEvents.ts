import { useState, useCallback } from "react";
import { Conversation } from "../../types/conversationApiTypes";

export interface InboxSocketEvents {
  lastCreatedConversation: Conversation | null;
  lastUpdatedConversation: Conversation | null;
  lastJoinedConversationId: string | null;
  setCreatedConversation: (conversation: Conversation) => void;
  setUpdatedConversation: (conversation: Conversation) => void;
  setJoinedConversationId: (conversationId: string) => void;
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

  const setCreatedConversation = useCallback((conversation: Conversation) => {
    setLastCreatedConversation(conversation);
  }, []);

  const setUpdatedConversation = useCallback((conversation: Conversation) => {
    setLastUpdatedConversation(conversation);
  }, []);

  const setJoinedConversationId = useCallback((conversationId: string) => {
    setLastJoinedConversationId(conversationId);
  }, []);

  return {
    lastCreatedConversation,
    lastUpdatedConversation,
    lastJoinedConversationId,
    setCreatedConversation,
    setUpdatedConversation,
    setJoinedConversationId,
  };
};
