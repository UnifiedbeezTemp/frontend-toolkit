export interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  progress: number;
  status: "uploading" | "completed" | "error";
  url?: string;
}
