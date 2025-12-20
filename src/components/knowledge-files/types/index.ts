export interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  progress: number;
  status: "pending" | "error" | "saved";
  url?: string;
  filePath?: string;
  error?: string;
  isFromBackend?: boolean;
  documentId?: number;
}
