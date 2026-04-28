export interface Conversation {
  id: string;
  userId: number;
  organizationId: number;
  channelId: number;
  channelType: ChannelType;
  accountId: number;
  participantId: string;
  participantName: string;
  participantAvatar: string | null;
  status: string;
  isInternal: boolean;
  isGroupChat: boolean;
  groupName: string | null;
  allParticipants: string[];
  assignedToUserId: number | null;
  assignedToTeamMemberId: number | null;
  isAiEnabled: boolean;
  unreadCount: number;
  lastMessage: {
    content?: string;
  };
  lastMessageId: string;
  lastMessageAt: string;
  lastMessagePreview: string;
  escalatedAt: string | null;
  escalatedReason: string | null;
  resolvedAt: string | null;
  archivedAt: string | null;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ConversationsResponse {
  conversations: Conversation[];
  total: number;
  page: number;
  limit: number;
}

export type ChannelType =
  | "WHATSAPP"
  | "FACEBOOK_MESSENGER"
  | "INSTAGRAM"
  | "INSTAGRAM_DIRECT"
  | "TELEGRAM"
  | "EMAIL"
  | "SMS"
  | "WEBCHAT"
  | "LIVECHAT";

export interface Attachment {
  type: string;
  url: string;
  filename: string;
  size: number;
  mimeType: string;
  caption: string | null;
  thumbnail: string | null;
}

export interface MessageMetadata {
  channelMessageId: string;
  timestamp: number;
}

export interface Message {
  id: string;
  conversationId: string;
  userId: number;
  organizationId: number;
  channelId: number;
  channelType: ChannelType;
  accountId: number;
  direction: "INBOUND" | "OUTBOUND";
  type: string;
  status: string;
  content: string;
  senderId: string;
  senderName: string;
  recipientId: string;
  recipientName: string;
  attachments: Attachment[];
  metadata: MessageMetadata;
  isAiGenerated: boolean;
  aiTokensUsed: number | null;
  userIntent: string | null;
  escalationScore: number | null;
  isPinned: boolean;
  pinnedAt: string | null;
  pinnedBy: string | null;
  isDeleted: boolean;
  threadId: string | null;
  threadRootOf: string | null;
  deliveredAt: string | null;
  readAt: string | null;
  failureReason: string | null;
  conversation: Conversation;
  createdAt: string;
  updatedAt: string;
}

export interface ConversationDetailsResponse {
  messages: Message[];
  total: number;
  page: number;
  limit: number;
}

export interface SendMessageRequest {
  conversationId: string;
  channelId: number;
  channelType: ChannelType;
  accountId: number;
  content: string;
  type: "TEXT" | "IMAGE" | "DOCUMENT";
  direction: "OUTBOUND";
}
