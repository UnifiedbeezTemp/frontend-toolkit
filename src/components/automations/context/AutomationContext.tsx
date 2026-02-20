"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";

interface AutomationContextType {
  isCreateModalOpen: boolean;
  openCreateModal: () => void;
  closeCreateModal: () => void;
}

const AutomationContext = createContext<AutomationContextType | undefined>(
  undefined,
);

export function AutomationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const openCreateModal = useCallback(() => setIsCreateModalOpen(true), []);
  const closeCreateModal = useCallback(() => setIsCreateModalOpen(false), []);

  const value = useMemo(
    () => ({
      isCreateModalOpen,
      openCreateModal,
      closeCreateModal,
    }),
    [isCreateModalOpen, openCreateModal, closeCreateModal],
  );

  return (
    <AutomationContext.Provider value={value}>
      {children}
    </AutomationContext.Provider>
  );
}

export function useAutomation() {
  const context = useContext(AutomationContext);
  if (!context) {
    throw new Error("useAutomation must be used within an AutomationProvider");
  }
  return context;
}
