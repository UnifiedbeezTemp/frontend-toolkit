"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ToastPayload, ToastVariant } from "./types";
import { cn } from "../../../lib/utils";
import { variantClasses, variantDot } from "./utils";

interface ToastItem extends Required<Omit<ToastPayload, "id">> {
  id: string;
}

interface ToastContainerProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div className="pointer-events-none fixed top-[1.6rem] right-[1.6rem] z-[9999] flex flex-col gap-[1.2rem] sm:right-[2.4rem] sm:top-[2.4rem] w-[calc(100%-3.2rem)] sm:w-auto max-w-[36rem]">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18 }}
            className={cn(
              "pointer-events-auto rounded-[1.2rem] border px-[1.6rem] py-[1.2rem] shadow-lg backdrop-blur-sm",
              variantClasses[toast.variant as ToastVariant]
            )}
          >
            <div className="flex items-start gap-[1rem]">
              <span
                className={cn(
                  "mt-[0.4rem] inline-block h-[0.8rem] w-[0.8rem] rounded-full",
                  variantDot[toast.variant as ToastVariant]
                )}
              />
              <div className="flex-1">
                {toast.title ? (
                  <p className="text-[1.6rem] font-[600] leading-[2.2rem]">
                    {toast.title}
                  </p>
                ) : null}
                {toast.description ? (
                  <p className="text-[1.4rem] leading-[2rem] opacity-90">
                    {toast.description}
                  </p>
                ) : null}
              </div>
              <button
                aria-label="Dismiss notification"
                className="text-[1.6rem] leading-none opacity-70 hover:opacity-100"
                onClick={() => onDismiss(toast.id)}
              >
                ×
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

