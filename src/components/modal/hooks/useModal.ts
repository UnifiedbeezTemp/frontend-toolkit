import { useEffect, useRef, useCallback } from "react";

interface UseModalProps {
  isOpen: boolean;
  onClose: () => void;
  closeOnOverlayClick: boolean;
  closeOnEsc?: boolean;
  preventScroll: boolean;
  initialFocusRef?: React.RefObject<HTMLElement>;
}

export function useModal({
  isOpen,
  onClose,
  closeOnOverlayClick,
  closeOnEsc = true,
  preventScroll,
  initialFocusRef,
}: UseModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && closeOnEsc) {
        onClose();
      }
    };

    if (isOpen) {
      if (closeOnEsc) {
        document.addEventListener("keydown", handleEscape);
      }
      if (preventScroll) {
        document.body.style.overflow = "hidden";
      }
    }

    return () => {
      if (closeOnEsc) {
        document.removeEventListener("keydown", handleEscape);
      }
      if (preventScroll) {
        document.body.style.overflow = "unset";
      }
    };
  }, [isOpen, onClose, closeOnEsc, preventScroll]);

  useEffect(() => {
    if (isOpen) {
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus();
      } else if (modalRef.current) {
        modalRef.current.focus();
      }
    }
  }, [isOpen, initialFocusRef]);

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  }, [closeOnOverlayClick, onClose]);

  return {
    modalRef,
    handleOverlayClick,
  };
}