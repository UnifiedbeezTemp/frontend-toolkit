export interface UserWebsite {
  id: number;
  baseUrl: string;
  displayName: string;
  crawlType: "SPECIFIC_PAGES" | "JUST_THIS_PAGE";
}

export interface CreateWebsitePayload {
  baseUrl: string;
  displayName: string;
  crawlType: "JUST_THIS_PAGE" | "SPECIFIC_PAGES";
  maxPages: number;
  maxDepth: number;
  isDefaultKnowledge: boolean;
}

