import {
  AiAssistantsResponse,
  CreateAiAssistantResponse,
  DeleteAiAssistantResponse,
  AIAssistant,
  WebsitesResponse,
  AddWebsiteResponse,
} from "../types/aiAssistantTypes";
import { api } from ".";

export const fetchAiAssistants = () =>
  api.get<AiAssistantsResponse>("/ai");

export interface CreateAiAssistantPayload {
  name?: string;
  useProfileMapping?: boolean;
}

export const createAiAssistant = (payload?: CreateAiAssistantPayload) =>
  api.post<CreateAiAssistantPayload | undefined, CreateAiAssistantResponse>(
    "/ai",
    payload
  );

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
 
  const files = payload.knowledgeFiles.getAll("knowledgeFiles");
  files.forEach((file) => {
    if (file instanceof File) {
      formData.append("files", file);
    }
  });
  
  return api.post<FormData, AIAssistant>(`/ai/${payload.id}/knowledge/files`, formData);
};

export const uploadAssistantFiles = (id: string, files: FormData) => {
  return api.post<FormData, import("../types/aiAssistantTypes").FileUploadResponse>(
    `/ai/${id}/knowledge/files`,
    files
  );
};

export const deleteAiAssistant = (id: string) =>
  api.delete<DeleteAiAssistantResponse>(`/ai/${id}`);

export const deleteAssistantFile = (aiId: string, fileId: number) => {
  return api.delete<{ message?: string }>(`/ai/${aiId}/knowledge/files/${fileId}`);
};

// Website-related exports are now in shared/src/api/websites.ts
// These are kept for backward compatibility but should use the shared functions
export { fetchWebsites as fetchAssistantWebsites, addWebsite as addAssistantWebsite, CreateWebsitePayload } from "./websites";
