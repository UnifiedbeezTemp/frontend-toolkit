"use client";

import { useChatWidget } from "./hooks/useChatWidget";
import ChatFAB from "./sub-components/ChatFAB";
import ChatPanel from "./sub-components/ChatPanel";

export default function ChatWidget() {
  const {
    isOpen,
    position,
    isDragging,
    unreadCount,
    fabRef,
    handleMouseDown,
    handleTouchStart,
    closeChat,
  } = useChatWidget();

  return (
    <>
      {!isOpen && (
        <ChatFAB
          unreadCount={unreadCount}
          position={position}
          isDragging={isDragging}
          fabRef={fabRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        />
      )}

      {isOpen && <ChatPanel onClose={closeChat} />}
    </>
  );
}
