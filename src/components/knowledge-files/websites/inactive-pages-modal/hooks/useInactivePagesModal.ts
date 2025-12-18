import { useState, useEffect } from "react";
import { WebsitePage } from "../../utils/types";

interface UseInactivePagesModalParams {
  isOpen: boolean;
  pages: WebsitePage[];
  onSave: (selectedUrls: string[]) => void;
  onClose: () => void;
}

export function useInactivePagesModal({
  isOpen,
  pages,
  onSave,
  onClose,
}: UseInactivePagesModalParams) {
  const [selectedUrls, setSelectedUrls] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (isOpen) {
      const activePageUrls = pages
        .filter((page) => page.status === "active")
        .map((page) => page.url);
      setSelectedUrls(new Set(activePageUrls));
      setSearchQuery("");
    }
  }, [isOpen, pages]);

  const filteredPages = pages.filter((page) =>
    page.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const togglePageSelection = (pageUrl: string) => {
    setSelectedUrls((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(pageUrl)) {
        newSet.delete(pageUrl);
      } else {
        newSet.add(pageUrl);
      }
      return newSet;
    });
  };

  const toggleAllPages = () => {
    if (selectedUrls.size === filteredPages.length) {
      setSelectedUrls(new Set());
    } else {
      setSelectedUrls(new Set(filteredPages.map((page) => page.url)));
    }
  };

  const handleSave = () => {
    onSave(Array.from(selectedUrls));
    // onClose();
  };

  const isAllSelected =
    selectedUrls.size === filteredPages.length && filteredPages.length > 0;

  return {
    selectedUrls,
    searchQuery,
    filteredPages,
    isAllSelected,
    setSearchQuery,
    togglePageSelection,
    toggleAllPages,
    handleSave,
  };
}

