"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "./hooks/useModal";
import { getSizeClasses } from "./utils/modalUtils";
import { cn } from "../../lib/utils"; 
import ModalPortal from "./ModalPortal";
import { contentTransition } from "./utils/animations";
import { useModalStack } from "./hooks/useModalStack";

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
  priority?: number;
  isBlur?: boolean;
  bottomSheet?: boolean;
  maxHeight?: string;
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
  priority = 0,
  isBlur = false,
  bottomSheet = false,
  maxHeight = "90vh", 
}: ModalProps) {
  const { modalRef, handleOverlayClick } = useModal({
    isOpen,
    onClose,
    closeOnOverlayClick,
    preventScroll,
    initialFocusRef,
  });

  const { getZIndex } = useModalStack(isOpen, priority);

  const bottomSheetVariants = {
    hidden: { 
      opacity: 0, 
      y: "100%",
    },
    visible: { 
      opacity: 1, 
      y: 0,
    },
    exit: { 
      opacity: 0, 
      y: "100%",
    }
  };

  const regularModalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0 
    },
    exit: { 
      opacity: 0, 
      scale: 0.9, 
      y: 20 
    }
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={cn(
            "fixed inset-0 flex items-center justify-center",
            bottomSheet && "items-end sm:items-center" 
          )}
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ zIndex: getZIndex() }}
        >
          <motion.div
            className={cn("absolute inset-0 bg-black/40", isBlur && "backdrop-blur-sm")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleOverlayClick}
          />

          <motion.div
            ref={modalRef}
            className={cn(
              "outline-none ring-none relative bg-primary shadow-xl overflow-auto",
              bottomSheet 
                ? "w-full sm:w-auto" 
                : "rounded-xl m-4",
              bottomSheet 
                ? "" 
                : getSizeClasses(size), 
              size === "fullscreen" && "rounded-none",
              className 
            )}
            style={{
              ...(bottomSheet && { 
                maxHeight: maxHeight 
              })
            }}
            variants={bottomSheet ? bottomSheetVariants : regularModalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={contentTransition}
            tabIndex={-1}
          >
            <div className="w-full">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <ModalPortal isOpen={isOpen}>
      {modalContent}
    </ModalPortal>
  );
}