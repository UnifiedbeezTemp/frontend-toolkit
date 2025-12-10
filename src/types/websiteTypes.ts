export interface UserWebsite {
  id: number;
  baseUrl: string;
  displayName: string;
  crawlType: "ENTIRE_SITE" | "JUST_THIS_PAGE";
}

export interface CreateWebsitePayload {
  baseUrl: string;
  displayName: string;
  crawlType: "JUST_THIS_PAGE" | "ENTIRE_SITE";
  maxPages: number;
  maxDepth: number;
  isDefaultKnowledge: boolean;
}

