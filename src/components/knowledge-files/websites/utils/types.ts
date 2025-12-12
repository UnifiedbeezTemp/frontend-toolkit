export interface WebsitePage {
  id: number;
  url: string;
  status: "active" | "inactive";
  characters: string;
  updatedAt: string;
}

export interface Website {
  id: number;
  url: string;
  displayName?: string;
  allPages: boolean;
  crawlType?: "SPECIFIC_PAGES" | "JUST_THIS_PAGE" | "ENTIRE_SITE";
  discoveryStatus?: string;
  pages: WebsitePage[];
}

export type PageOption = "Just this page" | "Entire website" | "Specific pages";