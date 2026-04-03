"use client";

import { useState } from "react";
import { useAppMutation, useAppQuery } from "../../../../../../../api/query";
import {
  Website,
  PageOption,
  CrawlType,
  ApiWebsite,
  AddWebsiteResponse,
  CreateWebsitePayload,
} from "../../../../../../../types/websiteTypes";
import { AIAssistant } from "../../../../../../../types/aiAssistantTypes";
import {
  fetchAssistantWebsites,
  addAssistantWebsite,
} from "../../../../../../../api/aiAssistants";
import { useToast } from "../../../../../../ui/toast/useToast";
import { useWebsiteOperations } from "../../../../../../knowledge-files/websites/hooks/useWebsiteOperations";
import { mapApiWebsiteToUiWebsite } from "../../../../../../knowledge-files/websites/utils/websiteMappers";
import {
  isValidUrl,
  cleanAndPrepareUrl,
} from "../../../../../../knowledge-files/websites/utils/websiteValidators";
import { extractErrorMessage } from "../../../../../../../utils/extractErrorMessage";
import { invalidateAiAssistantsAndSession } from "../../../../../../../api/invalidateAiAssistantsAndSession";

export function useAssistantWebsites(assistant: AIAssistant | null) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newWebsiteUrl, setNewWebsiteUrl] = useState("");
  const [selectedOption, setSelectedOption] =
    useState<PageOption>("Just this page");
  const [urlError, setUrlError] = useState("");
  const [currentWebsiteIndex, setCurrentWebsiteIndex] = useState<number | null>(
    null,
  );
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [websiteToDelete, setWebsiteToDelete] = useState<number | null>(null);
  const { showToast } = useToast();

  const {
    deleteWebsite,
    isDeletingWebsite,
    deactivateAllPages,
    isDeactivatingAllPages,
    togglePageStatus: togglePageStatusApi,
    bulkUpdatePages,
    isBulkUpdatingPages,
  } = useWebsiteOperations({
    onSuccess: () => {
      refetchWebsites();
    },
  });

  const { data: websitesData, refetch: refetchWebsites } = useAppQuery(
    ["assistant-websites", assistant?.id],
    () => {
      if (!assistant?.id) {
        return Promise.resolve([]);
      }
      return fetchAssistantWebsites(assistant.id);
    },
    {
      enabled: !!assistant?.id,
    },
  );

  const websites: Website[] = Array.isArray(websitesData)
    ? (websitesData as ApiWebsite[]).map((apiWebsite) =>
        mapApiWebsiteToUiWebsite(apiWebsite),
      )
    : [];

  const addWebsiteMutation = useAppMutation<
    { aiAssistantId: number; payload: CreateWebsitePayload },
    AddWebsiteResponse,
    AddWebsiteResponse
  >(
    async ({ aiAssistantId, payload }) => {
      return addAssistantWebsite(payload, aiAssistantId);
    },
    {
      onSuccess: (data) => {
        refetchWebsites();
        void invalidateAiAssistantsAndSession({ refetchActive: true });
        showToast({
          variant: "success",
          title: "Website added",
          description: "Website has been successfully added.",
        });
      },
      onError: (error) => {
        showToast({
          variant: "error",
          title: "Failed to add website",
          description: extractErrorMessage(error),
        });
      },
    },
  );

  const handleAddWebsite = async () => {
    if (!assistant?.id) return;

    if (!isValidUrl(newWebsiteUrl)) {
      setUrlError("Please enter a valid website URL");
      return;
    }

    const { fullUrl, displayName } = cleanAndPrepareUrl(newWebsiteUrl);

    const crawlType: CrawlType =
      selectedOption === "Entire website"
        ? "ENTIRE_SITE"
        : selectedOption === "Specific pages"
          ? "SPECIFIC_PAGES"
          : "JUST_THIS_PAGE";

    const payload = {
      baseUrl: fullUrl,
      displayName: displayName,
      crawlType: crawlType,
      // maxPages: 100,
      maxDepth: crawlType === "SPECIFIC_PAGES" ? 1 : 3,
      isDefaultKnowledge: false,
    };

    try {
      await addWebsiteMutation.mutateAsync({
        aiAssistantId: parseInt(assistant.id, 10),
        payload,
      });

      setNewWebsiteUrl("");
      setSelectedOption("Just this page");
      setUrlError("");
      setIsAddModalOpen(false);
    } catch (error) {}
  };

  const handleDeleteWebsite = async (websiteId: number) => {
    try {
      await deleteWebsite({ websiteId });
      void invalidateAiAssistantsAndSession({ refetchActive: true });
      setDeleteConfirmOpen(false);
      setWebsiteToDelete(null);
    } catch (error) {}
  };

  const handleDeleteClick = (websiteId: number) => {
    setWebsiteToDelete(websiteId);
    setDeleteConfirmOpen(true);
  };

  const togglePageStatus = async (websiteIndex: number, pageUrl: string) => {
    const website = websites[websiteIndex];
    if (!website) return;

    const page = website.pages.find((p) => p.url === pageUrl);
    if (!page) return;

    try {
      await togglePageStatusApi({
        pageId: Number.parseInt(page.id, 10),
        isActive: page.status !== "active",
      });
    } catch (error) {}
  };

  const toggleAllPagesStatus = async (
    websiteIndex: number,
    status: "active" | "inactive",
  ) => {
    const website = websites[websiteIndex];
    if (!website) return;

    if (status === "inactive") {
      try {
        await deactivateAllPages({ websiteId: website.id });
      } catch (error) {}
    } else {
      const inactivePageIds = website.pages
        .filter((p) => p.status === "inactive")
        .map((p) => Number.parseInt(p.id, 10));

      if (inactivePageIds.length > 0) {
        try {
          await bulkUpdatePages({
            websiteId: website.id,
            pageIds: inactivePageIds,
            isActive: true,
          });
        } catch (error) {}
      }
    }
  };

  const openModal = (websiteIndex: number) => {
    setCurrentWebsiteIndex(websiteIndex);
  };

  const closeModal = () => {
    setCurrentWebsiteIndex(null);
  };

  const handleSaveInactivePages = async (selectedUrls: string[]) => {
    if (currentWebsiteIndex === null) return;

    const website = websites[currentWebsiteIndex];
    if (!website) return;

    const selectedPageIds = website.pages
      .filter((p) => selectedUrls.includes(p.url))
      .map((p) => Number.parseInt(p.id, 10));

    if (selectedPageIds.length > 0) {
      try {
        await bulkUpdatePages({
          websiteId: website.id,
          pageIds: selectedPageIds,
          isActive: true,
        });
        closeModal();
      } catch (error) {}
    } else {
      closeModal();
    }
  };

  const currentWebsite =
    currentWebsiteIndex !== null ? websites[currentWebsiteIndex] : null;
  const inactivePages = currentWebsite
    ? currentWebsite.pages.filter((page) => page.status === "inactive")
    : [];

  return {
    websites,
    isAddModalOpen,
    newWebsiteUrl,
    selectedOption,
    urlError,
    inactivePages,
    currentWebsiteIndex,
    isAddingWebsite: addWebsiteMutation.isPending,
    deleteConfirmOpen,
    websiteToDelete,
    isDeletingWebsite,
    isDeactivatingAllPages,
    isBulkUpdatingPages,
    setIsAddModalOpen,
    setNewWebsiteUrl,
    setSelectedOption,
    setDeleteConfirmOpen,
    handleAddWebsite,
    handleDeleteClick,
    handleDeleteWebsite,
    togglePageStatus,
    toggleAllPagesStatus,
    openModal,
    closeModal,
    handleSaveInactivePages,
  };
}
