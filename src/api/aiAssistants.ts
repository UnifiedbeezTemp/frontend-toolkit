import {
  AiAssistantsResponse,
  CreateAiAssistantResponse,
  DeleteAiAssistantResponse,
  AIAssistant,
} from "../types/aiAssistantTypes";
import { api } from ".";

export const fetchAiAssistants = () =>
  api.get<AiAssistantsResponse>("/ai");

export const createAiAssistant = () =>
  api.post<undefined, CreateAiAssistantResponse>("/ai");

export const updateAiAssistantName = (payload: {
  id: string;
  name: string;
}) =>
  api.patch<{ name: string }, CreateAiAssistantResponse["ai"]>(
    `/ai/${payload.id}`,
    { name: payload.name }
  );

export const updateAiAssistantPersonality = (payload: {
  id: string;
  tone: string;
  style: string;
  personalityType: string;
}) =>
  api.patch<
    { tone: string; style: string; personalityType: string },
    AIAssistant
  >(`/ai/${payload.id}`, {
    tone: payload.tone,
    style: payload.style,
    personalityType: payload.personalityType,
  });

export const updateAiAssistantInstruction = (payload: {
  id: string;
  instruction: string;
}) =>
  api.patch<{ instruction: string }, AIAssistant>(`/ai/${payload.id}`, {
    instruction: payload.instruction,
  });

export const updateAiAssistantKnowledge = (payload: {
  id: string;
  websiteUrls: string[];
  knowledgeFiles: FormData;
}) => {
  const formData = new FormData();
  
  payload.websiteUrls.forEach((url) => {
    formData.append("websiteUrls", JSON.stringify(url));
  });
  
  const files = payload.knowledgeFiles.getAll("knowledgeFiles");
  files.forEach((file) => {
    if (file instanceof File) {
      formData.append("knowledgeFiles", file);
    }
  });
  
  return api.patch<FormData, AIAssistant>(`/ai/${payload.id}`, formData);
};

export const deleteAiAssistant = (id: string) =>
  api.delete<DeleteAiAssistantResponse>(`/ai/${id}`);
