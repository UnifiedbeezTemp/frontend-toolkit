import { AIAssistant } from "../../../types/aiAssistantTypes";

export type AssistantMeta = {
  websitesCount: number;
  knowledgeFilesCount: number;
  instructionEditedByUser: boolean;
};

export const getAssistantMeta = (assistant: AIAssistant): AssistantMeta => {
  const websitesCount = assistant.websites?.length ?? 0;
  const knowledgeFilesCount =
    assistant.knowledgeFiles?.length ??
    assistant.businessKnowledgeFiles?.length ??
    0;
  const instructionEditedByUser = Boolean(assistant.instructionEditedByUser);

  return { websitesCount, knowledgeFilesCount, instructionEditedByUser };
};

