"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface RedirectInfo {
  channelName: string;
  channelIcon?: string;
  action: string | (() => void);
}

interface RedirectModalContextType {
  showRedirectModal: (
    channelName: string,
    action: string | (() => void),
    channelIcon?: string,
  ) => void;
  isOpen: boolean;
  redirectInfo: RedirectInfo | null;
  handleClose: () => void;
  handleProceed: () => void;
}

const RedirectModalContext = createContext<RedirectModalContextType | null>(
  null,
);

export function useRedirectModalContext() {
  const context = useContext(RedirectModalContext);
  if (!context) {
    throw new Error(
      "useRedirectModalContext must be used within RedirectModalProvider",
    );
  }
  return context;
}

interface RedirectModalProviderProps {
  children: React.ReactNode;
}

export function RedirectModalProvider({
  children,
}: RedirectModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [redirectInfo, setRedirectInfo] = useState<RedirectInfo | null>(null);

  const showRedirectModal = useCallback(
    (
      channelName: string,
      action: string | (() => void),
      channelIcon?: string,
    ) => {
      setRedirectInfo({ channelName, action, channelIcon });
      setIsOpen(true);
    },
    [],
  );

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setRedirectInfo(null);
  }, []);

  const handleProceed = useCallback(() => {
    if (redirectInfo?.action) {
      if (typeof redirectInfo.action === "string") {
        window.location.href = redirectInfo.action;
      } else {
        redirectInfo.action();
      }
    }
    setIsOpen(false);
  }, [redirectInfo]);

  return (
    <RedirectModalContext.Provider
      value={{
        showRedirectModal,
        isOpen,
        redirectInfo,
        handleClose,
        handleProceed,
      }}
    >
      {children}
    </RedirectModalContext.Provider>
  );
}
