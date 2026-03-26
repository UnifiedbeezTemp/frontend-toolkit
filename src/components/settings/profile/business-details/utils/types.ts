import { Website } from "../knowledge-files/websites/utils/types";

export interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  progress: number;
  status: "uploading" | "completed" | "error";
  url?: string;
}

export interface BusinessInfo {
  logo: string;
  businessName: string;
  businessDescription: string;
  industry: {
    name: string;
    icon: string;
  };
  goals: {
    id: number;
    title: string;
    description: string;
  }[];
  objectives: {
    id: number;
    title: string;
    description: string;
  }[];
  uploadedFiles: UploadedFile[];
  websites: Website[];
}
