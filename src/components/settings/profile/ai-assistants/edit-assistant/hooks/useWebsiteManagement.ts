import { useState, useEffect, useMemo } from "react";
import { Website } from "../../../business-details/knowledge-files/websites/utils/types";
import { AIAssistant } from "../../../../../../types/aiAssistantTypes";
import { isValidUrl, generateDummyPages } from "../utils/helpers";

const mapApiWebsitesToUiWebsites = (
  urls: (string | { url?: string; baseUrl?: string })[],
): Website[] => {
  return urls.map((site) => {
    const url =
      typeof site === "string" ? site : site.url || site.baseUrl || "";
    return {
      url,
      allPages: false,
      pages: [],
    };
  });
};

export function useWebsiteManagement(assistant: AIAssistant, isOpen: boolean) {
  const initialWebsites = useMemo(
    () => mapApiWebsitesToUiWebsites(assistant.websites || []),
    [assistant.websites],
  );

  const [websites, setWebsites] = useState<{
    websites: Website[];
    isAddModalOpen: boolean;
    newWebsiteUrl: string;
    selectedOption: "Page with all subpages" | "Just this page";
    urlError: string;
  }>({
    websites: initialWebsites,
    isAddModalOpen: false,
    newWebsiteUrl: "",
    selectedOption: "Just this page",
    urlError: "",
  });

  const [inactivePagesModal, setInactivePagesModal] = useState<{
    isModalOpen: boolean;
    currentWebsiteIndex: number | null;
  }>({
    isModalOpen: false,
    currentWebsiteIndex: null,
  });

  useEffect(() => {
    if (isOpen) {
      setWebsites((prev) => ({
        ...prev,
        websites: mapApiWebsitesToUiWebsites(assistant.websites || []),
      }));
    }
  }, [assistant, isOpen]);

  const handleAddWebsite = () => {
    const { newWebsiteUrl, selectedOption } = websites;

    if (!isValidUrl(newWebsiteUrl)) {
      setWebsites((prev) => ({
        ...prev,
        urlError: "Please enter a valid website URL",
      }));
      return;
    }

    const cleanUrl = newWebsiteUrl
      .replace(/^https?:\/\//, "")
      .replace(/\/$/, "");

    const newWebsite: Website = {
      url: cleanUrl,
      allPages: selectedOption === "Page with all subpages",
      pages:
        selectedOption === "Page with all subpages"
          ? generateDummyPages(cleanUrl)
          : [
              {
                url: cleanUrl,
                status: "active" as const,
                characters: Math.floor(
                  Math.random() * 90000000 + 10000000,
                ).toString(),
                updatedAt: new Date().toLocaleString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              },
            ],
    };

    setWebsites((prev) => ({
      ...prev,
      websites: [...prev.websites, newWebsite],
      newWebsiteUrl: "",
      urlError: "",
      isAddModalOpen: false,
    }));
  };

  const togglePageStatus = (websiteIndex: number, pageUrl: string) => {
    setWebsites((prev) => ({
      ...prev,
      websites: prev.websites.map((website, idx) => {
        if (idx !== websiteIndex) return website;
        return {
          ...website,
          pages: website.pages.map((page) =>
            page.url === pageUrl
              ? {
                  ...page,
                  status:
                    page.status === "active" ? "inactive" : ("active" as const),
                }
              : page,
          ),
        };
      }),
    }));
  };

  const toggleAllPagesStatus = (
    websiteIndex: number,
    status: "active" | "inactive",
  ) => {
    setWebsites((prev) => ({
      ...prev,
      websites: prev.websites.map((website, idx) => {
        if (idx !== websiteIndex) return website;
        return {
          ...website,
          pages: website.pages.map((page) => ({ ...page, status })),
        };
      }),
    }));
  };

  const handleSaveInactivePages = (selectedUrls: string[]) => {
    if (inactivePagesModal.currentWebsiteIndex !== null) {
      selectedUrls.forEach((pageUrl) => {
        togglePageStatus(inactivePagesModal.currentWebsiteIndex!, pageUrl);
      });
    }
    setInactivePagesModal({ isModalOpen: false, currentWebsiteIndex: null });
  };

  return {
    websites,
    inactivePagesModal,
    setWebsites: {
      setIsAddModalOpen: (open: boolean) =>
        setWebsites((prev) => ({ ...prev, isAddModalOpen: open })),
      setNewWebsiteUrl: (url: string) =>
        setWebsites((prev) => ({ ...prev, newWebsiteUrl: url })),
      setSelectedOption: (
        option: "Page with all subpages" | "Just this page",
      ) => setWebsites((prev) => ({ ...prev, selectedOption: option })),
    },
    handleAddWebsite,
    togglePageStatus,
    toggleAllPagesStatus,
    setInactivePagesModal: {
      openModal: (index: number) =>
        setInactivePagesModal({
          isModalOpen: true,
          currentWebsiteIndex: index,
        }),
      closeModal: () =>
        setInactivePagesModal({
          isModalOpen: false,
          currentWebsiteIndex: null,
        }),
    },
    handleSaveInactivePages,
  };
}
