import { useState } from "react";
import { WebsitePage, Website, PageOption } from "../utils/types";

const generateDummyPages = (baseUrl: string): WebsitePage[] => {
  const subpages = ["/about", "/contact", "/faq", "/services", "/pricing"];
  return subpages.map(subpage => ({
    url: `${baseUrl}${subpage}`,
    status: "active" as const,
    characters: Math.floor(Math.random() * 90000000 + 10000000).toString(),
    updatedAt: new Date().toLocaleString('en-US', { 
      month: '2-digit', 
      day: '2-digit', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }));
};

const isValidUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
    return urlObj.hostname.includes('.');
  } catch {
    return false;
  }
};

export function useWebsites(initialWebsites: Website[] = []) {
  const [websites, setWebsites] = useState<Website[]>(initialWebsites);
  const [newWebsiteUrl, setNewWebsiteUrl] = useState("");
  const [selectedOption, setSelectedOption] = useState<PageOption>("Just this page");
  const [urlError, setUrlError] = useState("");

  const addWebsite = () => {
    if (!isValidUrl(newWebsiteUrl)) {
      setUrlError("Please enter a valid website URL");
      return false;
    }

    const cleanUrl = newWebsiteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
    
    const newWebsite: Website = {
      url: cleanUrl,
      allPages: selectedOption === "Page with all subpages",
      pages: selectedOption === "Page with all subpages" 
        ? generateDummyPages(cleanUrl)
        : []
    };

    setWebsites(prev => [...prev, newWebsite]);
    setNewWebsiteUrl("");
    setSelectedOption("Just this page");
    setUrlError("");
    return true;
  };

  const togglePageStatus = (websiteIndex: number, pageUrl: string) => {
    setWebsites(prev => prev.map((website, wIdx) => {
      if (wIdx !== websiteIndex) return website;
      
      return {
        ...website,
        pages: website.pages.map(page => {
          if (page.url !== pageUrl) return page;
          return {
            ...page,
            status: page.status === "active" ? "inactive" : "active"
          };
        })
      };
    }));
  };

  const toggleAllPagesStatus = (websiteIndex: number, status: "active" | "inactive") => {
    setWebsites(prev => prev.map((website, idx) => {
      if (idx !== websiteIndex) return website;
      
      return {
        ...website,
        pages: website.pages.map(page => ({
          ...page,
          status
        }))
      };
    }));
  };

  return {
    websites,
    newWebsiteUrl,
    selectedOption,
    urlError,
    setNewWebsiteUrl,
    setSelectedOption,
    addWebsite,
    togglePageStatus,
    toggleAllPagesStatus,
    setUrlError
  };
}