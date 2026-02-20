"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";

interface ChannelsContextType {
  isChannelsModalOpen: boolean;
  openChannelsModal: () => void;
  closeChannelsModal: () => void;
}

const ChannelsContext = createContext<ChannelsContextType | undefined>(
  undefined,
);

export function ChannelsProvider({ children }: { children: React.ReactNode }) {
  const [isChannelsModalOpen, setIsChannelsModalOpen] = useState(false);

  const openChannelsModal = useCallback(() => setIsChannelsModalOpen(true), []);
  const closeChannelsModal = useCallback(
    () => setIsChannelsModalOpen(false),
    [],
  );

  const value = useMemo(
    () => ({
      isChannelsModalOpen,
      openChannelsModal,
      closeChannelsModal,
    }),
    [isChannelsModalOpen, openChannelsModal, closeChannelsModal],
  );

  return (
    <ChannelsContext.Provider value={value}>
      {children}
    </ChannelsContext.Provider>
  );
}

export function useChannels() {
  const context = useContext(ChannelsContext);
  if (!context) {
    throw new Error("useChannels must be used within a ChannelsProvider");
  }
  return context;
}
