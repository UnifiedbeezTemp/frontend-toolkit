import { BusinessKnowledgeFile } from "../../../../../../../../types/aiAssistantTypes";
import { UploadedFile } from "../../../../../../../knowledge-files/types";

export const convertBusinessFileToUploadedFile = (
  file: BusinessKnowledgeFile,
): UploadedFile => ({
  id: file.id.toString(),
  documentId: file.id,
  name: file.fileName,
  size: file.fileSize,
  type: file.fileType,
  progress: 100,
  status: "saved",
  isFromBackend: true,
});

export const generateUniqueFileId = () =>
  `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
