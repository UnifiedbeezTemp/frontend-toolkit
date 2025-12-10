export interface AIAssistant {
  id: string;
  name: string;
  tone?: string;
  style?: string;
  personalityType?: string;
  instruction?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  websites?: string[];
  businessKnowledgeFiles?: string[];
}

export interface AiUsage {
  current: number;
  max: number;
  unlimited: boolean;
  remaining: number;
}

export interface AiAssistantsResponse {
  aiAssistants: AIAssistant[];
  usage: AiUsage;
}

export interface CreateAiAssistantResponse {
  ai: AIAssistant;
  remaining: number;
  message?: string;
}

export interface DeleteAiAssistantResponse {
  remaining?: number;
  message?: string;
}

