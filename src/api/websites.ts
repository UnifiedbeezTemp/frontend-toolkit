import { api } from ".";

export interface TogglePagePayload {
  isActive: boolean;
}

export interface BulkUpdatePagesPayload {
  pageIds: number[];
  isActive: boolean;
}

export interface DeleteWebsiteResponse {
  message?: string;
}

export interface UpdatePageResponse {
  message?: string;
}

export interface CreateWebsitePayload {
  baseUrl: string;
  displayName: string;
  crawlType: "JUST_THIS_PAGE" | "SPECIFIC_PAGES" | "ENTIRE_SITE";
  maxPages: number;
  maxDepth: number;
  isDefaultKnowledge: boolean;
}

export interface AddWebsiteResponse {
  displayName?: string;
  results?: Array<{
    success: boolean;
    url: string;
    websiteId: number;
    status: string;
  }>;
}

export interface Website {
  id: number;
  userId?: number;
  aiAssistantId?: number;
  isDefaultKnowledge: boolean;
  baseUrl: string;
  displayName: string;
  crawlType: "SPECIFIC_PAGES" | "JUST_THIS_PAGE" | "ENTIRE_SITE";
  maxPages: number;
  maxDepth: number;
  discoveryStatus?: string;
  discoveryMethod?: string | null;
  discoveryStartedAt?: string | null;
  discoveryCompletedAt?: string | null;
  discoveryError?: string | null;
  pagesDiscovered?: number;
  lastSyncedAt?: string | null;
  syncStatus?: string;
  syncError?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  pages?: Array<{
    id: number;
    websiteId: number;
    url: string;
    title: string | null;
    depth: number;
    characterCount: number;
    wordCount: number;
    chunkCount: number;
    contentHash: string | null;
    s3Key: string | null;
    s3Bucket: string;
    processedDataPath: string | null;
    isActive: boolean;
    deactivatedAt: string | null;
    processingStatus: "PENDING" | "COMPLETED" | "FAILED";
    processingError: string | null;
    statusCode: number;
    lastCheckedAt: string | null;
    lastModified: string | null;
    contentType: string | null;
    discoveredAt: string;
    createdAt: string;
    updatedAt: string;
  }>;
}

export type WebsitesResponse = Website[];

export const fetchWebsites = (aiAssistantId?: string) => {
  const url = aiAssistantId 
    ? `/websites?aiAssistantId=${aiAssistantId}`
    : `/websites`;
  return api.get<WebsitesResponse>(url);
};

export const addWebsite = (payload: CreateWebsitePayload, aiAssistantId?: number) => {
  const url = aiAssistantId
    ? `/websites?aiAssistantId=${aiAssistantId}`
    : `/websites`;
  return api.post<CreateWebsitePayload, AddWebsiteResponse>(url, payload);
};

export const deleteWebsite = (id: number) => {
  return api.delete<DeleteWebsiteResponse>(`/websites/${id}`);
};

export const deactivateAllPages = (websiteId: number) => {
  return api.patch<{}, UpdatePageResponse>(`/websites/${websiteId}/pages/deactivate-all`, {});
};

export const togglePageStatus = (pageId: number, payload: TogglePagePayload) => {
  return api.patch<TogglePagePayload, UpdatePageResponse>(`/websites/pages/${pageId}`, payload);
};

export const bulkUpdatePages = (websiteId: number, payload: BulkUpdatePagesPayload) => {
  return api.patch<BulkUpdatePagesPayload, UpdatePageResponse>(
    `/websites/${websiteId}/pages/bulk`,
    payload
  );
};

export const reactivatePage = (websiteId: number, pageId: number) => {
  return api.patch<{}, UpdatePageResponse>(`/websites/${websiteId}/pages/${pageId}/reactivate`, {});
};

export const deactivatePage = (websiteId: number, pageId: number) => {
  return api.patch<{}, UpdatePageResponse>(`/websites/${websiteId}/pages/${pageId}/deactivate`, {});
};
