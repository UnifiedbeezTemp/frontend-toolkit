"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ToastPayload, ToastVariant } from "./types";
import { cn } from "../../../lib/utils";
import { variantClasses, variantIcons, iconClasses } from "./utils";
import { X } from "lucide-react";

interface ToastItem extends Required<Omit<ToastPayload, "id">> {
  id: string;
}

interface ToastContainerProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div className="pointer-events-none fixed top-[1.6rem] right-[1.6rem] z-[10000] flex flex-col gap-[1.2rem] sm:right-[2.4rem] sm:top-[2.4rem] w-[calc(100%-3.2rem)] sm:w-auto max-w-[40rem]">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = variantIcons[toast.variant as ToastVariant];
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={cn(
                "pointer-events-auto rounded-[1.2rem] border border-border/50 p-[1.6rem] relative overflow-hidden",
                variantClasses[toast.variant as ToastVariant],
              )}
            >
              <div className="flex items-start gap-[1.4rem]">
                <div
                  className={cn(
                    "mt-[0.2rem] flex h-[2.4rem] w-[2.4rem] shrink-0 items-center justify-center rounded-full bg-current/10",
                    iconClasses[toast.variant as ToastVariant],
                  )}
                >
                  <Icon size={16} strokeWidth={2.5} />
                </div>

                <div className="flex-1 pt-[0.2rem]">
                  {toast.title ? (
                    <p className="text-[1.5rem] font-[700] leading-[2rem]">
                      {toast.title}
                    </p>
                  ) : null}
                  {toast.description ? (
                    <p className="mt-[0.2rem] text-[1.3rem] leading-[1.8rem] opacity-90">
                      {toast.description}
                    </p>
                  ) : null}
                </div>

                <button
                  aria-label="Dismiss notification"
                  className="mt-[0.2rem] shrink-0 text-text-primary/50 hover:text-text-secondary transition-colors"
                  onClick={() => onDismiss(toast.id)}
                >
                  <X size={18} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
