import { useCallback } from "react";
import { useAppMutation } from "@/shared/src/api/query";
import { useToast } from "@/shared/src/components/ui/toast/useToast";
import {
  deleteWebsite,
  deactivateAllPages,
  togglePageStatus,
  bulkUpdatePages,
  reactivatePage,
  deactivatePage,
} from "@/shared/src/api/websites";

interface UseWebsiteOperationsParams {
  onSuccess?: () => void;
}

export function useWebsiteOperations({ onSuccess }: UseWebsiteOperationsParams = {}) {
  const { showToast } = useToast();

  const deleteWebsiteMutation = useAppMutation<{ websiteId: number }, { message?: string }, unknown>(
    async ({ websiteId }) => {
      return deleteWebsite(websiteId);
    },
    {
      onSuccess: () => {
        showToast({
          variant: "success",
          title: "Website deleted",
          description: "The website has been successfully deleted.",
        });
        onSuccess?.();
      },
      onError: (error) => {
        const message =
          (typeof error === "object" &&
            error !== null &&
            "message" in error &&
            typeof (error as { message?: unknown }).message === "string"
            ? (error as { message: string }).message
            : "Failed to delete website. Please try again.") || "Failed to delete website. Please try again.";

        showToast({
          variant: "error",
          title: "Failed to delete website",
          description: message,
        });
      },
    }
  );

  const deactivateAllPagesMutation = useAppMutation<
    { websiteId: number },
    { message?: string },
    unknown
  >(
    async ({ websiteId }) => {
      return deactivateAllPages(websiteId);
    },
    {
      onSuccess: () => {
        showToast({
          variant: "success",
          title: "Pages deactivated",
          description: "All pages have been successfully deactivated.",
        });
        onSuccess?.();
      },
      onError: (error) => {
        const message =
          (typeof error === "object" &&
            error !== null &&
            "message" in error &&
            typeof (error as { message?: unknown }).message === "string"
            ? (error as { message: string }).message
            : "Failed to deactivate pages. Please try again.") || "Failed to deactivate pages. Please try again.";

        showToast({
          variant: "error",
          title: "Failed to deactivate pages",
          description: message,
        });
      },
    }
  );

  const togglePageStatusMutation = useAppMutation<
    { pageId: number; isActive: boolean },
    { message?: string },
    unknown
  >(
    async ({ pageId, isActive }) => {
      return togglePageStatus(pageId, { isActive });
    },
    {
      onSuccess: () => {
        showToast({
          variant: "success",
          title: "Page updated",
          description: "The page status has been successfully updated.",
        });
        onSuccess?.();
      },
      onError: (error) => {
        const message =
          (typeof error === "object" &&
            error !== null &&
            "message" in error &&
            typeof (error as { message?: unknown }).message === "string"
            ? (error as { message: string }).message
            : "Failed to update page. Please try again.") || "Failed to update page. Please try again.";

        showToast({
          variant: "error",
          title: "Failed to update page",
          description: message,
        });
      },
    }
  );

  const bulkUpdatePagesMutation = useAppMutation<
    { websiteId: number; pageIds: number[]; isActive: boolean },
    { message?: string },
    unknown
  >(
    async ({ websiteId, pageIds, isActive }) => {
      return bulkUpdatePages(websiteId, { pageIds, isActive });
    },
    {
      onSuccess: () => {
        showToast({
          variant: "success",
          title: "Pages updated",
          description: "The selected pages have been successfully updated.",
        });
        onSuccess?.();
      },
      onError: (error) => {
        const message =
          (typeof error === "object" &&
            error !== null &&
            "message" in error &&
            typeof (error as { message?: unknown }).message === "string"
            ? (error as { message: string }).message
            : "Failed to update pages. Please try again.") || "Failed to update pages. Please try again.";

        showToast({
          variant: "error",
          title: "Failed to update pages",
          description: message,
        });
      },
    }
  );

  const reactivatePageMutation = useAppMutation<
    { websiteId: number; pageId: number },
    { message?: string },
    unknown
  >(
    async ({ websiteId, pageId }) => {
      return reactivatePage(websiteId, pageId);
    },
    {
      onSuccess: () => {
        showToast({
          variant: "success",
          title: "Page reactivated",
          description: "The page has been successfully reactivated.",
        });
        onSuccess?.();
      },
      onError: (error) => {
        const message =
          (typeof error === "object" &&
            error !== null &&
            "message" in error &&
            typeof (error as { message?: unknown }).message === "string"
            ? (error as { message: string }).message
            : "Failed to reactivate page. Please try again.") || "Failed to reactivate page. Please try again.";

        showToast({
          variant: "error",
          title: "Failed to reactivate page",
          description: message,
        });
      },
    }
  );

  const deactivatePageMutation = useAppMutation<
    { websiteId: number; pageId: number },
    { message?: string },
    unknown
  >(
    async ({ websiteId, pageId }) => {
      return deactivatePage(websiteId, pageId);
    },
    {
      onSuccess: () => {
        showToast({
          variant: "success",
          title: "Page deactivated",
          description: "The page has been successfully deactivated.",
        });
        onSuccess?.();
      },
      onError: (error) => {
        const message =
          (typeof error === "object" &&
            error !== null &&
            "message" in error &&
            typeof (error as { message?: unknown }).message === "string"
            ? (error as { message: string }).message
            : "Failed to deactivate page. Please try again.") || "Failed to deactivate page. Please try again.";

        showToast({
          variant: "error",
          title: "Failed to deactivate page",
          description: message,
        });
      },
    }
  );

  return {
    deleteWebsite: deleteWebsiteMutation.mutateAsync,
    isDeletingWebsite: deleteWebsiteMutation.isPending,
    deactivateAllPages: deactivateAllPagesMutation.mutateAsync,
    isDeactivatingAllPages: deactivateAllPagesMutation.isPending,
    togglePageStatus: togglePageStatusMutation.mutateAsync,
    isTogglingPageStatus: togglePageStatusMutation.isPending,
    bulkUpdatePages: bulkUpdatePagesMutation.mutateAsync,
    isBulkUpdatingPages: bulkUpdatePagesMutation.isPending,
    reactivatePage: reactivatePageMutation.mutateAsync,
    isReactivatingPage: reactivatePageMutation.isPending,
    deactivatePage: deactivatePageMutation.mutateAsync,
    isDeactivatingPage: deactivatePageMutation.isPending,
  };
}

