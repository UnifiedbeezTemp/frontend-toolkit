import { Conversation as ApiConversation } from "../../types/conversationApiTypes";
import { Conversation as UIConversation } from "../../components/inbox/types";
import { formatChatTime } from "../formatChatTime";

/**
 * Maps a single API conversation object to the UI Conversation format.
 * This ensures consistency between the backend data structure and our
 * frontend presentation layer.
 */
export const mapConversationToUI = (
  apiConvo: ApiConversation,
): UIConversation => ({
  id: apiConvo.id,
  name: apiConvo.participantName,
  preview: apiConvo.lastMessagePreview,
  timestamp: formatChatTime(apiConvo.lastMessageAt || apiConvo.updatedAt),
  avatarUrl: apiConvo.participantAvatar || undefined,
  unreadCount: apiConvo.unreadCount,
  isGroup: apiConvo.isGroupChat,
  channel: apiConvo.channelType,
  avatarColor: "bg-brand-primary",
  participants: apiConvo.allParticipants,
  accountId: apiConvo.accountId,
  isInternal: apiConvo.isInternal,
  assignedToUserId: apiConvo.assignedToUserId,
  lastMessageAt: apiConvo.lastMessageAt,
  updatedAt: apiConvo.updatedAt,
});
