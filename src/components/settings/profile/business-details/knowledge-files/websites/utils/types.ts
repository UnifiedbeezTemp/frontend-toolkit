export interface WebsitePage {
  url: string;
  status: "active" | "inactive";
  characters: string;
  updatedAt: string;
}

export interface Website {
  url: string;
  allPages: boolean;
  pages: WebsitePage[];
}

export type PageOption = "Just this page" | "Page with all subpages";