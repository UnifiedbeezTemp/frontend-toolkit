/**
 * Centralized website types for the entire application
 * These types are reused across API, UI components, and hooks
 */

export type CrawlType = "JUST_THIS_PAGE" | "SPECIFIC_PAGES" | "ENTIRE_SITE";

export type PageStatus = "active" | "inactive";

export type PageOption = "Just this page" | "Entire website" | "Specific pages";

export type DiscoveryStatus = string | undefined;

/**
 * API Response Types
 */
export interface ApiWebsitePage {
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
}

export interface ApiWebsite {
  id: number;
  userId?: number;
  aiAssistantId?: number;
  isDefaultKnowledge: boolean;
  baseUrl: string;
  displayName: string;
  crawlType: CrawlType;
  maxPages: number;
  maxDepth: number;
  discoveryStatus?: DiscoveryStatus;
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
  pages?: ApiWebsitePage[];
}

export type ApiWebsitesResponse = ApiWebsite[];

/**
 * UI Types
 */
export interface WebsitePage {
  id: string;
  url: string;
  status: PageStatus;
  characters: string;
  updatedAt: string;
}

export interface Website {
  id: number;
  url: string;
  displayName?: string;
  allPages: boolean;
  crawlType?: CrawlType;
  discoveryStatus?: DiscoveryStatus;
  pages: WebsitePage[];
}

/**
 * Request Payload Types
 */
export interface CreateWebsitePayload {
  baseUrl: string;
  displayName: string;
  crawlType: CrawlType;
  maxPages: number;
  maxDepth: number;
  isDefaultKnowledge: boolean;
}

export interface TogglePagePayload {
  isActive: boolean;
}

export interface BulkUpdatePagesPayload {
  pageIds: number[];
  isActive: boolean;
}

/**
 * Response Types
 */
export interface AddWebsiteResponse {
  displayName?: string;
  results?: Array<{
    success: boolean;
    url: string;
    websiteId: number;
    status: string;
  }>;
}

export interface DeleteWebsiteResponse {
  message?: string;
}

export interface UpdatePageResponse {
  message?: string;
}

/**
 * Operation Parameter Types
 */
export interface DeleteWebsiteParams {
  websiteId: number;
}

export interface DeactivateAllPagesParams {
  websiteId: number;
}

export interface TogglePageStatusParams {
  pageId: number;
  isActive: boolean;
}

export interface BulkUpdatePagesParams {
  websiteId: number;
  pageIds: number[];
  isActive: boolean;
}

export interface ReactivatePageParams {
  websiteId: number;
  pageId: number;
}

export interface DeactivatePageParams {
  websiteId: number;
  pageId: number;
}

/**
 * User Profile Website Type
 * Simplified website type used in user profiles
 */
export interface UserWebsite {
  id: number;
  baseUrl: string;
  displayName: string;
  crawlType: CrawlType;
}

/**
 * Error Response Type
 */
export interface WebsiteErrorResponse {
  message?: string | { message?: string };
}
