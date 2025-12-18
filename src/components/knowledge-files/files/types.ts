import { UploadedFile } from "../types";

export interface FileItemProps {
  file: UploadedFile;
  onRemove: (fileId: string, documentId?: number) => void;
  onCancel: (fileId: string) => void;
  onPreview?: (file: UploadedFile) => void;
  isDeleting?: boolean;
}

export interface FileItemState {
  hasError: boolean;
  isSaved: boolean;
  isPending: boolean;
}

