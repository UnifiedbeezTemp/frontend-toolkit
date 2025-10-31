"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "./hooks/useModal";
import { contentTransition } from "./animations";
import { getSizeClasses } from "./utils/modalUtils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "xxl" | "fullscreen";
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
  className?: string;
  preventScroll?: boolean;
  initialFocusRef?: React.RefObject<HTMLElement>;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  size = "md",
  closeOnOverlayClick = true,
  className = "",
  preventScroll = true,
  initialFocusRef,
}: ModalProps) {
  const { modalRef, handleOverlayClick } = useModal({
    isOpen,
    onClose,
    closeOnOverlayClick,
    preventScroll,
    initialFocusRef,
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleOverlayClick}
          />

          <motion.div
            ref={modalRef}
            className={`
              outline-none ring-none
              relative bg-primary rounded-xl shadow-xl w-full   overflow-auto
              ${getSizeClasses(size)}
              ${size === "fullscreen" ? "rounded-none" : ""}
              ${className}
            `}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={contentTransition}
            tabIndex={-1}
          >
            <div className="">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
