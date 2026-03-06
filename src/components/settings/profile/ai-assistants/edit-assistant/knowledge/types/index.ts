import { AIAssistant } from "../../../../../../../types/aiAssistantTypes";
import { UploadedFile } from "../../../../../../knowledge-files/types";

export interface FileManagement {
  uploadingFiles: UploadedFile[];
  savedFiles: UploadedFile[];
  failedFiles: UploadedFile[];
  isDragOver: boolean;
  filesHasChanges: boolean;
  handleFilesUpdate: (files: FileList) => void;
  removeFile: (id: string, documentId?: number) => void;
  cancelUpload: (id: string) => void;
  setDragOver: (isOver: boolean) => void;
  handleDelete: (data: {
    aiId: string;
    documentId: number;
  }) => Promise<{ message?: string }>;
  isDeletingFile: boolean;
  deletingFileId: number | null;
}

export interface KnowledgeTabProps {
  assistant: AIAssistant | null;
  fileManagement: FileManagement;
}

export interface UseAssistantKnowledgeFilesReturn {
  uploadingFiles: UploadedFile[];
  savedFiles: UploadedFile[];
  failedFiles: UploadedFile[];
  isDragOver: boolean;
  hasChanges: boolean;
  handleFilesUpdate: (files: FileList) => void;
  removeFile: (id: string, documentId?: number) => void;
  cancelUpload: (id: string) => void;
  setDragOver: (isOver: boolean) => void;
  getFilesFormData: () => FormData;
  handleUploadResults: (
    results: Array<{
      success: boolean;
      file: string;
      error?: string;
      documentId?: number;
    }>,
  ) => void;
  hasFiles: boolean;
}
