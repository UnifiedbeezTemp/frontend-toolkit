export type InboxType = "general" | "team";

export interface Conversation {
  id: string;
  name: string;
  preview: string;
  timestamp: string;
  avatarColor: string;
  avatarUrl?: string;
  tag?: string;
  unreadCount?: number;
  isGroup?: boolean;
  participants?: string[];
  participantAvatars?: string[];
  participantCount?: number;
}

export const inboxTypeLabels: Record<InboxType, string> = {
  general: "General Inbox",
  team: "Team Inbox",
};
