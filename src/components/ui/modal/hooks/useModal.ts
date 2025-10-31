import { useEffect, useRef, useCallback } from "react";

interface UseModalProps {
  isOpen: boolean;
  onClose: () => void;
  closeOnOverlayClick: boolean;
  preventScroll: boolean;
  initialFocusRef?: React.RefObject<HTMLElement>;
}

export function useModal({
  isOpen,
  onClose,
  closeOnOverlayClick,
  preventScroll,
  initialFocusRef,
}: UseModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      if (preventScroll) {
        document.body.style.overflow = "hidden";
      }
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      if (preventScroll) {
        document.body.style.overflow = "unset";
      }
    };
  }, [isOpen, onClose, preventScroll]);

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