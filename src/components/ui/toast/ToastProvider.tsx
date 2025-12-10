"use client";

import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { ToastContextValue, ToastPayload } from "./types";
import { ToastContainer } from "./ToastContainer";
import { formatToastText } from "./utils";

interface ToastItem extends Required<Omit<ToastPayload, "id">> {
  id: string;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timersRef = useRef<Record<string, NodeJS.Timeout>>({});

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
    if (timersRef.current[id]) {
      clearTimeout(timersRef.current[id]);
      delete timersRef.current[id];
    }
  }, []);

  const showToast = useCallback(
    (payload: ToastPayload) => {
      const id = payload.id ?? crypto.randomUUID();
      const toast: ToastItem = {
        id,
        title: formatToastText(payload.title),
        description: formatToastText(payload.description),
        variant: payload.variant ?? "info",
        duration: payload.duration ?? 4500,
      };

      setToasts((prev) => [...prev, toast]);

      timersRef.current[id] = setTimeout(() => removeToast(id), toast.duration);
    },
    [removeToast]
  );

  const contextValue: ToastContextValue = useMemo(
    () => ({
      showToast,
      removeToast,
    }),
    [removeToast, showToast]
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

