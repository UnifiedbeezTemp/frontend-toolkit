"use client";

import { useState, useCallback } from "react";

interface RedirectInfo {
  channelName: string;
  channelIcon?: string;
  redirectUrl: string;
}

export function useRedirectModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [redirectInfo, setRedirectInfo] = useState<RedirectInfo | null>(null);

  const showRedirectModal = useCallback(
    (channelName: string, redirectUrl: string, channelIcon?: string) => {
      setRedirectInfo({ channelName, redirectUrl, channelIcon });
      setIsOpen(true);
    },
    [],
  );

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setRedirectInfo(null);
  }, []);

  const handleProceed = useCallback(() => {
    if (redirectInfo?.redirectUrl) {
      window.location.href = redirectInfo.redirectUrl;
    }
    setIsOpen(false);
  }, [redirectInfo]);

  return {
    isOpen,
    redirectInfo,
    showRedirectModal,
    handleClose,
    handleProceed,
  };
}
