import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import {
  CrawlType,
  PageOption,
  Website,
  WebsiteErrorResponse,
  CreateWebsitePayload,
  AddWebsiteResponse,
  ApiWebsite,
} from "../../../../../../types/websiteTypes";
import { useAppMutation, useAppQuery } from "../../../../../../api";
import { addWebsite, fetchWebsites } from "../../../../../../api/websites";
import { useToast } from "../../../../../ui/toast/useToast";
import { useWebsiteOperations } from "../../../../../knowledge-files/websites/hooks/useWebsiteOperations";
import { mapApiWebsiteToUiWebsite } from "../../../../../knowledge-files/websites/utils/websiteMappers";
import { useWebsitesWithPages } from "../../../../../knowledge-files/websites/hooks/useWebsitesWithPages";
import {
  cleanAndPrepareUrl,
  isValidUrl,
} from "../../../../../knowledge-files/websites/utils/websiteValidators";

export function useWebsites() {
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
  const queryClient = useQueryClient();

  const {
    deleteWebsite,
    isDeletingWebsite,
    deactivateAllPages,
    isDeactivatingAllPages,
    togglePageStatus: togglePageStatusApi,
    isTogglingPageStatus,
    bulkUpdatePages,
    isBulkUpdatingPages,
  } = useWebsiteOperations({
    onSuccess: () => {
      refetchWebsites();
    },
  });

  const {
    data: websitesData,
    isLoading: isLoadingWebsites,
    refetch: refetchWebsites,
  } = useAppQuery(["websites"], () => fetchWebsites(), {});

  const baseWebsites: Website[] = Array.isArray(websitesData)
    ? (websitesData as ApiWebsite[]).map((apiWebsite) =>
        mapApiWebsiteToUiWebsite(apiWebsite),
      )
    : [];
  const websites = useWebsitesWithPages(baseWebsites);

  const addWebsiteMutation = useAppMutation<
    CreateWebsitePayload,
    AddWebsiteResponse,
    WebsiteErrorResponse
  >(
    async (payload) => {
      return addWebsite(payload);
    },
    {
      onSuccess: (data) => {
        refetchWebsites();
        showToast({
          variant: "success",
          title: "Website added",
          description: `${
            data.displayName || "Website"
          } has been successfully added and is being processed.`,
        });
      },
      onError: (error) => {
        const getErrorMessage = (err: WebsiteErrorResponse): string => {
          if (typeof err === "object" && err !== null && "message" in err) {
            const message = err.message;
            if (typeof message === "string") {
              return message;
            }
            if (
              typeof message === "object" &&
              message !== null &&
              "message" in message
            ) {
              const nestedMessage = (message as { message?: string }).message;
              if (typeof nestedMessage === "string") {
                return nestedMessage;
              }
            }
          }
          return "Failed to add website. Please try again.";
        };

        const message = getErrorMessage(error);

        showToast({
          variant: "error",
          title: "Failed to add website",
          description: message,
        });
      },
    },
  );

  const handleAddWebsite = async () => {
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

    const payload: CreateWebsitePayload = {
      baseUrl: fullUrl,
      displayName: displayName,
      crawlType: crawlType,
      // maxPages: 100,
      maxDepth: crawlType === "SPECIFIC_PAGES" ? 1 : 3,
      isDefaultKnowledge: false,
    };

    try {
      await addWebsiteMutation.mutateAsync(payload);

      setNewWebsiteUrl("");
      setSelectedOption("Just this page");
      setUrlError("");
      setIsAddModalOpen(false);
    } catch (error) {
      // Error is handled by the mutation's onError callback
    }
  };

  const handleDeleteWebsite = async (websiteId: number) => {
    try {
      await deleteWebsite({ websiteId });
      queryClient.removeQueries({ queryKey: ["website", websiteId] });
      setDeleteConfirmOpen(false);
      setWebsiteToDelete(null);
    } catch (error) {
      // Error handled by mutation
    }
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
      await queryClient.invalidateQueries({ queryKey: ["website", website.id] });
    } catch (error) {
      // Error handled by mutation
    }
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
        await queryClient.invalidateQueries({ queryKey: ["website", website.id] });
      } catch (error) {
        // Error handled by mutation
      }
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
          await queryClient.invalidateQueries({ queryKey: ["website", website.id] });
        } catch (error) {
          // Error handled by mutation
        }
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
        await queryClient.invalidateQueries({ queryKey: ["website", website.id] });
        closeModal();
      } catch (error) {
        // Error handled by mutation
      }
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
    currentWebsiteIndex,
    inactivePages,
    isLoadingWebsites,
    isAddingWebsite: addWebsiteMutation.isPending,
    deleteConfirmOpen,
    websiteToDelete,
    isDeletingWebsite,
    isDeactivatingAllPages,
    isTogglingPageStatus,
    isBulkUpdatingPages,
    setIsAddModalOpen,
    setNewWebsiteUrl,
    setSelectedOption,
    setUrlError,
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
