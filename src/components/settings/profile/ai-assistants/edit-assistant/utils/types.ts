import { Website } from "../../../business-details/knowledge-files/websites/utils/types";
import { UploadedFile } from "../../../business-details/utils/types";
import { AIAssistant } from "../../utils/types";

export interface EditAssistantModalProps {
  assistant: AIAssistant;
  isOpen: boolean;
  onClose: () => void;
  onSave: (assistant: AIAssistant) => void;
}

export interface FileState {
  isDragOver: boolean;
  uploadingFiles: UploadedFile[];
  completedFiles: UploadedFile[];
}

export interface WebsiteState {
  websites: Website[];
  isAddModalOpen: boolean;
  newWebsiteUrl: string;
  selectedOption: "Page with all subpages" | "Just this page";
  urlError: string;
}

export interface InactivePagesModalState {
  isModalOpen: boolean;
  currentWebsiteIndex: number | null;
}