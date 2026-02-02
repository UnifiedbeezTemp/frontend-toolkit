import { useCallback, useState } from "react";
import { WebsitePage } from "../utils/types";

interface UsePageDropdownProps {
  page: WebsitePage;
  onClose: () => void;
}

export const usePageDropdown = ({ page, onClose }: UsePageDropdownProps) => {
  const handleOpenTab = useCallback(() => {
    window.open(page.url, "_blank");
    onClose();
  }, [page.url, onClose]);

  const handleViewContent = useCallback(() => {
    window.open(page.url, "_blank");
    onClose();
  }, [page.url, onClose]);

  const handleSync = useCallback(() => {
    onClose();
  }, [onClose]);

  return {
    handleOpenTab,
    handleViewContent,
    handleSync,
  };
};
