import { useState } from "react";
import { WebsitePage } from "../utils/types";

interface UseInactivePagesModalReturn {
  isModalOpen: boolean;
  selectedPages: Set<number>;
  searchQuery: string;
  currentWebsiteIndex: number | null;
  openModal: (websiteIndex: number) => void;
  closeModal: () => void;
  togglePageSelection: (pageIndex: number) => void;
  toggleAllPages: (pages: WebsitePage[]) => void;
  setSearchQuery: (query: string) => void;
  getFilteredPages: (pages: WebsitePage[]) => WebsitePage[];
  getSelectedUrls: (pages: WebsitePage[]) => string[];
}

export function useInactivePagesModal(): UseInactivePagesModalReturn {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [currentWebsiteIndex, setCurrentWebsiteIndex] = useState<number | null>(null);

  const openModal = (websiteIndex: number) => {
    setCurrentWebsiteIndex(websiteIndex);
    setIsModalOpen(true);
    setSelectedPages(new Set());
    setSearchQuery("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPages(new Set());
    setCurrentWebsiteIndex(null);
  };

  const togglePageSelection = (pageIndex: number) => {
    setSelectedPages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(pageIndex)) {
        newSet.delete(pageIndex);
      } else {
        newSet.add(pageIndex);
      }
      return newSet;
    });
  };

  const toggleAllPages = (pages: WebsitePage[]) => {
    setSelectedPages(prev => {
      if (prev.size === pages.length) {
        return new Set();
      } else {
        return new Set(pages.map((_, index) => index));
      }
    });
  };

  const getFilteredPages = (pages: WebsitePage[]) => {
    return pages.filter(page => 
      page.url.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const getSelectedUrls = (pages: WebsitePage[]): string[] => {
    return Array.from(selectedPages).map(index => pages[index]?.url).filter(Boolean);
  };

  return {
    isModalOpen,
    selectedPages,
    searchQuery,
    currentWebsiteIndex,
    openModal,
    closeModal,
    togglePageSelection,
    toggleAllPages,
    setSearchQuery,
    getFilteredPages,
    getSelectedUrls
  };
}