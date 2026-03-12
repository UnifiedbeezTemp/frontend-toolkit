export type ChatMode = "ai" | "live";

export interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "bot" | "agent";
  senderName?: string;
  timestamp: string;
  isSystem?: boolean;
}

export interface ChatAgent {
  id: string;
  name: string;
  avatar?: string;
}
