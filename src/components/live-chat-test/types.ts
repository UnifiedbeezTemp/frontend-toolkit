export interface ChatMessage {
  id: string;
  text: string;
  sender: "assistant" | "user";
  timestamp: string;
}

