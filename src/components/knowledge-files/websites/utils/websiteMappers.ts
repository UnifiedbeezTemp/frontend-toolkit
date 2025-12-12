import { Website, WebsitePage } from "./types";
import { Website as ApiWebsite } from "@/shared/src/api/websites";

export const mapApiPageToUiPage = (apiPage: {
  id: number;
  websiteId: number;
  url: string;
  isActive: boolean;
  characterCount: number;
  updatedAt: string;
}): WebsitePage => {
  return {
    id: apiPage.id,
    url: apiPage.url,
    status: apiPage.isActive ? "active" : "inactive",
    characters: apiPage.characterCount?.toString() || "0",
    updatedAt: apiPage.updatedAt 
      ? new Date(apiPage.updatedAt).toLocaleString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : new Date().toLocaleString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
  };
};

export const mapApiWebsiteToUiWebsite = (apiWebsite: ApiWebsite): Website => {
  const pages: WebsitePage[] = (apiWebsite.pages || []).map(mapApiPageToUiPage);
  
  return {
    id: apiWebsite.id,
    url: apiWebsite.baseUrl.replace(/^https?:\/\//, "").replace(/\/$/, ""),
    displayName: apiWebsite.displayName,
    allPages: apiWebsite.crawlType === "SPECIFIC_PAGES" || apiWebsite.crawlType === "ENTIRE_SITE",
    crawlType: apiWebsite.crawlType,
    discoveryStatus: apiWebsite.discoveryStatus,
    pages,
  };
};

