import { api } from "../api";

export interface AiTestInitResponse {
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

export interface AiTestRequest {
  sessionId: string;
  message: string;
}

export interface AiTestResponse {
  response: string;
}

export const initAiTest = async (
  assistantId: string | number
): Promise<AiTestInitResponse> => {
  return api.post(`/ai/${assistantId}/test/init`, {});
};

export const deleteAiTestSession = async (
  assistantId: string | number,
  sessionId: string
): Promise<void> => {
  return api.delete(`/ai/${assistantId}/test/${sessionId}`);
};

export const sendAiTestMessage = async (
  assistantId: string | number,
  data: AiTestRequest
): Promise<AiTestResponse> => {
  return api.post(`/ai/${assistantId}/test`, data);
};
