import { useState, useRef, useCallback, useEffect } from "react";

interface Position {
  x: number;
  y: number;
}

export function useChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);

  const fabRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<Position>({ x: 0, y: 0 });
  const dragOffset = useRef<Position>({ x: 0, y: 0 });
  const hasMoved = useRef(false);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      hasMoved.current = false;
      dragStart.current = { x: e.clientX, y: e.clientY };
      dragOffset.current = { x: position.x, y: position.y };
    },
    [position],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;

      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        hasMoved.current = true;
      }

      setPosition({
        x: dragOffset.current.x + dx,
        y: dragOffset.current.y + dy,
      });
    },
    [isDragging],
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging && !hasMoved.current) {
      setIsOpen((prev) => !prev);
      if (!isOpen) setUnreadCount(0);
    }
    setIsDragging(false);
  }, [isDragging, isOpen]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0];
      setIsDragging(true);
      hasMoved.current = false;
      dragStart.current = { x: touch.clientX, y: touch.clientY };
      dragOffset.current = { x: position.x, y: position.y };
    },
    [position],
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      const dx = touch.clientX - dragStart.current.x;
      const dy = touch.clientY - dragStart.current.y;

      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        hasMoved.current = true;
      }

      setPosition({
        x: dragOffset.current.x + dx,
        y: dragOffset.current.y + dy,
      });
    },
    [isDragging],
  );

  const handleTouchEnd = useCallback(() => {
    if (isDragging && !hasMoved.current) {
      setIsOpen((prev) => !prev);
      if (!isOpen) setUnreadCount(0);
    }
    setIsDragging(false);
  }, [isDragging, isOpen]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleTouchEnd);
    }
    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, handleTouchMove, handleTouchEnd]);

  const closeChat = () => setIsOpen(false);

  return {
    isOpen,
    position,
    isDragging,
    unreadCount,
    fabRef,
    handleMouseDown,
    handleTouchStart,
    closeChat,
  };
}
