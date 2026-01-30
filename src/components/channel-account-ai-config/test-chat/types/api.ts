import { AccountType } from "../../types/api";

export interface ChatMessage {
  id: string;
  text: string;
  sender: "assistant" | "user";
  timestamp: string;
}

export interface ConversationHistoryItem {
  role: "assistant" | "user";
  content: string;
}

export interface InitTestSessionResponse {
  sessionId: string;
  greeting: string;
  aiName: string;
  metadata: {
    aiAssistantId: number;
    tone: string;
    style: string;
    personalityType: string;
  };
}

export interface SendTestMessageResponse {
  response: string;
  metadata: {
    faqTriggered: boolean;
    escalationDetected: boolean;
    knowledgeUsed: boolean;
    sources: string[];
    isOutOfHours: boolean;
    outOfHoursMessage?: string;
    tokensUsed: number;
    processingTimeMs: number;
  };
  conversationHistory: ConversationHistoryItem[];
}

export interface GetTestHistoryResponse {
  conversationHistory: ConversationHistoryItem[];
}

export interface ClearTestSessionResponse {
  message?: string;
  success?: boolean;
}

export interface InitTestSessionParams {
  channelId: number;
  aiId: number;
  connectionId: number;
  metadata: Record<string, unknown> | undefined;
}

export interface SendTestMessageParams {
  channelId: number;
  aiId: number;
  sessionId: string;
  message: string;
  simulateOutOfHours?: boolean;
}
