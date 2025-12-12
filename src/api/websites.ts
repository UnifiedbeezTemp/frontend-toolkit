import { api } from ".";
import type {
  ApiWebsite,
  ApiWebsitesResponse,
  CreateWebsitePayload,
  AddWebsiteResponse,
  DeleteWebsiteResponse,
  UpdatePageResponse,
  TogglePagePayload,
  BulkUpdatePagesPayload,
} from "@/shared/src/types/websiteTypes";

// Re-export types for backward compatibility
export type {
  ApiWebsite as Website,
  ApiWebsitesResponse as WebsitesResponse,
  CreateWebsitePayload,
  AddWebsiteResponse,
  DeleteWebsiteResponse,
  UpdatePageResponse,
  TogglePagePayload,
  BulkUpdatePagesPayload,
};

export const fetchWebsites = (aiAssistantId?: string): Promise<ApiWebsitesResponse> => {
  const url = aiAssistantId 
    ? `/websites?aiAssistantId=${aiAssistantId}`
    : `/websites`;
  return api.get<ApiWebsitesResponse>(url);
};

export const addWebsite = (
  payload: CreateWebsitePayload,
  aiAssistantId?: number
): Promise<AddWebsiteResponse> => {
  const url = aiAssistantId
    ? `/websites?aiAssistantId=${aiAssistantId}`
    : `/websites`;
  return api.post<CreateWebsitePayload, AddWebsiteResponse>(url, payload);
};

export const deleteWebsite = (id: number): Promise<DeleteWebsiteResponse> => {
  return api.delete<DeleteWebsiteResponse>(`/websites/${id}`);
};

export const deactivateAllPages = (websiteId: number): Promise<UpdatePageResponse> => {
  return api.patch<Record<string, never>, UpdatePageResponse>(`/websites/${websiteId}/pages/deactivate-all`, {});
};

export const togglePageStatus = (
  pageId: number,
  payload: TogglePagePayload
): Promise<UpdatePageResponse> => {
  return api.patch<TogglePagePayload, UpdatePageResponse>(`/websites/pages/${pageId}`, payload);
};

export const bulkUpdatePages = (
  websiteId: number,
  payload: BulkUpdatePagesPayload
): Promise<UpdatePageResponse> => {
  return api.patch<BulkUpdatePagesPayload, UpdatePageResponse>(
    `/websites/${websiteId}/pages/bulk`,
    payload
  );
};

export const reactivatePage = (websiteId: number, pageId: number): Promise<UpdatePageResponse> => {
  return api.patch<Record<string, never>, UpdatePageResponse>(`/websites/${websiteId}/pages/${pageId}/reactivate`, {});
};

export const deactivatePage = (websiteId: number, pageId: number): Promise<UpdatePageResponse> => {
  return api.patch<Record<string, never>, UpdatePageResponse>(`/websites/${websiteId}/pages/${pageId}/deactivate`, {});
};
