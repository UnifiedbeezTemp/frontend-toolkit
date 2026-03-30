export interface BusinessKnowledgeFile {
  id: number;
  userId: number;
  fileName: string;
  originalName?: string;
  fileType: string;
  fileSize: number;
  filePath?: string;
  uploadedAt: string;
  isDefaultKnowledge: boolean;
  processingStatus:
    | "COMPLETED"
    | "FAILED"
    | "QUEUED_FOR_PROCESSING"
    | "PROCESSING";
  processingError?: string | null;
  extractedImagesCount: number;
  extractedTablesCount: number;
  wordCount: number;
  pageCount: number;
  fileHash: string;
  processedDataPath: string | null;
  encryptionIv: string;
  encryptionTag: string;
  aiAssistantId: number;
}

export type AssistantKnowledgeFileSummary = {
  id: number;
  fileName: string;
  fileSize: number;
  fileType: string;
  processingStatus:
    | "COMPLETED"
    | "FAILED"
    | "QUEUED_FOR_PROCESSING"
    | "PROCESSING";
  uploadedAt?: string;
  processingError?: string | null;
  filePath?: string;
  originalName?: string;
};

export interface AIAssistant {
  id: string;
  name: string;
  tone?: string;
  style?: string;
  personalityType?: string;
  instruction?: string;
  instructionEditedByUser?: boolean;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  websites?: { displayName: string; baseUrl: string; id: number, syncStatus: string, }[];
  knowledgeFiles?: Array<BusinessKnowledgeFile | AssistantKnowledgeFileSummary>;
  businessKnowledgeFiles?: Array<BusinessKnowledgeFile | AssistantKnowledgeFileSummary>;
}

export interface AiUsage {
  current: number;
  max: number | null;
  unlimited: boolean;
  remaining: number | null;
}

export interface AiAssistantsResponse {
  // New response shape
  items?: AIAssistant[];
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
  usage?: AiUsage;

  // Legacy response shape (kept for backward compatibility)
  aiAssistants?: AIAssistant[];
}

export interface CreateAiAssistantResponse {
  ai: AIAssistant;
  remaining: number;
  message?: string;
}

export interface DeleteAiAssistantResponse {
  remaining?: number;
  message?: string;
}

export interface FileUploadResult {
  success: boolean;
  file: string;
  documentId?: number;
  jobId?: string;
  status?: string;
  error?: string;
}

export interface FileUploadResponse {
  results: FileUploadResult[];
  message: string;
}

export interface AssistantWebsitePage {
  id: number;
  websiteId?: number;
  url: string;
  title?: string | null;
  depth: number;
  characterCount?: number;
  wordCount?: number;
  chunkCount?: number;
  contentHash?: string | null;
  s3Key?: string | null;
  s3Bucket?: string | null;
  processedDataPath?: string | null;
  isActive: boolean;
  deactivatedAt?: string | null;
  processingStatus: string;
  processingError?: string | null;
  statusCode?: number;
  lastCheckedAt?: string | null;
  lastModified?: string | null;
  contentType?: string | null;
  discoveredAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AssistantWebsite {
  id: number;
  userId: number;
  aiAssistantId: number;
  isDefaultKnowledge: boolean;
  baseUrl: string;
  displayName: string;
  crawlType: "SPECIFIC_PAGES" | "JUST_THIS_PAGE";
  maxPages: number;
  maxDepth: number;
  discoveryStatus: string;
  discoveryMethod: string | null;
  discoveryStartedAt: string | null;
  discoveryCompletedAt: string | null;
  discoveryError: string | null;
  pagesDiscovered: number;
  lastSyncedAt: string | null;
  syncStatus: string;
  syncError: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  pages?: AssistantWebsitePage[];
}

export type WebsitesResponse = AssistantWebsite[];

export interface AddWebsiteResult {
  success: boolean;
  url: string;
  websiteId: number;
  status: string;
}

export interface AddWebsiteResponse {
  displayName?: string;
  results: AddWebsiteResult[];
}
