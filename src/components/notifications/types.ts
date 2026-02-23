import { ReactNode } from "react";

export type NotificationCategory =
  | "all"
  | "channels"
  | "automations"
  | "system";

export interface Notification {
  id: string;
  title: string;
  content: string;
  category: NotificationCategory;
  timestamp: string;
  isRead: boolean;
  icon?: ReactNode;
  imageUrl?: string;
  channel?: "instagram" | "whatsapp" | "linkedin" | "system";
}
